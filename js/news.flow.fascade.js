import 'whatwg-fetch';
import "babel-polyfill";
import NewsSubject from './news.subject';
import HeaderController from './header.controller';
import { combineReducers, createStore } from './custom.redux';
import newsReducer from './news.reducer';

export class NewsFlowFascade {
  
  static init() {

    let reducers = combineReducers({
      news: newsReducer
    });

    this.store = createStore(reducers);
    this.store.subscribe((data) => {
      console.log(data);
    });

    this.newsSubject = null;
    this.subscribeOnNews(HeaderController.updateHeader.bind(HeaderController));
  }

  static initLoadFromButton(loaderButton, platform) {
    this.init();
    loaderButton.addEventListener('click', (e) => {
      loaderButton.style.display = 'none';
      this.loadResources(platform);
    });
  }

  static initOnStart(platform) {
    this.init();
    this.loadResources(platform);
  }

  static subscribeOnNews(update) {
    if (this.newsSubject === null) this.newsSubject = new NewsSubject();
    this.newsSubject.subscribe(update);
  }

  static loadResources(platform) {
    console.log(platform);
    require.ensure([], () => {
      require('../style/news.scss');
      require('../style/gmaterials.scss');
      let NewsController = require("./news.controller");
      let crossBrowserTools = require('./crossstability');
      
      NewsController.init(this.newsSubject, this.store);
      
      // loading elements on init
      NewsController.loadElements();

      //
      this.subscribeOnNews(NewsController.onNews.bind(NewsController));

      // if IE - load new styles
      if (platform === 'IE') crossBrowserTools.loadIEStyles();

      //fetching news
      NewsController.getNews()
        .then(response => { 
          this.newsSubject.emit(response);
          this.store.dispatch({ type: 'INSERT', payload: response });
        })
        .catch(err => NewsController.onError(err));
    }, "news_module");
  }

}