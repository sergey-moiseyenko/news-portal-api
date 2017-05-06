class TagModel {

  constructor() {
    this.mongoose = require('../mongoose/mongoose');
    this.Tag = this.mongoose.model('Tag', this.schema());
  }

  schema(){
    return new this.mongoose.Schema({
      tag: String
    });
  }
}

module.exports = new TagModel().Tag;
