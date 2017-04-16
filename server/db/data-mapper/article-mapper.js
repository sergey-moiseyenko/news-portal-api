class ArticleMapper {

    constructor() {
      this.db = require('diskdb');
      this.config = require('../../config/config');
      this.util = require('../../util/util');
      this.tagMapper = require('./tag-mapper');
      this.connect = this.db.connect(__dirname + '/../data', ['articles']);
    }

    setArticlesToDb(articles) {
      this.db.articles.removeArticle();
      this.db.loadCollections(['articles']);
      if (articles.length == 0) return;
      this.db.articles.save(articles);
    }

    getArticle(id) {
      let articleMap = this.db.articles.find()[0];
      return articleMap[id];
    }

    loadArticles(filter) {

      let skip = this.config.SKIP_DEFAULTS;
      let top = this.config.TOP_DEFAULTS;

      let articleMap = this.db.articles.find()[0];
      let props = Object.keys(articleMap);
      props.splice(props.indexOf('_id'), 1);
      let articles = [];
      props.forEach(prop => {
        articles.push(articleMap[prop]);
      });

      let filterTags = filter.tags || [];
      let ids = this.tagMapper.getIds(filterTags) || [];
      delete filter.tags;
      let filterKeys = Object.keys(filter);
      let filteredArticles = articles.filter(article => {
        //if (!filterTags.every(tag => article.tags.includes(tag))) return false;
        if (ids.length !== 0 && ids.indexOf(article.id) === -1) return false;
        return filterKeys.every(filterKey => filter[filterKey].toString() === article[filterKey].toString());
      });

      skip = this.util.skipNumberValid(skip, filteredArticles.length);
      top = this.util.topNumberValid(top);
      filteredArticles = filteredArticles.slice(skip, skip + top);
      filteredArticles.sort((article1, article2) => article2.createdAt - article1.createdAt);

      return filteredArticles;
    }

    classOf(o) {
      if (o === null) return "Null";
      if (o === undefined) return "Undefined";
      return Object.prototype.toString.call(o).slice(8, -1);
    }

    isArticleValid (article) {
      if (!article) return false;
      const props = this.config.VALIDATION_SCHEMA.ARTICLE.all();
      return props.every(p => article.hasOwnProperty(p.key) && this.classOf(article[p.key]) === p.type)
    };

    update(article) {
      let articleMap = this.db.articles.find()[0];

      let currentArticle = articleMap[article.id];
      if (!currentArticle) return false;

      let properties = ['title', 'summary', 'content', 'tags'];
      let articleClone = Object.assign({}, currentArticle);

      properties.forEach((propertyName) => {
        if (article[propertyName]) {
          articleClone[propertyName] = article[propertyName];
        }
      });

      if (this.isArticleValid(articleClone)) return false;
      articleMap[article.id] = articleClone;
      this.tagMapper.updateId(article.id, article.tags);
      this.reloadCollection().save(articleMap);
      return true;
    }

    addArticle(article) {

      if (!article) return;
      article.createdAt = new Date(article.createdAt);
      if (!this.isArticleValid(article)) return;

      let articleMap = this.db.articles.find()[0];
      articleMap[article.id] = article;

      this.tagMapper.addId(article.id, article.tags);
      this.reloadCollection().save(articleMap);
    }

    removeArticle(id) {
      this.tagMapper.removeId(id);
      let articleMap = this.db.articles.find()[0];
      delete articleMap[id.id];
      this.reloadCollection().save(articleMap);
    }

    reloadCollection() {
      this.db.articles.remove();
      this.db.loadCollections(['articles']);
      return this.db.articles;
    }
  }

module.exports = new ArticleMapper();
