import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import testRoutes from "./src/routes/test";
import landlordsRouter from "./src/routes/landlordsRouter";
import { AppError } from "./src/utils/appError";
import lodgingsRouter from "./src/routes/lodgingsRouter";
import { setupAdminJS } from "./src/config/adminjs";
import {
  requireAdminAuth,
  loginAdmin,
  logoutAdmin,
  showLoginForm,
} from "./src/middleware/adminAuth";
import amenitiesRouter from "./src/routes/amenitiesRouter";
import lodgingServicesRouter from "./src/routes/lodgingServicesRouter";
import lodgingRoomsRouter from "./src/routes/lodgingRoomsRouter";
import articlesRouter from "./src/routes/articlesRouter";
import globalErrorHandler from "./src/controllers/errorController";

const createApp = async (): Promise<Application> => {
  const app: Application = express();

  // View engine setup
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "innovastay-session-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    }),
  );

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Public routes
  app.use("/api/v1/guests", testRoutes);
  app.use("/api/v1/landlords", landlordsRouter);
  app.use("/api/v1/lodgings", lodgingsRouter);
  app.use("/api/v1/amenities", amenitiesRouter);
  app.use("/api/v1/lodging-services", lodgingServicesRouter);
  app.use("/api/v1/lodging-rooms", lodgingRoomsRouter);
  app.use("/api/v1/articles", articlesRouter);

  // Admin authentication routes
  app.get("/admin-login", showLoginForm);
  app.post("/admin-login", loginAdmin);
  app.get("/admin-logout", logoutAdmin);

  // Handle AdminJS internal logout route
  app.get("/admin/logout", logoutAdmin);
  app.post("/admin/logout", logoutAdmin);

  // Protected AdminJS routes
  try {
    const { adminRouter } = setupAdminJS();

    // Smart middleware that allows logout but protects other routes
    app.use("/admin", (req, res, next) => {
      // Allow logout routes to pass through
      if (req.path === "/logout") {
        return next();
      }
      // Check authentication for all other admin routes
      return requireAdminAuth(req, res, next);
    });

    app.use("/admin", adminRouter);
  } catch (error) {
    console.error("Failed to setup AdminJS:", error);
  }

  app.get("/", (req, res) => {
    res.json({ message: "Innovastay Backend API" });
  });

  app.use(globalErrorHandler);

  return app;
};

export default createApp;
