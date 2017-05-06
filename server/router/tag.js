const express = require('express');
const router = express.Router();
let tagCV = require('../db/controller/tag-controller');

router.post('/tag', (req, res) => {

  let onload = () => {
    res.json(req.body);
  };

  tagCV.updateTags(req.body, onload);
});

router.get('/tags', (req, res) => {

  let onload = (tags) => {
    res.send(tags);
  };

  tagCV.getTagsFromDb(onload);
});

module.exports = router;
