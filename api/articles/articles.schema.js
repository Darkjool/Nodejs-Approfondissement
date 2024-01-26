const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

let Article;

module.exports = Article = model("Article", articleSchema);

/*

async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}

test();

1.	Diagramme UML de la base de données :
+------------------+             +--------------------+
|     Article      |   ------>   |        User        |
+------------------+             +--------------------+
| - _id: ObjectId  |             | - _id: ObjectId    |
| - title: String  |             | - name: String |
| - content: String|             | - password: String |
| - user: ObjectId +   ------>   |                    |
+------------------+             +--------------------+

*/
