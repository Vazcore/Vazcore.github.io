(() => {
  
  const config = { 
    apiKey: '92f1fd097fdd418d9c49feffcf62f5d0', 
    bbcNewsUri:  'https://newsapi.org/v1/articles?source=bbc-news'
  };
  const request = new Request(config.bbcNewsUri + '&apiKey=' + config.apiKey);
  const initRequest = { method: 'GET', mode: 'cors' };
  let errorBlock;
  let newsBlock;
  let loaderBlock;

  class News {
    constructor(newsData) {
      Object.assign(this, newsData);
    }
    getPublishDate() {
      return new Date(this.publishedAt).toDateString();
    }
  }

  // init
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    errorBlock = document.querySelector('#error_block');
    newsBlock = document.querySelector('#articles');
    loaderBlock = document.querySelector('#pageLoader');

    getNews()
      .then(response => onNews(response))
      .catch(err => onError(err));
  }

  // build dom elements
  function onNews(news) {
    let news_html = '';
    for (let n of news.values()) {
      news_html += putNewsToHtml(n);
    }

    newsBlock.insertAdjacentHTML('beforeEnd', news_html);
    loaderBlock.style.display = 'none';
  }

  function putNewsToHtml(n) {
    let news_html = `
    <article class="card radius shadowDepth1">
        <div class="card__image border-tlr-radius">
            <img src="${n.urlToImage}" alt="image" class="imgCard border-tlr-radius">
        </div>
        <div class="card__content card__padding">                    

            <div class="card__meta">
                <a href="http://www.bbc.co.uk/news" target="_blank">${n.author}</a>
                <time>${n.getPublishDate()}</time>
            </div>

            <article class="card__article">
                <h2><a href="${n.url}" target="_blank">${n.title}</a></h2>
                <p>${n.description}</p>
            </article>
        </div>
      </article>
    `;
    return news_html;
  }

  // fetch all news
  function getNews() {
    return new Promise((resolve, reject) => {
      fetch(request, initRequest)
        .then(response => response.json())
        .then(data => resolve(buildNews(data)))
        .catch(err => reject(err));
    });    
  }

  // build news object and set to Set
  function buildNews(data) {    
    if (!data.articles) return [];
    let news = new Map();
    for (let n of data.articles) {
      let newsModel = new News(n);        
      news.set(newsModel.title, newsModel);
    }
    return news;
  }

  // show error
  function onError(err) {
    errorBlock.textContent = err;
    errorBlock.style.display = 'block';
  }

})();