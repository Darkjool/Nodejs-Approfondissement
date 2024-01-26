const express = require("express");
const router = express.Router();
const UsersController = require("./users.controller");

// Nouvel article
router.post("/articles", UsersController.createArticle);

// MAJ Article
router.put("/articles/:id", UsersController.updateArticle);

// Suppression article
router.delete("/articles/:id", UsersController.deleteArticle);

// Récupération article user
router.get("/:userId/articles", UsersController.getUserArticles);

module.exports = router;
