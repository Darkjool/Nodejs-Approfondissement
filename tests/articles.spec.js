const supertest = require('supertest');
const app = require('../votre_chemin_vers_l_application/server'); // Assurez-vous de spécifier le bon chemin

// Chemins Articles
const createArticleEndpoint = '/api/articles';
const updateArticleEndpoint = '/api/articles/{articleId}'; 
const deleteArticleEndpoint = '/api/articles/{articleId}'; 

describe('Tests des opérations CRUD pour les articles', () => {
  let createdArticleId; // Stocker l'ID de l'article créé pour les tests ultérieurs

  it('Devrait créer un nouvel article', async () => {
    const response = await supertest(app)
      .post(createArticleEndpoint)
      .send({
        title: 'Nouvel Article',
        content: 'Contenu de l\'article'
      })
      .expect(201);

    createdArticleId = response.body._id; // Stocker l'ID de l'article créé
  });

  it('Devrait mettre à jour un article existant', async () => {
    await supertest(app)
      .put(updateArticleEndpoint.replace('{articleId}', createdArticleId))
      .send({
        title: 'Article mis à jour',
        content: 'Contenu mis à jour'
      })
      .expect(200);
  });

  it('Devrait supprimer un article existant', async () => {
    await supertest(app)
      .delete(deleteArticleEndpoint.replace('{articleId}', createdArticleId))
      .expect(200);
  });
});
