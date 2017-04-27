const express = require('express');
let router = express.Router();
let passport = require('../passport/passport-local');

router.post('/user', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

router.get('/isLogin', (req, res) => {
  if (req.user) res.send(req.user.username);
  else res.sendStatus(401);
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
