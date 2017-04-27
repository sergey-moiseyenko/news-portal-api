let express = require('express');
let app = express();
let cors = require('cors');
let fs = require('fs');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let SessionStore = require('connect-diskdb')(session);

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

let options = {
  path: __dirname + '/server/db/data',
  name: 'sessions'
};

let sessionStore = new SessionStore(options);

app.use(session({
  name: 'rovny',
  secret: 'wild',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

let passport = require('./server/passport/passport-local');

// Passport:
app.use(passport.initialize());
app.use(passport.session());

//<-- config routes -->
app.use('/article', require('./server/router/article'));
app.use('/user', require('./server/router/user'));
app.use('/tag', require('./server/router/tag'));

app.listen(3000);
