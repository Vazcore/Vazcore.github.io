require('../style/styles.scss');
import platformDetector from './platform';
import { NewsFlowFascade } from './news.flow.fascade';
import testObj from './test.json';

(() => {
  
  // init
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    let platform = platformDetector.getPlatform();
    let loaderButton = document.querySelector('#load');

    NewsFlowFascade.initLoadFromButton(
      loaderButton,
      platform
    );

    if (!PRODUCTION) {
      console.log('Development Mode!');
      console.log('Object without numbers:');
      console.log(testObj);
    }
  }

})();