class ArticleMapper {

    constructor() {
      this.db = require('diskdb');
      this.connect = this.db.connect(__dirname + '/../data', ['articles']);
    }

    setArticlesToDb(articles) {
      this.db.articles.removeArticle();
      this.db.loadCollections(['articles']);
      if (articles.length == 0) return;
      this.db.articles.save(articles);
    }

    getArticle(id) {
      return (this.db.articles.findOne({id: id}))? this.db.articles.findOne({id: id}): undefined;
    }

    loadArticles() {
      this.db.loadCollections(['articles']);
      return this.db.articles.find();
    }

    update(article) {
      this.db.articles.update({id: article.id}, article);
    }

    addArticle(article) {
      this.db.articles.save(article);
    }

    removeArticle(id) {
      this.db.articles.remove(id);
    }
  }

module.exports = new ArticleMapper();
