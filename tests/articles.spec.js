const supertest = require('supertest');
const app = require('server.js');

// Chemins Articles
const createArticleEndpoint = '/api/articles';
const updateArticleEndpoint = '/api/articles/{TEST1}'; 
const deleteArticleEndpoint = '/api/articles/{TEST2}'; 

describe('Tests des opérations CRUD pour les articles', () => {
  let createdArticleId;

  it('Devrait créer un nouvel article', async () => {
    const response = await supertest(app)
      .post(createArticleEndpoint)
      .send({
        title: 'Nouvel Article',
        content: 'Contenu de l\'article'
      })
      .expect(201);
// ID de l'article créé
    createdArticleId = response.body._id; 
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
