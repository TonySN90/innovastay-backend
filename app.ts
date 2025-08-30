import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import testRoutes from "./src/routes/test";
import landlordsRouter from "./src/routes/landlordsRouter";
import { AppError } from "./src/utils/appError";
import lodgingsRouter from "./src/routes/lodgingsRouter";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/guests", testRoutes);
app.use("/api/v1/landlords", landlordsRouter);
app.use("/api/v1/lodgings", lodgingsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Innovastay Backend API" });
});

export default app;
