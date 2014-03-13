
/*!
 * Titanium Proxy element wrapper
 */

// Module dependencies

var Emitter = require('emitter');

// Constants

var BLACKLISTED = ['_proxy','prototype','__proto__', 'on', 'off', 'emit', 'set', 'get', 'onProxy', 'emitProxy', 'offProxy', 'exec'];

// expose element

module.exports = Element;

// Element instance stack

Element.els = [];

/**
 * [Element description]
 * @param {[type]} args [description]
 */

function Element(args){
  if (!(this instanceof Element)) { return new Element(args); }
  var self = this;

  if (!args.type) { throw new Error('Element type must be provided on creation.'); }
  self._proxyCallbacks = {};
  for (var key in args){
    if (!~BLACKLISTED.indexOf(key)) { self[key] = args[key]; }
  }
  self._proxy = (Function('return Ti.' + args.type)())(args);
  Element.els.push(this);
}

// inherit from Emitter

Element.prototype.__proto__ = Emitter.prototype;

/**
 * [off description]
 * @type {[type]}
 */

Element.prototype.off =
Element.prototype.removeListener =
Element.prototype.removeAllListeners =
Element.prototype.removeEventListener = function(event, fn) {
  if (0 === arguments.length) { this.offProxy(); }
  Emitter.prototype.off.apply(this, arguments);
};

/**
 * [set description]
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */

Element.prototype.set = function(key, value){
  if ('string' !== typeof key && value === null) {
    for (var prop in key){
      this[prop] = key[prop];
      this._proxy[prop] = key[prop];
      this.emit('change', { property: prop, value: key[prop] })
    }
  } else {
    this[key] = value;
    this._proxy[key] = value;
    this.emit('change', { property: key, value: value })
  }
  return this;
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
    this._proxyCallbacks[event] = function(e){
      self.emit(_eventID, e);
    };
    this._proxy.addEventListener(event, this._proxyCallbacks[event]);
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
      var _evtCB = self._proxyCallbacks[_evt];

      self._proxy.removeEventListener(_evt, _evtCB);
      self._proxyCallbacks[_evt] = null;
    });
  }


  // add js event listener

  this.off(this, _eventID, fn);

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
  this.emit('add', el);
};

/**
 * [rm description]
 * @type {[type]}
 */

Element.prototype.rm =
Element.prototype.remove = function(el) {
  this._proxy.remove(el._proxy || el);
  this.emit('remove', el);
};

/**
 * [open description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */

Element.prototype.open = function(args){
  this.visible = true;
  this._proxy.open(args);
  this.emit('open');
};

/**
 * [close description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */

Element.prototype.close = function(args){
  this.visible = false;
  this._proxy.close(args);
  this.emit('close');
};

/**
 * [show description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
Element.prototype.show = function(args){
  this.visible = true;
  this._proxy.show(args);
  this.emit('show');
};

/**
 * [hide description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */

Element.prototype.hide = function(args){
  this.visible = false;
  this._proxy.hide(args);
  this.emit('hide');
};

/**
 * [el description]
 * @return {[type]} [description]
 */

Element.prototype.el = function () {
  return this._proxy;
};
