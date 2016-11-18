'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

  var config = {
    apiKey: '92f1fd097fdd418d9c49feffcf62f5d0',
    bbcNewsUri: 'https://newsapi.org/v1/articles?source=bbc-news',
    custom_error: 'Sorry. News temporarily unabalilable!'
  };
  var request = new Request(config.bbcNewsUri + '&apiKey=' + config.apiKey);
  var initRequest = { method: 'GET', mode: 'cors' };
  var errorBlock = void 0;
  var newsBlock = void 0;
  var loaderBlock = void 0;

  var News = function () {
    function News(newsData) {
      _classCallCheck(this, News);

      Object.assign(this, newsData);
    }

    _createClass(News, [{
      key: 'getPublishDate',
      value: function getPublishDate() {
        return new Date(this.publishedAt).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      }
    }]);

    return News;
  }();

  // init


  document.addEventListener("DOMContentLoaded", init);

  function init() {
    errorBlock = document.querySelector('#error_block');
    newsBlock = document.querySelector('#articles');
    loaderBlock = document.querySelector('#pageLoader');

    getNews().then(function (response) {
      return onNews(response);
    }).catch(function (err) {
      return onError(err);
    });
  }

  // build dom elements
  function onNews(news) {
    var news_html = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = news.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        news_html += putNewsToHtml(n);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    newsBlock.insertAdjacentHTML('beforeEnd', news_html);
    loaderBlock.style.display = 'none';
  }

  function putNewsToHtml(n) {
    var news_html = '\n    <article class="card radius shadowDepth1">\n        <div class="card__image border-tlr-radius">\n            <img src="' + n.urlToImage + '" alt="image" class="imgCard border-tlr-radius">\n        </div>\n        <div class="card__content card__padding">                    \n\n            <div class="card__meta">\n                <a href="http://www.bbc.co.uk/news" target="_blank">' + n.author + '</a>\n                <time>' + n.getPublishDate() + '</time>\n            </div>\n\n            <article class="card__article">\n                <h2><a href="' + n.url + '" target="_blank">' + n.title + '</a></h2>\n                <p>' + n.description + '</p>\n            </article>\n        </div>\n      </article>\n    ';
    return news_html;
  }

  // fetch all news
  function getNews() {
    return new Promise(function (resolve, reject) {
      fetch(request, initRequest).then(function (response) {
        return response.json();
      }).then(function (data) {
        return resolve(buildNews(data));
      }).catch(function (err) {
        return reject(err);
      });
    });
  }

  // build news object and set to Set
  function buildNews(data) {
    if (!data.articles) return [];
    var news = new Map();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = data.articles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var n = _step2.value;

        var newsModel = new News(n);
        news.set(newsModel.title, newsModel);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return news;
  }

  // show error
  function onError(err) {
    errorBlock.textContent = config.custom_error;
    errorBlock.style.display = 'block';

    console.log(err);
  }
})();