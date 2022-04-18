module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737361, function(require, module, exports) {
// Generated by CoffeeScript 1.7.1
(function() {
  var exports, iferr, printerr, throwerr, tiferr,
    __slice = [].slice;

  iferr = function(fail, succ) {
    return function() {
      var a, err;
      err = arguments[0], a = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (err != null) {
        return fail(err);
      } else {
        return typeof succ === "function" ? succ.apply(null, a) : void 0;
      }
    };
  };

  tiferr = function(fail, succ) {
    return iferr(fail, function() {
      var a, err;
      a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      try {
        return succ.apply(null, a);
      } catch (_error) {
        err = _error;
        return fail(err);
      }
    });
  };

  throwerr = iferr.bind(null, function(err) {
    throw err;
  });

  printerr = iferr(function(err) {
    return console.error(err.stack || err);
  });

  module.exports = exports = iferr;

  exports.iferr = iferr;

  exports.tiferr = tiferr;

  exports.throwerr = throwerr;

  exports.printerr = printerr;

}).call(this);

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737361);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map