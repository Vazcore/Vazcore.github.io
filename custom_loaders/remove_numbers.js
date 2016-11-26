module.exports = function (source, map) {  
  this.cacheable();
  var new_source = source.replace(/,?[ ]?\w+:[ ]?\d+/gi, '');
  this.callback(null, new_source, map);
};