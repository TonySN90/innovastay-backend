import Landlord from "../models/landlordModel";

import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const getAllLandlords = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const landlords = await Landlord.find();

    if (!landlords || landlords.length === 0) {
      next(new AppError("No landlords found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: landlords.length,
      data: {
        landlords,
      },
    });
  },
);

export const createLandlord = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const landlord = await Landlord.create(req.body);

    res.status(201).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        landlord,
      },
    });
  },
);
