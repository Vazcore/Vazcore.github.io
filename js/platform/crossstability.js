module.exports = {  
  loadIEStyles: () => {
    require.ensure([], () => {
      require('../../style/ie10.scss');
    }, "ie_fixes");
  }
};