const ArticlesService = require("./articles.service");

// Création d'un nouvel article
async function createArticle(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id;
  try {
    const article = await ArticlesService.createArticle(title, content, userId);
    // Event article créé 
    req.io.emit("articleCreated", article);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// MAJ Existant
async function updateArticle(req, res) {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    // VERIFICATION ADMINISTRATEUR
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized: Only admins can update articles.");
    }
    const article = await ArticlesService.updateArticle(id, updatedFields);
    // MAJ Event
    req.io.emit("articleUpdated", article);
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Suppression article existant
async function deleteArticle(req, res) {
  const { id } = req.params;
  try {
    // VERIFICATION ADMINISTRATEUR
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized: Only admins can delete articles.");
    }
    const article = await ArticlesService.deleteArticle(id);
    // EVENT Article supprimé
    req.io.emit("articleDeleted", { id });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer les articles d'un utilisateur
async function getUserArticles(req, res) {
  const userId = req.params.userId; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
  try {
    const articles = await ArticlesService.getUserArticles(userId);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getUserArticles
};
