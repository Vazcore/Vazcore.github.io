import 'whatwg-fetch';
import "babel-polyfill";
import config from './config';
import News from './news.class';

const request = new Request(config.bbcNewsUri + '&apiKey=' + config.apiKey);
const requestConfig = { method: 'GET', mode: 'cors' };

let elements = {
  errorBlock: null,
  newsBlock: null,
  loaderBlock: null
};

module.exports = class {
  // load all elements
  static loadElements() {
    elements.errorBlock = document.querySelector('#error_block');
    elements.newsBlock = document.querySelector('#articles');
    elements.loaderBlock = document.querySelector('#pageLoader');
  }
  static getElements() { return elements }
  // fetch all news
  static getNews(r, config) {
    let req = r || request;
    let req_config = config || requestConfig;
    return new Promise((resolve, reject) => {
      fetch(req, req_config)
        .then(response => response.json())
        .then(data => resolve(this.buildNews(data)))
        .catch(err => reject(err));
    });
  }
  // build dom elements
  static onNews(news) {
    let news_html = '';
    for (let n of news.values()) {
      news_html += this.putNewsToHtml(n);
    }

    elements.newsBlock.insertAdjacentHTML('beforeEnd', news_html);
    elements.loaderBlock.style.display = 'none';
  }
  // generating preview news html
  static putNewsToHtml(n) {
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
  // build news object and set to Set
  static buildNews(data) {
    if (!data.articles) return [];
    let news = new Map();
    for (let n of data.articles) {
      let newsModel = new News(n);        
      news.set(newsModel.title, newsModel);
    }
    return news;
  }
  // show error
  static onError(err) {
    elements.errorBlock.textContent = config.custom_error;    
    elements.errorBlock.style.display = 'block';
    console.log(err);
  }  
}