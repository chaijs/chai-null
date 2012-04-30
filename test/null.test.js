/*!
 * chai-null :: Null Object Pattern
 *
 * Chai.js Team - http://chaijs.com/
 * Copyright (c) 2012 Veselin Todorov <hi@vesln.com>
 *
 * MIT Licensed
 */

/**
 * Register the plugin.
 */
if (!chai) {
  var chai = require('chai');
  chai.use(require('..'));
};

/**
 * Support.
 */
var expect = chai.expect;

describe('Chai Null', function() {
  it('attaches to chai', function() {
    chai.expect(chai).to.respondTo('Null');
  });

  describe('when building from class', function() {
    function Klass() {};
    Klass.prototype.foo = function() { return 'test'; }
    Klass.prototype.bar = 3;

    it('makes all methods to return null', function() {
      var subject = chai.Null(Klass).create();
      expect(subject.foo()).to.eql(null);
    });

    it('makes all properties to be null', function() {
      var subject = chai.Null(Klass).create();
      expect(subject.bar).to.eql(null);
    });
  });

  describe('when building from existing object', function() {
    var object = { bar: 3, foo: function() { return 'test'; } };

    it('makes all methods to return null', function() {
      var subject = chai.Null(object).create();
      expect(subject.foo()).to.eql(null);
    });

    it('makes all properties to be null', function() {
      var subject = chai.Null(object).create();
      expect(subject.bar).to.eql(null);
    });
  });

  describe('when building from blank object', function() {
    it('returns object with supplied methods', function() {
      var subject = chai.Null().method('foo').method('bar').create();

      expect(subject).to.respondTo('foo');
      expect(subject).to.respondTo('bar');
    });

    it('builds object with methods that return null', function() {
      var subject = chai.Null().method('foo').create();
      expect(subject.foo()).to.eql(null);
    });
  });
});
