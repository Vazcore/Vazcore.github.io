module.exports = {
  loadIEStyles: () => {
    if(navigator.userAgent.match(/MSIE 10/)
      || navigator.userAgent.match(/rv:11./)){

        require.ensure([], () => {
          require('../style/ie10.scss');
        }, "ie_fixes");

    }
  }
};