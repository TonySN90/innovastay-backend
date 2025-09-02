import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import Lodging from "../models/lodgingModel";
import { AppError } from "../utils/appError";

export const getAllLodgings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgings = await Lodging.find()
      .populate('amenities', 'name description')
      .populate('services', 'name description')
      .populate('rooms', 'name description quantity')
      .populate('landlord', 'name');

    if (!lodgings || lodgings.length === 0) {
      next(new AppError("No lodgings found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: lodgings.length,
      data: {
        lodgings,
      },
    });
  },
);

export const createLodging = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newLodging = await Lodging.create(req.body);
    const lodging = await Lodging.findById(newLodging._id)
      .populate('amenities', 'name description')
      .populate('services', 'name description')
      .populate('rooms', 'name description quantity')
      .populate('landlord', 'name');

    res.status(201).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        lodging,
      },
    });
  },
);
