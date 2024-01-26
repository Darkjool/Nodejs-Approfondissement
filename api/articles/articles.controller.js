const ArticlesService = require("./articles.service");

// Contrôleur pour créer un nouvel article
async function createArticle(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id; // On suppose que l'ID de l'utilisateur est disponible dans req.user.id après l'authentification
  try {
    const article = await ArticlesService.createArticle(title, content, userId);
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