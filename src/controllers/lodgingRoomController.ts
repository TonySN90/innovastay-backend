import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import LodgingRoom from "../models/lodgingRoomModel";
import { AppError } from "../utils/appError";

export const getAllLodgingRooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingRooms = await LodgingRoom.find().populate('lodging', 'name');

    if (!lodgingRooms || lodgingRooms.length === 0) {
      next(new AppError("No lodging rooms found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: lodgingRooms.length,
      data: {
        lodgingRooms,
      },
    });
  },
);

export const getRoomsByLodging = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { lodgingId } = req.params;
    const lodgingRooms = await LodgingRoom.find({ lodging: lodgingId });

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: lodgingRooms.length,
      data: {
        lodgingRooms,
      },
    });
  },
);

export const createLodgingRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingRoom = await LodgingRoom.create(req.body);
    const populatedRoom = await LodgingRoom.findById(lodgingRoom._id).populate(
      "lodging",
      "name",
    );

    res.status(201).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        lodgingRoom: populatedRoom,
      },
    });
  },
);

export const getLodgingRoomById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingRoom = await LodgingRoom.findById(req.params.id).populate(
      "lodging",
      "name",
    );

    if (!lodgingRoom) {
      next(new AppError("Lodging room not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        lodgingRoom,
      },
    });
  },
);

export const updateLodgingRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingRoom = await LodgingRoom.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate("lodging", "name");

    if (!lodgingRoom) {
      next(new AppError("Lodging room not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        lodgingRoom,
      },
    });
  },
);

export const deleteLodgingRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingRoom = await LodgingRoom.findByIdAndDelete(req.params.id);

    if (!lodgingRoom) {
      next(new AppError("Lodging room not found", 404));
      return;
    }

    res.status(204).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: null,
    });
  },
);