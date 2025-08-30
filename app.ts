import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import testRoutes from "./src/routes/test";
import landlordsRouter from "./src/routes/landlordsRouter";
import { AppError } from "./src/utils/appError";
import lodgingsRouter from "./src/routes/lodgingsRouter";
import { setupAdminJS } from "./src/config/adminjs";

const createApp = async (): Promise<Application> => {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/guests", testRoutes);
  app.use("/api/v1/landlords", landlordsRouter);
  app.use("/api/v1/lodgings", lodgingsRouter);

  try {
    const { adminRouter } = setupAdminJS();
    app.use("/admin", adminRouter);
  } catch (error) {
    console.error("Failed to setup AdminJS:", error);
  }

  app.get("/", (req, res) => {
    res.json({ message: "Innovastay Backend API" });
  });

  return app;
};

export default createApp;
