import express from "express";
import {
  getAllLodgingRooms,
  createLodgingRoom,
  getLodgingRoomById,
  updateLodgingRoom,
  deleteLodgingRoom,
  getRoomsByLodging,
} from "../controllers/lodgingRoomController";

const router = express.Router();

router.route("/").get(getAllLodgingRooms).post(createLodgingRoom);

router.route("/lodging/:lodgingId").get(getRoomsByLodging);

router
  .route("/:id")
  .get(getLodgingRoomById)
  .patch(updateLodgingRoom)
  .delete(deleteLodgingRoom);

export default router;