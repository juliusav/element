
/*!
 * utils
 */

var Util = module.exports = {};

/**
 * combine two objects
 * @param  {Object} base
 * @param  {Object} obj
 * @return {Object}
 * @api public
 */

Util.merge = function (base) {
  var args = Array.prototype.slice.call(arguments,0);
  args.forEach(function(obj){
    for (var key in obj) {
      base[key] = obj[key];
    }
  });
};