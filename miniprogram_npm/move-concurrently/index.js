module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737539, function(require, module, exports) {

module.exports = move

var nodeFs = require('fs')
var rimraf = require('rimraf')
var validate = require('aproba')
var copy = require('copy-concurrently')
var RunQueue = require('run-queue')
var extend = Object.assign || require('util')._extend

function promisify (Promise, fn) {
  return function () {
    var args = [].slice.call(arguments)
    return new Promise(function (resolve, reject) {
      return fn.apply(null, args.concat(function (err, value) {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      }))
    })
  }
}

function move (from, to, opts) {
  validate('SSO|SS', arguments)
  opts = extend({}, opts || {})

  var Promise = opts.Promise || global.Promise
  var fs = opts.fs || nodeFs
  var rimrafAsync = promisify(Promise, rimraf)
  var renameAsync = promisify(Promise, fs.rename)

  opts.top = from

  var queue = new RunQueue({
    maxConcurrency: opts.maxConcurrency,
    Promise: Promise
  })
  opts.queue = queue
  opts.recurseWith = rename

  queue.add(0, rename, [from, to, opts])

  return queue.run().then(function () {
    return remove(from)
  }, function (err) {
    // if the target already exists don't clobber it
    if (err.code === 'EEXIST' || err.code === 'EPERM') {
      return passThroughError()
    } else {
      return remove(to).then(passThroughError, passThroughError)
    }
    function passThroughError () {
      return Promise.reject(err)
    }
  })

  function remove (target) {
    var opts = {
      unlink: fs.unlink,
      chmod: fs.chmod,
      stat: fs.stat,
      lstat: fs.lstat,
      rmdir: fs.rmdir,
      readdir: fs.readdir,
      glob: false
    }
    return rimrafAsync(target, opts)
  }

  function rename (from, to, opts, done) {
    return renameAsync(from, to).catch(function (err) {
      if (err.code !== 'EXDEV') {
        return Promise.reject(err)
      } else {
        return remove(to).then(function () {
          return copy.item(from, to, opts)
        })
      }
    })
  }
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737539);
})()
//miniprogram-npm-outsideDeps=["fs","rimraf","aproba","copy-concurrently","run-queue","util"]
//# sourceMappingURL=index.js.map