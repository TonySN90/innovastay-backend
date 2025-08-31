import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import Amenity from "../models/amenityModel";
import { AppError } from "../utils/appError";

export const getAllAmenities = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const amenities = await Amenity.find();

    if (!amenities || amenities.length === 0) {
      next(new AppError("No amenities found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: amenities.length,
      data: {
        amenities,
      },
    });
  },
);

export const createAmenity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const amenity = await Amenity.create(req.body);

    res.status(201).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        amenity,
      },
    });
  },
);

export const getAmenityById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const amenity = await Amenity.findById(req.params.id);

    if (!amenity) {
      next(new AppError("Amenity not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        amenity,
      },
    });
  },
);

export const updateAmenity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!amenity) {
      next(new AppError("Amenity not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        amenity,
      },
    });
  },
);

export const deleteAmenity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);

    if (!amenity) {
      next(new AppError("Amenity not found", 404));
      return;
    }

    res.status(204).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: null,
    });
  },
);
