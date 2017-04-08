let express = require('express');
let app = express();
//let cors = require('cors');
let fs = require('fs');
let bodyParser = require('body-parser');
let articleMapper = require(__dirname + '/server/db/data-mapper/article-mapper');
let userMapper = require(__dirname + '/server/db/data-mapper/user-mapper');
let tagMapper = require(__dirname + '/server/db/data-mapper/tag-mapper');

//<-- express use -->
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//<-- post methods -->
app.post('/user', (req, res) => {
  let reqUser = req.body;
  let users = userMapper.getUsersFromDb();
  let user = users.find(user => user.name === reqUser.name && user.password === reqUser.password);
  if (!user) res.status(400).send('Wrong password or userName');
  setOriginHeader(res);
  userMapper.setCurrentUserToDb(user);
  res.json(reqUser);
});

app.post('/articles', (req, res) => {
  articleMapper.setArticlesToDb(req.body);
  setOriginHeader(res);
  res.json(req.body);
});

app.post('/tag', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  tagMapper.updateTags(req.body);
  res.json(req.body);
});

//<-- get methods -->
app.get('/articles', (req, res) => {
  setOriginHeader(res);
  res.send(articleMapper.loadArticles());
});

app.get('/article/:id', (req, res) => {
  setOriginHeader(res);
  res.send(articleMapper.getArticle(req.params.id));
});

app.get('/current_user', (req, res) => {
  setOriginHeader(res);
  res.send(userMapper.getCurrentUserFromDb());
});

app.get('/users', (req, res) => {
  setOriginHeader(res);
  res.json(userMapper.getUsersFromDb());
});

app.get('/tags', (req, res) => {
  setOriginHeader(res);
  res.send(tagMapper.getTagsFromDb());
});

//app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/public/UI/html/index.html');
//});

//<--delete methods -->
app.delete('/logout', (req, res) => {
  setOriginHeader(res);
  userMapper.deleteCurrentUserFromDb();
  res.json({userWasRemoved: 'ok'});
});

function setOriginHeader(res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
};

app.listen(3000);
