let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

module.exports = mongoose;
