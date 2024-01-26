const ArticlesService = require("./articles.service");

// Contrôleur pour créer un nouvel article
async function createArticle(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id;
  try {
    const article = await ArticlesService.createArticle(title, content, userId);
    // Émettre un événement "articleCreated" avec les détails de l'article nouvellement créé
    req.io.emit("articleCreated", article);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Contrôleur pour mettre à jour un article existant
async function updateArticle(req, res) {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const article = await ArticlesService.updateArticle(id, updatedFields);
    // Émettre un événement "articleUpdated" avec les détails de l'article mis à jour
    req.io.emit("articleUpdated", article);
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Contrôleur pour supprimer un article existant
async function deleteArticle(req, res) {
  const { id } = req.params;
  try {
    const article = await ArticlesService.deleteArticle(id);
    // Émettre un événement "articleDeleted" avec l'ID de l'article supprimé
    req.io.emit("articleDeleted", { id });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle
};
