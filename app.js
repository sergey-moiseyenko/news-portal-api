let express = require('express');
let app = express();
let cors = require('cors');
let fs = require('fs');
let bodyParser = require('body-parser');
let passport = require('passport');
let cookieParser = require('cookie-parser');
let session = require('express-session');

//<-- cors option -->
let corsOption = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
};

//<-- express use -->
app.use(cors(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
*/

// Passport:
app.use(passport.initialize());
//app.use(passport.session());

//<-- config routes -->
app.use('/article', require('./server/router/article'));
app.use('/user', require('./server/router/user'));
app.use('/tag', require('./server/router/tag'));

app.listen(3000);
