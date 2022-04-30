class ArticlesView {
  constructor(model, api) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector('#main-container');
  
    this._loadArticles();
    
    document.querySelector('#search-content-btn').addEventListener('click', () => {      
      const query = document.querySelector('#search-content-input').value;
      this._loadArticles(query);
    });
  }

  displayArticles() {
    document.querySelectorAll('div.article').forEach(element => {
      element.remove();
    });

    const articles = this.model.getArticles();

    articles.forEach(article => {
      const articleElement = this._createArticleElement();
      this.mainContainerEl.append(articleElement);

      const linkElement = this._createLinkElement(article);
      articleElement.append(linkElement);

      const imageElement = this._createImageElement(article);
      linkElement.append(imageElement);

      const headlineElement = this._createHeadlineElement(article);
      linkElement.append(headlineElement);    
    });
  }

  _prepareArticles(articles) {
    let articlesList = articles.response.results;
    console.log(articlesList);    // Log list of articles
    this.model.setArticles(articlesList);
  }

  _loadArticles(query) {
    this.api.loadArticles((articles) => {
      this._prepareArticles(articles);
      this.displayArticles();
    }, query);
  }

  _createArticleElement() {
    const articleEl = document.createElement('div');
    articleEl.className = 'article';
    return articleEl;
  }

  _createLinkElement(article) {
    const linkEl = document.createElement('a');
    linkEl.href = article.webUrl;
    return linkEl;
  }

  _createImageElement(article) {
    const imageEl = document.createElement('img');
    imageEl.className = 'article-image';
    imageEl.src = article.fields.thumbnail;
    return imageEl;
  }

  _createHeadlineElement(article) {
    const headlineEl = document.createElement('h3');
    headlineEl.className = 'article-headline';
    headlineEl.innerText = article.fields.headline;
    return headlineEl;
  }
}

module.exports = ArticlesView;
