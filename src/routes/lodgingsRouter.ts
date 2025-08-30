import { Router } from "express";
import {
  getAllLodgings,
  createLodging,
} from "../controllers/lodgingController";

const router = Router();

router.route("/").get(getAllLodgings).post(createLodging);

export default router;
