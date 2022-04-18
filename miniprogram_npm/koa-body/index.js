module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737455, function(require, module, exports) {
/**
 * koa-body - index.js
 * Copyright(c) 2014
 * MIT Licensed
 *
 * @author  Daryl Lau (@dlau)
 * @author  Charlike Mike Reagent (@tunnckoCore)
 * @api private
 */



/**
 * Module dependencies.
 */

const buddy = require('co-body');
const forms = require('formidable');
const symbolUnparsed = require('./unparsed.js');

/**
 * Expose `requestbody()`.
 */

module.exports = requestbody;

const jsonTypes = [
  'application/json',
  'application/json-patch+json',
  'application/vnd.api+json',
  'application/csp-report'
];

/**
 *
 * @param {Object} options
 * @see https://github.com/dlau/koa-body
 * @api public
 */
function requestbody(opts) {
  opts = opts || {};
  opts.onError = 'onError' in opts ? opts.onError : false;
  opts.patchNode = 'patchNode' in opts ? opts.patchNode : false;
  opts.patchKoa = 'patchKoa' in opts ? opts.patchKoa : true;
  opts.multipart = 'multipart' in opts ? opts.multipart : false;
  opts.urlencoded = 'urlencoded' in opts ? opts.urlencoded : true;
  opts.json = 'json' in opts ? opts.json : true;
  opts.text = 'text' in opts ? opts.text : true;
  opts.encoding = 'encoding' in opts ? opts.encoding : 'utf-8';
  opts.jsonLimit = 'jsonLimit' in opts ? opts.jsonLimit : '1mb';
  opts.jsonStrict = 'jsonStrict' in opts ? opts.jsonStrict : true;
  opts.formLimit = 'formLimit' in opts ? opts.formLimit : '56kb';
  opts.queryString = 'queryString' in opts ? opts.queryString : null;
  opts.formidable = 'formidable' in opts ? opts.formidable : {};
  opts.includeUnparsed = 'includeUnparsed' in opts ? opts.includeUnparsed : false
  opts.textLimit = 'textLimit' in opts ? opts.textLimit : '56kb';

  // @todo: next major version, opts.strict support should be removed
  if (opts.strict && opts.parsedMethods) {
    throw new Error('Cannot use strict and parsedMethods options at the same time.')
  }

  if ('strict' in opts) {
    console.warn('DEPRECATED: opts.strict has been deprecated in favor of opts.parsedMethods.')
    if (opts.strict) {
      opts.parsedMethods = ['POST', 'PUT', 'PATCH']
    } else {
      opts.parsedMethods = ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE']
    }
  }

  opts.parsedMethods = 'parsedMethods' in opts ? opts.parsedMethods : ['POST', 'PUT', 'PATCH']
  opts.parsedMethods = opts.parsedMethods.map(function (method) { return method.toUpperCase() })

  return function (ctx, next) {
    var bodyPromise;
    // only parse the body on specifically chosen methods
    if (opts.parsedMethods.includes(ctx.method.toUpperCase())) {
      try {
        if (opts.json && ctx.is(jsonTypes)) {
          bodyPromise = buddy.json(ctx, {
            encoding: opts.encoding,
            limit: opts.jsonLimit,
            strict: opts.jsonStrict,
            returnRawBody: opts.includeUnparsed
          });
        } else if (opts.urlencoded && ctx.is('urlencoded')) {
          bodyPromise = buddy.form(ctx, {
            encoding: opts.encoding,
            limit: opts.formLimit,
            queryString: opts.queryString,
            returnRawBody: opts.includeUnparsed
          });
        } else if (opts.text && ctx.is('text/*')) {
          bodyPromise = buddy.text(ctx, {
            encoding: opts.encoding,
            limit: opts.textLimit,
            returnRawBody: opts.includeUnparsed
          });
        } else if (opts.multipart && ctx.is('multipart')) {
          bodyPromise = formy(ctx, opts.formidable);
        }
      } catch (parsingError) {
        if (typeof opts.onError === 'function') {
          opts.onError(parsingError, ctx);
        } else {
          throw parsingError;
        }
      }
    }

    bodyPromise = bodyPromise || Promise.resolve({});
    return bodyPromise.catch(function(parsingError) {
      if (typeof opts.onError === 'function') {
        opts.onError(parsingError, ctx);
      } else {
        throw parsingError;
      }
      return next();
    })
    .then(function(body) {
      if (opts.patchNode) {
        if (isMultiPart(ctx, opts)) {
          ctx.req.body = body.fields;
          ctx.req.files = body.files;
        } else if (opts.includeUnparsed) {
          ctx.req.body = body.parsed || {};
          if (! ctx.is('text/*')) {
            ctx.req.body[symbolUnparsed] = body.raw;
          }
        } else {
          ctx.req.body = body;
        }
      }
      if (opts.patchKoa) {
        if (isMultiPart(ctx, opts)) {
          ctx.request.body = body.fields;
          ctx.request.files = body.files;
        } else if (opts.includeUnparsed) {
          ctx.request.body = body.parsed || {};
          if (! ctx.is('text/*')) {
            ctx.request.body[symbolUnparsed] = body.raw;
          }
        } else {
          ctx.request.body = body;
        }
      }
      return next();
    })
  };
}

/**
 * Check if multipart handling is enabled and that this is a multipart request
 *
 * @param  {Object} ctx
 * @param  {Object} opts
 * @return {Boolean} true if request is multipart and being treated as so
 * @api private
 */
function isMultiPart(ctx, opts) {
  return opts.multipart && ctx.is('multipart');
}

/**
 * Donable formidable
 *
 * @param  {Stream} ctx
 * @param  {Object} opts
 * @return {Promise}
 * @api private
 */
function formy(ctx, opts) {
  return new Promise(function (resolve, reject) {
    var fields = {};
    var files = {};
    var form = new forms.IncomingForm(opts);
    form.on('end', function () {
      return resolve({
        fields: fields,
        files: files
      });
    }).on('error', function (err) {
      return reject(err);
    }).on('field', function (field, value) {
      if (fields[field]) {
        if (Array.isArray(fields[field])) {
          fields[field].push(value);
        } else {
          fields[field] = [fields[field], value];
        }
      } else {
        fields[field] = value;
      }
    }).on('file', function (field, file) {
      if (files[field]) {
        if (Array.isArray(files[field])) {
          files[field].push(file);
        } else {
          files[field] = [files[field], file];
        }
      } else {
        files[field] = file;
      }
    });
    if (opts.onFileBegin) {
      form.on('fileBegin', opts.onFileBegin);
    }
    form.parse(ctx.req);
  });
}

}, function(modId) {var map = {"./unparsed.js":1650257737456}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737456, function(require, module, exports) {
/**
 * koa-body - index.js
 * Copyright(c) 2014
 * MIT Licensed
 *
 * @author  Daryl Lau (@dlau)
 * @author  Charlike Mike Reagent (@tunnckoCore)
 * @author  Zev Isert (@zevisert)
 * @api private
 */



module.exports = Symbol.for('unparsedBody');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737455);
})()
//miniprogram-npm-outsideDeps=["co-body","formidable"]
//# sourceMappingURL=index.js.map