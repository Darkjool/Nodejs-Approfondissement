const Article = require("./article.model");

// Création d'un nouvel article
async function createArticle(title, content, userId) {
  try {
    const article = new Article({ title, content, user: userId });
    await article.save();
    return article;
  } catch (error) {
    throw new Error("Erreur lors de la création de l'article.");
  }
}

// MAJ article existant
async function updateArticle(articleId, updatedFields) {
  try {
    const article = await Article.findByIdAndUpdate(articleId, updatedFields, { new: true });
    if (!article) {
      throw new Error("Article non trouvé.");
    }
    return article;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de l'article.");
  }
}

// Suppression article existant
async function deleteArticle(articleId) {
  try {
    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
      throw new Error("Article non trouvé.");
    }
    return article;
  } catch (error) {
    throw new Error("Erreur lors de la suppression de l'article.");
  }
}

// Récupération artcile user (sans mdp) 
async function getUserArticles(userId) {
  try {
    const articles = await Article.find({ user: userId }).populate({
      path: "user",
      // Sans mot de passe
      select: "-password" 
    });
    return articles;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des articles de l'utilisateur.");
  }
}

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getUserArticles
};
