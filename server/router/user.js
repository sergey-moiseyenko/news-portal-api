const express = require('express');
const router = express.Router();
const userMapper = require('../db/data-mapper/user-mapper');

router.post('/user', (req, res) => {
  let reqUser = req.body;
  let users = userMapper.getUsersFromDb();
  let user = users.find(user => user.name === reqUser.name && user.password === reqUser.password);
  if (!user) res.status(400).send('Wrong password or userName');
  userMapper.setCurrentUserToDb(user);
  res.json(reqUser);
});

router.get('/current_user', (req, res) => {
  res.send(userMapper.getCurrentUserFromDb());
});

router.get('/users', (req, res) => {
  res.json(userMapper.getUsersFromDb());
});

router.delete('/logout', (req, res) => {
  userMapper.deleteCurrentUserFromDb();
  res.json({userWasRemoved: 'ok'});
});

module.exports = router;
