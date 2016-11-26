require('../style/styles.scss');
import testObj from './test.js';

(() => {
  
  // init
  document.addEventListener("DOMContentLoaded", init);

  function init() {    
    let loaderButton = document.querySelector('#load');
    loaderButton.addEventListener('click', (e) => {
      loaderButton.style.display = 'none';
      require.ensure([], () => {
        require('../style/news.scss');
        let NewsController = require("./news.controller");
        let crossBrowserTools = require('./crossstability');
        
        // loading elements on init
        NewsController.loadElements();

        // if IE 10 - load new styles
        crossBrowserTools.loadIEStyles();

        //fetching news
        NewsController.getNews()
          .then(response => NewsController.onNews(response))
          .catch(err => NewsController.onError(err));
      }, "news_module");
    });
    
    

    if (!PRODUCTION) {
      console.log('Development Mode!');
      console.log('Object without numbers:');
      console.log(testObj);
    }
  }

})();