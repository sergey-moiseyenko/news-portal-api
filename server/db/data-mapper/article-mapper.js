class ArticleMapper {

    constructor() {
      this.db = require('diskdb');
      this.config = require('../../config/config');
      this.util = require('../../util/util');
      this.connect = this.db.connect(__dirname + '/../data', ['articles']);
    }

    setArticlesToDb(articles) {
      this.db.articles.removeArticle();
      this.db.loadCollections(['articles']);
      if (articles.length == 0) return;
      this.db.articles.save(articles);
    }

    getArticle(id) {
      //return (this.db.articles.findOne({id: id}))? this.db.articles.findOne({id: id}): undefined;
      let articleMap = this.db.articles.find()[0];
      return articleMap[id];
    }

    loadArticles(filter) {

      /*if (Object.keys(filter).length === 0) return this.db.articles.find();

      let filterTags = filter.tags || [];
      delete filter.tags;

      let articles = this.db.articles.find(filter);
      console.log(articles);
      let filteredArticles = articles.filter(article => {
        if (!filterTags.every(tag => article.tags.includes(tag))) return false;
        return true;
      });

      return filteredArticles;
      */

      let skip = 0;
      let top = 10;

      let articleMap = this.db.articles.find()[0];
      let props = Object.keys(articleMap);
      props.pop();
      let articles = [];
      props.forEach(prop => {
        articles.push(articleMap[prop]);
      });

      let filterTags = filter.tags || [];
      delete filter.tags;
      let filterKeys = Object.keys(filter);
      let filteredArticles = articles.filter(article => {
        if (!filterTags.every(tag => article.tags.includes(tag))) return false;
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
      return props.every(p => article.hasOwnProperty(p.key) && this.classOf(article[p.key]) === p.type);
    };

    update(article) {
      //this.db.articles.update({id: article.id}, article);
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
      this.db.articles.remove();
      this.db.loadCollections(['articles']);
      this.db.articles.save(articleMap);
      return true;
    }

    addArticle(article) {
      //this.db.articles.save(article);
      let articleMap = this.db.articles.find()[0];
      console.log(articleMap);
      articleMap[article.id] = article;
      this.db.articles.remove();
      this.db.loadCollections(['articles']);
      this.db.articles.save(articleMap);
      console.log(this.db.articles.find());
    }

    removeArticle(id) {
      //this.db.articles.remove(id);
      let articleMap = this.db.articles.find()[0];
      delete articleMap[id.id];
      this.db.articles.remove();
      this.db.loadCollections(['articles']);
      this.db.articles.save(articleMap);
    }
  }

module.exports = new ArticleMapper();
