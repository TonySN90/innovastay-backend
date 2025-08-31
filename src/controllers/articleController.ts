import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import Article from "../models/articleModel";
import { AppError } from "../utils/appError";

export const getAllArticles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const articles = await Article.find().populate(
      "lodging",
      "name_de name_en",
    );

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: articles.length,
      data: {
        articles,
      },
    });
  },
);

export const getArticlesByLodging = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { lodgingId } = req.params;
    const articles = await Article.find({ lodging: lodgingId }).sort({
      position: 1,
    });

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      results: articles.length,
      data: {
        articles,
      },
    });
  },
);

export const createArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const article = await Article.create(req.body);
    const populatedArticle = await Article.findById(article._id).populate(
      "lodging",
      "name_de name_en",
    );

    res.status(201).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        article: populatedArticle,
      },
    });
  },
);

export const getArticleById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const article = await Article.findById(req.params.id).populate(
      "lodging",
      "name_de name_en",
    );

    if (!article) {
      next(new AppError("Article not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        article,
      },
    });
  },
);

export const updateArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("lodging", "name_de name_en");

    if (!article) {
      next(new AppError("Article not found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        article,
      },
    });
  },
);

export const deleteArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      next(new AppError("Article not found", 404));
      return;
    }

    // Reorder positions of remaining articles for the same lodging
    await Article.updateMany(
      {
        lodging: article.lodging,
        position: { $gt: article.position },
      },
      { $inc: { position: -1 } },
    );

    res.status(204).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: null,
    });
  },
);

export const updateArticlePosition = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { newPosition } = req.body;

    const article = await Article.findById(id);
    if (!article) {
      return next(new AppError("Article not found", 404));
    }

    const oldPosition = article.position;
    const lodgingId = article.lodging;

    // Gesamtanzahl der Artikel für diese Unterkunft
    const totalArticles = await Article.countDocuments({ lodging: lodgingId });

    if (newPosition < 1 || newPosition > totalArticles) {
      return next(new AppError("Invalid position", 400));
    }

    if (oldPosition === newPosition) {
      const populatedArticle = await Article.findById(id).populate(
        "lodging",
        "name_de name_en",
      );
      res.status(200).json({
        status: "success",
        requestAt: new Date().toISOString(),
        data: { article: populatedArticle },
      });
      return;
    }

    // Update der Positionen anderer Artikel
    if (newPosition > oldPosition) {
      // Verschieben nach unten: Positionen der Artikel dazwischen verringern
      await Article.updateMany(
        {
          lodging: lodgingId,
          position: { $gt: oldPosition, $lte: newPosition },
        },
        { $inc: { position: -1 } },
      );
    } else {
      // Verschieben nach oben: Positionen der Artikel dazwischen erhöhen
      await Article.updateMany(
        {
          lodging: lodgingId,
          position: { $gte: newPosition, $lt: oldPosition },
        },
        { $inc: { position: 1 } },
      );
    }

    // Artikel selbst aktualisieren
    article.position = newPosition;
    await article.save();

    const updatedArticle = await Article.findById(id).populate(
      "lodging",
      "name_de name_en",
    );

    res.status(200).json({
      status: "success",
      requestAt: new Date().toISOString(),
      data: {
        article: updatedArticle,
      },
    });
  },
);
