import { Router } from "express";
import {
  createLandlord,
  getAllLandlords,
} from "../controllers/landlordsController";

const router = Router();

router.route("/").get(getAllLandlords).post(createLandlord);

export default router;
