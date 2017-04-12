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

    loadArticles(filter) {
      if (Object.keys(filter).length === 0) return this.db.articles.find();

      let filterTags = filter.tags || [];
      delete filter.tags;

      let articles = this.db.articles.find(filter);
      console.log(articles);
      let filteredArticles = articles.filter(article => {
        if (!filterTags.every(tag => article.tags.includes(tag))) return false;
        return true;
      });

      return filteredArticles;
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
