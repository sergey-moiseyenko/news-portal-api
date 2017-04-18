let express = require('express');
let app = express();
let cors = require('cors');
let fs = require('fs');
let bodyParser = require('body-parser');

//<-- cors option -->
let corsOption = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
};

//<-- express use -->
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//<-- config routes -->
app.use('/article', require('./server/router/article'));
app.use('/user', require('./server/router/user'));
app.use('/tag', require('./server/router/tag'));

app.listen(3000);
