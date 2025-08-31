import { Router } from "express";
import {
  getAllAmenities,
  createAmenity,
  getAmenityById,
  updateAmenity,
  deleteAmenity,
} from "../controllers/amenityController";

const router = Router();

router.route("/").get(getAllAmenities).post(createAmenity);
router.route("/:id").get(getAmenityById).patch(updateAmenity).delete(deleteAmenity);

export default router;