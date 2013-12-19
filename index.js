
/*!
 * Titanium Proxy element wrapper
 */

// Module dependencies

var Emitter = require('emitter')
  , EL = require('./proxylist');

// Constants

var BLACKLISTED = ['_proxy','class','prototype','__proto__', 'on', 'off', 'emit', 'set', 'get', 'onProxy', 'emitProxy', 'offProxy', 'exec'];

// expose element

module.exports = Element;

/**
 * [Element description]
 * @param {[type]} args [description]
 */

function Element(args){
  if (!(this instanceof Element)) { return new Element(args); }
  var self = this;

  if (!args.type) { throw new Error('Element type must be provided on creation.'); }

  self._proxy = EL[args.type](args);

  for (var key in args){
    if (!~BLACKLISTED.indexOf(key)) { self[key] = args[key]; }
  }
}

// inherit from Emitter

Element.prototype.__proto__ = Emitter.prototype;

/**
 * [set description]
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */

Element.prototype.set = function(key, value){
  this[key] = value;
  this._proxy[key] = value;
};

/**
 * [get description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */

Element.prototype.get = function(key){
  return this._proxy[key];
};

/**
 * [onProxy description]
 * @param  {[type]}   event [description]
 * @param  {Function} fn    [description]
 * @return {[type]}         [description]
 */

Element.prototype.onProxy = function(event, fn){
  var self = this;
  var _eventID = '__proxy:' + event;

  // add native proxy listener if non exists

  if (!this.hasListeners(_eventID)) {
    this._proxy.addEventListener(event, function(e){
      self.emit(_eventID, e);
    });
  }

  // add js event listener

  this.on(_eventID, fn);
};

/**
 * [onceProxy description]
 * @param  {[type]}   event [description]
 * @param  {Function} fn    [description]
 * @return {[type]}         [description]
 */

Element.prototype.onceProxy = function(event, fn){
  var self = this;

  function on() {
    self.offProxy(event, on);
    fn.apply(this, arguments);
  }

  this.onProxy(event, on);
};

/**
 * [emitProxy description]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */

Element.prototype.emitProxy = function(event){
  var self = this;
  var _eventID = '__proxy:' + event;
  var args = Array.prototype.slice.call(arguments,0);
  args[0] = _eventID;

  // emit the js event
  this.emit.apply(this, args);
};

/**
 * [offProxy description]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */

Element.prototype.offProxy = function(event, fn){
  var self = this;
  var _eventID = (event) ? '__proxy:' + event : null;
  var _evtCB = function(e){ self.emit(_eventID, e); };

  if (!event) {
    Object.keys(this._callbacks).forEach(function(_event){
      if (!~_event.indexOf('__proxy:')) { return; }

      var _evt = _event.replace('__proxy:', '');
      var _evtCB = function(e){ self.emit(_event, e); };

      self._proxy.removeEventListener(_evt, _evtCB);
    });
  }


  // add js event listener

  this.off(_eventID, fn);

  if (!!event && (!fn || !this.hasListeners(_eventID))){
    this._proxy.removeEventListener(event, _evtCB);
  }
};

/**
 * [exec description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */

Element.prototype.exec = function(name){
  return this._proxy[name];
};

/**
 * [add description]
 * @param {[type]} el [description]
 */

Element.prototype.add = function(el) {
  this._proxy.add(el._proxy || el);
};

/**
 * [rm description]
 * @type {[type]}
 */

Element.prototype.rm =
Element.prototype.remove = function(el) {
  this._proxy.remove(el._proxy || el);
};

/**
 * [el description]
 * @return {[type]} [description]
 */

Element.prototype.el = function () {
  return this._proxy;
};