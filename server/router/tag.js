const express = require('express');
const router = express.Router();
const tagMapper = require('../db/data-mapper/tag-mapper');

router.post('/tag', (req, res) => {
  tagMapper.updateTags(req.body);
  res.json(req.body);
});

router.get('/tags', (req, res) => {
  res.send(tagMapper.getTagsFromDb());
});

module.exports = router;
