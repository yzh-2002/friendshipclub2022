module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737462, function(require, module, exports) {

/**
 * Module dependencies.
 */

const debug = require('debug')('koa-mount')
const compose = require('koa-compose')
const assert = require('assert')

/**
 * Expose `mount()`.
 */

module.exports = mount

/**
 * Mount `app` with `prefix`, `app`
 * may be a Koa application or
 * middleware function.
 *
 * @param {String|Application|Function} prefix, app, or function
 * @param {Application|Function} [app or function]
 * @return {Function}
 * @api public
 */

function mount (prefix, app) {
  if (typeof prefix !== 'string') {
    app = prefix
    prefix = '/'
  }

  assert.equal(prefix[0], '/', 'mount path must begin with "/"')

  // compose
  const downstream = app.middleware
    ? compose(app.middleware)
    : app

  // don't need to do mounting here
  if (prefix === '/') return downstream

  const trailingSlash = prefix.slice(-1) === '/'

  const name = app.name || 'unnamed'
  debug('mount %s %s', prefix, name)

  return async function (ctx, upstream) {
    const prev = ctx.path
    const newPath = match(prev)
    debug('mount %s %s -> %s', prefix, name, newPath)
    if (!newPath) return await upstream()

    ctx.mountPath = prefix
    ctx.path = newPath
    debug('enter %s -> %s', prev, ctx.path)

    await downstream(ctx, async () => {
      ctx.path = prev
      await upstream()
      ctx.path = newPath
    })

    debug('leave %s -> %s', prev, ctx.path)
    ctx.path = prev
  }

  /**
   * Check if `prefix` satisfies a `path`.
   * Returns the new path.
   *
   * match('/images/', '/lkajsldkjf') => false
   * match('/images', '/images') => /
   * match('/images/', '/images') => false
   * match('/images/', '/images/asdf') => /asdf
   *
   * @param {String} prefix
   * @param {String} path
   * @return {String|Boolean}
   * @api private
   */

  function match (path) {
    // does not match prefix at all
    if (path.indexOf(prefix) !== 0) return false

    const newPath = path.replace(prefix, '') || '/'
    if (trailingSlash) return newPath

    // `/mount` does not match `/mountlkjalskjdf`
    if (newPath[0] !== '/') return false
    return newPath
  }
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737462);
})()
//miniprogram-npm-outsideDeps=["debug","koa-compose","assert"]
//# sourceMappingURL=index.js.map