import { Router } from "express";
import {
  getAllLodgingServices,
  createLodgingService,
  getLodgingServiceById,
  updateLodgingService,
  deleteLodgingService,
} from "../controllers/lodgingServiceController";

const router = Router();

router.route("/").get(getAllLodgingServices).post(createLodgingService);
router.route("/:id").get(getLodgingServiceById).patch(updateLodgingService).delete(deleteLodgingService);

export default router;