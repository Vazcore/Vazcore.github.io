export default {
  getPlatform: () => {
    let platform = navigator.userAgent.toLowerCase();
    if (platform.match(/MSIE 10/)
      || platform.match(/rv:11./)) {
        return 'IE';
    } else if (platform.match(/chrome/)) {
      return 'CH';
    } else if (platform.match(/firefox/)) {
      return 'FF';
    } else if (platform.match(/opera/)) {
      return 'OP';
    } else {
      return 'IE';
    } 
  }  
};