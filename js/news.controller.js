import 'whatwg-fetch';
import "babel-polyfill";
import config from './config';
import { NewsBuilder } from './news.builder';

const request = new Request(config.bbcNewsUri + '&apiKey=' + config.apiKey);
const requestConfig = { method: 'GET', mode: 'cors' };

let elements = {
  errorBlock: null,
  newsBlock: null,
  loaderBlock: null,
  articlesList: null
};

let newsMap = new Map();
let subject;
let store;

module.exports = class {
  //init
  static init(sub, st) {
    subject = sub;
    store = st;
  }

  // load all elements
  static loadElements() {
    elements.errorBlock = document.querySelector('#error_block');
    elements.newsBlock = document.querySelector('#articles');
    elements.loaderBlock = document.querySelector('#pageLoader');
    elements.articlesList = document.querySelector('#articles_list');

    elements.newsBlock.addEventListener('click', (e) => {
      const target = e.target;
      if (target.getAttribute('id') === 'hideNews') {
        let title = target.getAttribute('data-newstitle');
        newsMap.delete(title);
        subject.emit(newsMap);
        store.dispatch({ type: 'REMOVE', payload: { key: title } });
      }
    });
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
    elements.articlesList.innerHTML = '';
    for (let n of news.values()) {
      news_html += n.template;
    }

    //elements.newsBlock.insertAdjacentHTML('beforeEnd', news_html);
    elements.articlesList.innerHTML = news_html;
    elements.loaderBlock.style.display = 'none';
  }
  
  // build news object and set to Set
  static buildNews(data) {
    if (!data.articles) return [];    
    for (let [index, value] of data.articles.entries()) {
      // assume that our data contains "news category" property
      let topic = index % 2 === 0 ? 'sport' : index % 3 === 0 ? 'weather' : 'hot';
      let newsModel = new NewsBuilder();
      newsModel.addData(value);
      switch (topic) {
        case 'hot':
          newsModel.addHotLogo();
          break;
       case 'sport':
          newsModel.addSportLogo();
          break;
        default:
          newsModel.addWeatherLogo();
          break;
      }
      const newsData = newsModel.build();
      if (newsData !== null) newsMap.set(newsData.title, newsData);
    }
    return newsMap;
  }
  // show error
  static onError(err) {
    elements.errorBlock.textContent = config.custom_error;    
    elements.errorBlock.style.display = 'block';
    console.log(err);
  }  
}