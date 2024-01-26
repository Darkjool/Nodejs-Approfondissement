const { Schema, model } = require("mongoose");

// Etats arctiles
const articleStates = ["draft", "published"];

const articleSchema = Schema({
  title: String,
  content: String,
  state: {
    type: String,
    // Enumération définie 
    enum: articleStates, 
    // Valeur par défaut
    default: "draft" 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

let Article;

module.exports = Article = model("Article", articleSchema)
