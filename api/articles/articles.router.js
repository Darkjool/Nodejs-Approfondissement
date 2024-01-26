const express = require("express");
const router = express.Router();
const ArticlesController = require("./articles.controller");
const authMiddleware = require("./authMiddleware");

// Création d'un article
router.post("/", authMiddleware, ArticlesController.createArticle);

// MAJ Article
router.put("/:id", ArticlesController.updateArticle);

// Suppression article
router.delete("/:id", ArticlesController.deleteArticle);

module.exports = router;
