let express = require('express');
let app = express();
let cors = require('cors');
let fs = require('fs');
let bodyParser = require('body-parser');
let articleMapper = require(__dirname + '/server/db/data-mapper/article-mapper');
let userMapper = require(__dirname + '/server/db/data-mapper/user-mapper');
let tagMapper = require(__dirname + '/server/db/data-mapper/tag-mapper');

//<-- cors option -->
let corsOption = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
};

//<-- express use -->
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//<-- post methods -->
app.options('/user', cors());
app.post('/user', (req, res) => {
  let reqUser = req.body;
  let users = userMapper.getUsersFromDb();
  let user = users.find(user => user.name === reqUser.name && user.password === reqUser.password);
  if (!user) res.status(400).send('Wrong password or userName');
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

app.post('/article', (req, res) => {
  setOriginHeader(res);
  articleMapper.addArticle(req.body);
  res.json(req.body);
});

//<-- get methods -->
app.get('/articles', (req, res) => {
  setOriginHeader(res);
  res.send(articleMapper.loadArticles(JSON.parse(req.query.parameters)));
});

app.get('/article/:id', (req, res) => {
  setOriginHeader(res);
  let article = articleMapper.getArticle(req.params.id);
  if (!article) res.send({});
  res.send(article);
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
app.options('/logout', cors());
app.delete('/logout', (req, res) => {
  setOriginHeader(res);
  userMapper.deleteCurrentUserFromDb();
  res.json({userWasRemoved: 'ok'});
});

app.options('/article', cors());
app.delete('/article', (req, res) => {
  articleMapper.removeArticle(req.body);
  res.send(req.body);
});

//<-- patch method -->
app.options('/article', cors());
app.patch('/article', cors(), (req, res) => {
  articleMapper.update(req.body);
  res.json(req.body);
});

function setOriginHeader(res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
}

app.listen(3000);
