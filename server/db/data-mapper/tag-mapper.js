class TagMapper {
  constructor() {
    this.db = require('diskdb');
    this.db.connect(__dirname + '/../data', ['tags']);
    this.config = require('../../config/config');
  }

  getTagsFromDb() {
    let tagMap = this.db.tags.find()[0];
    let props = Object.keys(tagMap);
    props.splice(props.indexOf('_id'));
    console.log(tagMap);
    return props;
  }

  updateTags(tag) {
    this.config.TAGS.push(tag.tag);
    let tagMap = this.db.tags.find()[0];
    tagMap[tag.tag] = {
      'tag': tag.tag,
      ids: []
    };

    this.reloadCollection().save(tagMap);
  }

  addId(id, tags) {
    let tagMap = this.db.tags.find()[0];

    tags.forEach(tagName => {
      let tag = tagMap[tagName];
      console.log(tag);
      tag.ids.push(id);
    });
    this.reloadCollection().save(tagMap);
  }

  removeId(id) {
    let tagMap = this.db.tags.find()[0];
    let props = Object.keys(tagMap);
    props.splice(props.indexOf('_id'));

    props.forEach(tagName => {
      let tag = tagMap[tagName];
      tag.ids.splice(tag.ids.indexOf(id), 1);
    });

    this.reloadCollection().save(tagMap);
  }

  updateId(id, tags) {
    let tagMap = this.db.tags.find()[0];
    let props = Object.keys(tagMap);
    props.splice(props.indexOf('_id', 1));

    props.forEach(prop => {
      if (tags.indexOf(prop) !== -1 && tagMap[prop].ids.indexOf(id) === -1) tagMap[prop].ids.push(id);
      else if (tags.indexOf(prop) === -1 && tagMap[prop].ids.indexOf(id) !== -1) {
        let ids = tagMap[prop].ids;
        ids.splice(ids.indexOf(id), 1);
      }
    });

    this.reloadCollection().save(tagMap);
  }

  getIds(tags) {
    let isValid = tags.every(tag => this.config.TAGS.indexOf(tag) !== -1);
    if (tags.length === 0 || !isValid) return;

    let tagMap = this.db.tags.find()[0];
    let ids = tagMap[tags[0]].ids;
    if (!ids) return;

    tags.forEach(tagName => {
      tagMap[tagName].ids.forEach(id => {
        if (ids.indexOf(id) !== -1) ids.push(id);
      })
    });

    return ids;
  }

  reloadCollection() {
    this.db.tags.remove();
    this.db.loadCollections(['tags']);
    return this.db.tags;
  }
}

module.exports = new TagMapper();
