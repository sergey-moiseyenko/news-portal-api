let express = require('express');
let app = express();
let cors = require('cors');
let fs = require('fs');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
let store = new MongoDBStore({uri: 'mongodb://localhost:27017/test', collection: 'sessions'});
let passport = require('./server/passport/passport-local');

//<-- cors option -->
let corsOption = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control', 'Expires']
};

//<-- express use -->
app.use(cors(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'rovny',
  secret: 'wild',
  resave: false,
  saveUninitialized: true,
  store: store
}));
// Passport:
app.use(passport.initialize());
app.use(passport.session());

//<-- config routes -->
app.use('/article', require('./server/router/article'));
app.use('/user', require('./server/router/user'));
app.use('/tag', require('./server/router/tag'));

app.listen(3000);
