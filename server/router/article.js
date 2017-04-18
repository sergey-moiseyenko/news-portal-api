const express = require('express');
const router = express.Router();
const articleMapper = require('../db/data-mapper/article-mapper');

router.post('/article', (req, res) => {
  articleMapper.addArticle(req.body);
  res.json(req.body);
});

router.get('/article/:id', (req, res) => {
  let article = articleMapper.getArticle(req.params.id);
  if (!article) res.send({});
  else res.send(article);
});

router.get('/articles', (req, res) => {
  res.send(articleMapper.loadArticles(JSON.parse(req.query.parameters)));
});

router.delete('/article', (req, res) => {
  articleMapper.removeArticle(req.body);
  res.send(req.body);
});

router.patch('/article', (req, res) => {
  articleMapper.update(req.body);
  res.json(req.body);
});

module.exports = router;
