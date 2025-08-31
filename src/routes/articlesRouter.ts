import { Router } from "express";
import {
  getAllArticles,
  getArticlesByLodging,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  updateArticlePosition,
} from "../controllers/articleController";

const router = Router();

// General article routes
router.route("/").get(getAllArticles).post(createArticle);
router.route("/:id").get(getArticleById).patch(updateArticle).delete(deleteArticle);

// Position management
router.route("/:id/position").patch(updateArticlePosition);

// Lodging-specific routes
router.route("/lodging/:lodgingId").get(getArticlesByLodging);

export default router;