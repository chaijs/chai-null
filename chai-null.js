!function (name, definition) {
  if (typeof define == 'function' && typeof define.amd  == 'object') define(definition);
  else this[name] = definition();
}('chai_null', function () {
  // CommonJS require()
  function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }

  require.modules = {};

  require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };

  require.register = function (path, fn){
    require.modules[path] = fn;
  };

  require.relative = function (parent) {
    return function(p){
      if ('.' != p[0]) return require(p);

      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();

      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };


require.register("null", function (module, exports, require) {
/**
 * Null Object builder.
 *
 * @param {Object|Function} [optional] subject
 * @api public
 */
function NullObject(subject) {
  this.object = Object.create(null);
  this.handle(subject);
};

/**
 * Handle supplied subject.
 *
 * @param {Object|Function} subject
 * @api private
 */
NullObject.prototype.handle = function(object) {
  switch (typeof object) {
    case 'object':   this.object = new Objekt(object); break;
    case 'function': this.object = new Klass(object);  break;
  }
};

/**
 * Builds a null method.
 *
 * @param {String} name.
 * @returns `this`
 * @api public
 */
NullObject.prototype.method = function(name) {
  this.object[name] = function() { return null; };
  return this;
};

/**
 * Returns the null object.
 *
 * @returns {Object}
 */
NullObject.prototype.create = function() {
  return this.object;
};

/**
 * Null Object builder for objects.
 *
 * @param {Object} subject
 * @api private
 */
function Objekt(subject) {
  for (var property in subject) {
    subject[property] = ('function' === typeof subject[property])
      ? function () { return null; }
      : null;
  }

  return subject;
};

/**
 * Null Object builder for classes.
 *
 * @param {Object} subject
 * @api private
 */
function Klass(subject) {
  return new Objekt(new subject);
};

/**
 * Register `NullObject` as a chai plugin.
 */
module.exports = function(chai, _) {
  chai.Null = function(subject) {
    return new NullObject(subject);
  };
};

}); // module null
  return require('null');
});

chai.use(chai_null);
