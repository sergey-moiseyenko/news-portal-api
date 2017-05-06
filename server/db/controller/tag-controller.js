class TagController {

  constructor() {
    this.Tag = require('../model/tag-model');
  }

  updateTags(updateTag, onload) {

    this.Tag.findOne(updateTag).exec((err, tag) => {
      if  (tag) onload();

      new this.Tag(updateTag).save().then(err => {
        onload();
      });
    });
  }

  getTagsFromDb(onload) {
    this.Tag.find({}).exec((err, tags) => {
      let result = [];
      tags.forEach(tag => {
        result.push(tag.tag);
      });
      onload(result);
    });
  }
}

module.exports = new TagController();
