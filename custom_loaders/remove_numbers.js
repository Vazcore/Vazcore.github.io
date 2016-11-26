module.exports = function (source) {  
  this.cacheable();
  // deleting whitespaces
  var json_string = JSON.stringify(source).replace(/(?:\\[rn])+/g, '').replace(/ /g, '');
  json_string = JSON.parse(json_string);
  
  var new_source = json_string.replace(/{\"\w+\":\d+,/gi, '{')
  .replace(/\"\w+\":\d+,/gi, '')
  .replace(/,\"\w+\":\d+}/gi, '}');  
  return new_source;
};