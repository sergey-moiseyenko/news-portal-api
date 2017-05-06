const express = require('express');
const router = express.Router();
const articleMapper = require('../db/data-mapper/article-mapper');
const articleCV = require('../db/controller/article-controller');

router.post('/article', (req, res) => {
  articleCV.add(req.body).then(() => {
    articleMapper.addArticle(req.body);
    res.json(req.body);
  });
});

router.get('/article/:id', (req, res) => {
  articleCV.getById(req.params.id).exec((err, article) => {
    if (err) return err;

    if (!article) return res.send({});
    res.send(article);
  });
});

router.get('/articles', (req, res) => {
  articleCV.load(JSON.parse(req.query.parameters)).exec((err, articles) => {
    res.send(articles);
  });
});

router.delete('/article', (req, res) => {
  articleCV.remove(req.body).exec(err => {
    if (err) return err;

    res.send(req.body);
  });
});

router.patch('/article', (req, res) => {

  articleCV.update(req.body).exec((err, update) => {
    if (err) return err;

    res.send(req.body);
  });
});

module.exports = router;
