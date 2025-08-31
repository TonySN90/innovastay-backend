import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import LodgingService from "../models/lodgingServiceModel";
import { AppError } from "../utils/appError";

export const getAllLodgingServices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingServices = await LodgingService.find();

    if (!lodgingServices || lodgingServices.length === 0) {
      next(new AppError("No lodging services found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: lodgingServices.length,
      data: {
        lodgingServices,
      },
    });
  },
);

export const createLodgingService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingService = await LodgingService.create(req.body);

    res.status(201).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        lodgingService,
      },
    });
  },
);

export const getLodgingServiceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingService = await LodgingService.findById(req.params.id);

    if (!lodgingService) {
      next(new AppError("Lodging service not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        lodgingService,
      },
    });
  },
);

export const updateLodgingService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingService = await LodgingService.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!lodgingService) {
      next(new AppError("Lodging service not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        lodgingService,
      },
    });
  },
);

export const deleteLodgingService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const lodgingService = await LodgingService.findByIdAndDelete(
      req.params.id,
    );

    if (!lodgingService) {
      next(new AppError("Lodging service not found", 404));
      return;
    }

    res.status(204).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: null,
    });
  },
);
