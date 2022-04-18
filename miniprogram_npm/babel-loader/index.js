module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735555, function(require, module, exports) {


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

let babel;

try {
  babel = require("@babel/core");
} catch (err) {
  if (err.code === "MODULE_NOT_FOUND") {
    err.message += "\n babel-loader@8 requires Babel 7.x (the package '@babel/core'). " + "If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.";
  }

  throw err;
} // Since we've got the reverse bridge package at @babel/core@6.x, give
// people useful feedback if they try to use it alongside babel-loader.


if (/^6\./.test(babel.version)) {
  throw new Error("\n babel-loader@8 will not work with the '@babel/core@6' bridge package. " + "If you want to use Babel 6.x, install 'babel-loader@7'.");
}

const {
  version
} = require("../package.json");

const cache = require("./cache");

const transform = require("./transform");

const injectCaller = require("./injectCaller");

const schema = require("./schema");

const {
  isAbsolute
} = require("path");

const loaderUtils = require("loader-utils");

const validateOptions = require("schema-utils");

function subscribe(subscriber, metadata, context) {
  if (context[subscriber]) {
    context[subscriber](metadata);
  }
}

module.exports = makeLoader();
module.exports.custom = makeLoader;

function makeLoader(callback) {
  const overrides = callback ? callback(babel) : undefined;
  return function (source, inputSourceMap) {
    // Make the loader async
    const callback = this.async();
    loader.call(this, source, inputSourceMap, overrides).then(args => callback(null, ...args), err => callback(err));
  };
}

function loader(_x, _x2, _x3) {
  return _loader.apply(this, arguments);
}

function _loader() {
  _loader = _asyncToGenerator(function* (source, inputSourceMap, overrides) {
    const filename = this.resourcePath;
    let loaderOptions = loaderUtils.getOptions(this);
    validateOptions(schema, loaderOptions, {
      name: "Babel loader"
    });

    if (loaderOptions.customize != null) {
      if (typeof loaderOptions.customize !== "string") {
        throw new Error("Customized loaders must be implemented as standalone modules.");
      }

      if (!isAbsolute(loaderOptions.customize)) {
        throw new Error("Customized loaders must be passed as absolute paths, since " + "babel-loader has no way to know what they would be relative to.");
      }

      if (overrides) {
        throw new Error("babel-loader's 'customize' option is not available when already " + "using a customized babel-loader wrapper.");
      }

      let override = require(loaderOptions.customize);

      if (override.__esModule) override = override.default;

      if (typeof override !== "function") {
        throw new Error("Custom overrides must be functions.");
      }

      overrides = override(babel);
    }

    let customOptions;

    if (overrides && overrides.customOptions) {
      const result = yield overrides.customOptions.call(this, loaderOptions, {
        source,
        map: inputSourceMap
      });
      customOptions = result.custom;
      loaderOptions = result.loader;
    } // Deprecation handling


    if ("forceEnv" in loaderOptions) {
      console.warn("The option `forceEnv` has been removed in favor of `envName` in Babel 7.");
    }

    if (typeof loaderOptions.babelrc === "string") {
      console.warn("The option `babelrc` should not be set to a string anymore in the babel-loader config. " + "Please update your configuration and set `babelrc` to true or false.\n" + "If you want to specify a specific babel config file to inherit config from " + "please use the `extends` option.\nFor more information about this options see " + "https://babeljs.io/docs/core-packages/#options");
    } // Standardize on 'sourceMaps' as the key passed through to Webpack, so that
    // users may safely use either one alongside our default use of
    // 'this.sourceMap' below without getting error about conflicting aliases.


    if (Object.prototype.hasOwnProperty.call(loaderOptions, "sourceMap") && !Object.prototype.hasOwnProperty.call(loaderOptions, "sourceMaps")) {
      loaderOptions = Object.assign({}, loaderOptions, {
        sourceMaps: loaderOptions.sourceMap
      });
      delete loaderOptions.sourceMap;
    }

    const programmaticOptions = Object.assign({}, loaderOptions, {
      filename,
      inputSourceMap: inputSourceMap || undefined,
      // Set the default sourcemap behavior based on Webpack's mapping flag,
      // but allow users to override if they want.
      sourceMaps: loaderOptions.sourceMaps === undefined ? this.sourceMap : loaderOptions.sourceMaps,
      // Ensure that Webpack will get a full absolute path in the sourcemap
      // so that it can properly map the module back to its internal cached
      // modules.
      sourceFileName: filename
    }); // Remove loader related options

    delete programmaticOptions.customize;
    delete programmaticOptions.cacheDirectory;
    delete programmaticOptions.cacheIdentifier;
    delete programmaticOptions.cacheCompression;
    delete programmaticOptions.metadataSubscribers;

    if (!babel.loadPartialConfig) {
      throw new Error(`babel-loader ^8.0.0-beta.3 requires @babel/core@7.0.0-beta.41, but ` + `you appear to be using "${babel.version}". Either update your ` + `@babel/core version, or pin you babel-loader version to 8.0.0-beta.2`);
    } // babel.loadPartialConfigAsync is available in v7.8.0+


    const {
      loadPartialConfigAsync = babel.loadPartialConfig
    } = babel;
    const config = yield loadPartialConfigAsync(injectCaller(programmaticOptions, this.target));

    if (config) {
      let options = config.options;

      if (overrides && overrides.config) {
        options = yield overrides.config.call(this, config, {
          source,
          map: inputSourceMap,
          customOptions
        });
      }

      if (options.sourceMaps === "inline") {
        // Babel has this weird behavior where if you set "inline", we
        // inline the sourcemap, and set 'result.map = null'. This results
        // in bad behavior from Babel since the maps get put into the code,
        // which Webpack does not expect, and because the map we return to
        // Webpack is null, which is also bad. To avoid that, we override the
        // behavior here so "inline" just behaves like 'true'.
        options.sourceMaps = true;
      }

      const {
        cacheDirectory = null,
        cacheIdentifier = JSON.stringify({
          options,
          "@babel/core": transform.version,
          "@babel/loader": version
        }),
        cacheCompression = true,
        metadataSubscribers = []
      } = loaderOptions;
      let result;

      if (cacheDirectory) {
        result = yield cache({
          source,
          options,
          transform,
          cacheDirectory,
          cacheIdentifier,
          cacheCompression
        });
      } else {
        result = yield transform(source, options);
      } // Availabe since Babel 7.12
      // https://github.com/babel/babel/pull/11907


      if (config.files) {
        config.files.forEach(configFile => this.addDependency(configFile));
      } else {
        // .babelrc.json
        if (typeof config.babelrc === "string") {
          this.addDependency(config.babelrc);
        } // babel.config.js


        if (config.config) {
          this.addDependency(config.config);
        }
      }

      if (result) {
        if (overrides && overrides.result) {
          result = yield overrides.result.call(this, result, {
            source,
            map: inputSourceMap,
            customOptions,
            config,
            options
          });
        }

        const {
          code,
          map,
          metadata
        } = result;
        metadataSubscribers.forEach(subscriber => {
          subscribe(subscriber, metadata, this);
        });
        return [code, map];
      }
    } // If the file was ignored, pass through the original content.


    return [source, inputSourceMap];
  });
  return _loader.apply(this, arguments);
}
}, function(modId) {var map = {"../package.json":1650257735556,"./cache":1650257735557,"./transform":1650257735558,"./injectCaller":1650257735560}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735556, function(require, module, exports) {
module.exports = {
  "_args": [
    [
      "babel-loader@8.2.4",
      "C:\\Users\\87002\\Desktop\\friendshipclub2022"
    ]
  ],
  "_from": "babel-loader@8.2.4",
  "_id": "babel-loader@8.2.4",
  "_inBundle": false,
  "_integrity": "sha512-8dytA3gcvPPPv4Grjhnt8b5IIiTcq/zeXOPk4iTYI0SVXcsmuGg7JtBRDp8S9X+gJfhQ8ektjXZlDu1Bb33U8A==",
  "_location": "/babel-loader",
  "_phantomChildren": {
    "@types/json-schema": "7.0.11",
    "ajv": "6.12.6",
    "ajv-keywords": "3.5.2",
    "big.js": "5.2.2",
    "commondir": "1.0.1",
    "emojis-list": "3.0.0",
    "p-limit": "2.3.0"
  },
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "babel-loader@8.2.4",
    "name": "babel-loader",
    "escapedName": "babel-loader",
    "rawSpec": "8.2.4",
    "saveSpec": null,
    "fetchSpec": "8.2.4"
  },
  "_requiredBy": [
    "/@hap-toolkit/packager",
    "/@vue/cli-plugin-babel"
  ],
  "_resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-8.2.4.tgz",
  "_spec": "8.2.4",
  "_where": "C:\\Users\\87002\\Desktop\\friendshipclub2022",
  "author": {
    "name": "Luis Couto",
    "email": "hello@luiscouto.pt"
  },
  "ava": {
    "files": [
      "test/**/*.test.js",
      "!test/fixtures/**/*",
      "!test/helpers/**/*"
    ],
    "babel": {
      "compileAsTests": [
        "test/helpers/**/*"
      ]
    }
  },
  "bugs": {
    "url": "https://github.com/babel/babel-loader/issues"
  },
  "dependencies": {
    "find-cache-dir": "^3.3.1",
    "loader-utils": "^2.0.0",
    "make-dir": "^3.1.0",
    "schema-utils": "^2.6.5"
  },
  "description": "babel module loader for webpack",
  "devDependencies": {
    "@ava/babel": "^1.0.1",
    "@babel/cli": "^7.12.1",
    "@babel/core": "^7.12.3",
    "@babel/preset-env": "^7.12.1",
    "ava": "^3.13.0",
    "babel-eslint": "^10.0.1",
    "babel-plugin-istanbul": "^6.0.0",
    "babel-plugin-react-intl": "^8.2.15",
    "cross-env": "^7.0.2",
    "eslint": "^7.13.0",
    "eslint-config-babel": "^9.0.0",
    "eslint-config-prettier": "^6.3.0",
    "eslint-plugin-flowtype": "^5.2.0",
    "eslint-plugin-prettier": "^3.0.0",
    "husky": "^4.3.0",
    "lint-staged": "^10.5.1",
    "nyc": "^15.1.0",
    "pnp-webpack-plugin": "^1.6.4",
    "prettier": "^2.1.2",
    "react": "^17.0.1",
    "react-intl": "^5.9.4",
    "react-intl-webpack-plugin": "^0.3.0",
    "rimraf": "^3.0.0",
    "semver": "7.3.2",
    "webpack": "^5.34.0"
  },
  "engines": {
    "node": ">= 8.9"
  },
  "files": [
    "lib"
  ],
  "homepage": "https://github.com/babel/babel-loader",
  "keywords": [
    "webpack",
    "loader",
    "babel",
    "es6",
    "transpiler",
    "module"
  ],
  "license": "MIT",
  "lint-staged": {
    "scripts/*.js": [
      "prettier --trailing-comma es5 --write",
      "git add"
    ],
    "src/**/*.js": [
      "prettier --trailing-comma all --write",
      "git add"
    ],
    "test/**/*.test.js": [
      "prettier --trailing-comma all --write",
      "git add"
    ],
    "test/helpers/*.js": [
      "prettier --trailing-comma all --write",
      "git add"
    ],
    "package.json": [
      "node ./scripts/yarn-install.js",
      "git add yarn.lock"
    ]
  },
  "main": "lib/index.js",
  "name": "babel-loader",
  "nyc": {
    "all": true,
    "include": [
      "src/**/*.js"
    ],
    "reporter": [
      "text",
      "json"
    ],
    "sourceMap": false,
    "instrument": false
  },
  "peerDependencies": {
    "@babel/core": "^7.0.0",
    "webpack": ">=2"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/babel/babel-loader.git"
  },
  "scripts": {
    "build": "babel src/ --out-dir lib/ --copy-files",
    "clean": "rimraf lib/",
    "format": "prettier --write --trailing-comma all 'src/**/*.js' 'test/**/*.test.js' 'test/helpers/*.js' && prettier --write --trailing-comma es5 'scripts/*.js'",
    "lint": "eslint src test",
    "precommit": "lint-staged",
    "prepublish": "yarn run clean && yarn run build",
    "preversion": "yarn run test",
    "test": "yarn run lint && cross-env BABEL_ENV=test yarn run build && yarn run test-only",
    "test-only": "nyc ava"
  },
  "version": "8.2.4"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735557, function(require, module, exports) {


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Filesystem Cache
 *
 * Given a file and a transform function, cache the result into files
 * or retrieve the previously cached files if the given file is already known.
 *
 * @see https://github.com/babel/babel-loader/issues/34
 * @see https://github.com/babel/babel-loader/pull/41
 */
const fs = require("fs");

const os = require("os");

const path = require("path");

const zlib = require("zlib");

const crypto = require("crypto");

const findCacheDir = require("find-cache-dir");

const {
  promisify
} = require("util");

const transform = require("./transform"); // Lazily instantiated when needed


let defaultCacheDirectory = null;
let hashType = "md4"; // use md5 hashing if md4 is not available

try {
  crypto.createHash(hashType);
} catch (err) {
  hashType = "md5";
}

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const makeDir = require("make-dir");
/**
 * Read the contents from the compressed file.
 *
 * @async
 * @params {String} filename
 * @params {Boolean} compress
 */


const read = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (filename, compress) {
    const data = yield readFile(filename + (compress ? ".gz" : ""));
    const content = compress ? yield gunzip(data) : data;
    return JSON.parse(content.toString());
  });

  return function read(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Write contents into a compressed file.
 *
 * @async
 * @params {String} filename
 * @params {Boolean} compress
 * @params {String} result
 */


const write = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (filename, compress, result) {
    const content = JSON.stringify(result);
    const data = compress ? yield gzip(content) : content;
    return yield writeFile(filename + (compress ? ".gz" : ""), data);
  });

  return function write(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Build the filename for the cached file
 *
 * @params {String} source  File source code
 * @params {Object} options Options used
 *
 * @return {String}
 */


const filename = function (source, identifier, options) {
  const hash = crypto.createHash(hashType);
  const contents = JSON.stringify({
    source,
    options,
    identifier
  });
  hash.update(contents);
  return hash.digest("hex") + ".json";
};
/**
 * Handle the cache
 *
 * @params {String} directory
 * @params {Object} params
 */


const handleCache = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (directory, params) {
    const {
      source,
      options = {},
      cacheIdentifier,
      cacheDirectory,
      cacheCompression
    } = params;
    const file = path.join(directory, filename(source, cacheIdentifier, options));

    try {
      // No errors mean that the file was previously cached
      // we just need to return it
      return yield read(file, cacheCompression);
    } catch (err) {}

    const fallback = typeof cacheDirectory !== "string" && directory !== os.tmpdir(); // Make sure the directory exists.

    try {
      yield makeDir(directory);
    } catch (err) {
      if (fallback) {
        return handleCache(os.tmpdir(), params);
      }

      throw err;
    } // Otherwise just transform the file
    // return it to the user asap and write it in cache


    const result = yield transform(source, options);

    try {
      yield write(file, cacheCompression, result);
    } catch (err) {
      if (fallback) {
        // Fallback to tmpdir if node_modules folder not writable
        return handleCache(os.tmpdir(), params);
      }

      throw err;
    }

    return result;
  });

  return function handleCache(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Retrieve file from cache, or create a new one for future reads
 *
 * @async
 * @param  {Object}   params
 * @param  {String}   params.cacheDirectory   Directory to store cached files
 * @param  {String}   params.cacheIdentifier  Unique identifier to bust cache
 * @param  {Boolean}  params.cacheCompression Whether compressing cached files
 * @param  {String}   params.source   Original contents of the file to be cached
 * @param  {Object}   params.options  Options to be given to the transform fn
 *
 * @example
 *
 *   const result = await cache({
 *     cacheDirectory: '.tmp/cache',
 *     cacheIdentifier: 'babel-loader-cachefile',
 *     cacheCompression: false,
 *     source: *source code from file*,
 *     options: {
 *       experimental: true,
 *       runtime: true
 *     },
 *   });
 */


module.exports = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (params) {
    let directory;

    if (typeof params.cacheDirectory === "string") {
      directory = params.cacheDirectory;
    } else {
      if (defaultCacheDirectory === null) {
        defaultCacheDirectory = findCacheDir({
          name: "babel-loader"
        }) || os.tmpdir();
      }

      directory = defaultCacheDirectory;
    }

    return yield handleCache(directory, params);
  });

  return function (_x8) {
    return _ref4.apply(this, arguments);
  };
}();
}, function(modId) { var map = {"./transform":1650257735558}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735558, function(require, module, exports) {


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const babel = require("@babel/core");

const {
  promisify
} = require("util");

const LoaderError = require("./Error");

const transform = promisify(babel.transform);

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (source, options) {
    let result;

    try {
      result = yield transform(source, options);
    } catch (err) {
      throw err.message && err.codeFrame ? new LoaderError(err) : err;
    }

    if (!result) return null; // We don't return the full result here because some entries are not
    // really serializable. For a full list of properties see here:
    // https://github.com/babel/babel/blob/main/packages/babel-core/src/transformation/index.js
    // For discussion on this topic see here:
    // https://github.com/babel/babel-loader/pull/629

    const {
      ast,
      code,
      map,
      metadata,
      sourceType
    } = result;

    if (map && (!map.sourcesContent || !map.sourcesContent.length)) {
      map.sourcesContent = [source];
    }

    return {
      ast,
      code,
      map,
      metadata,
      sourceType
    };
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.version = babel.version;
}, function(modId) { var map = {"./Error":1650257735559}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735559, function(require, module, exports) {


const STRIP_FILENAME_RE = /^[^:]+: /;

const format = err => {
  if (err instanceof SyntaxError) {
    err.name = "SyntaxError";
    err.message = err.message.replace(STRIP_FILENAME_RE, "");
    err.hideStack = true;
  } else if (err instanceof TypeError) {
    err.name = null;
    err.message = err.message.replace(STRIP_FILENAME_RE, "");
    err.hideStack = true;
  }

  return err;
};

class LoaderError extends Error {
  constructor(err) {
    super();
    const {
      name,
      message,
      codeFrame,
      hideStack
    } = format(err);
    this.name = "BabelLoaderError";
    this.message = `${name ? `${name}: ` : ""}${message}\n\n${codeFrame}\n`;
    this.hideStack = hideStack;
    Error.captureStackTrace(this, this.constructor);
  }

}

module.exports = LoaderError;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735560, function(require, module, exports) {


const babel = require("@babel/core");

module.exports = function injectCaller(opts, target) {
  if (!supportsCallerOption()) return opts;
  return Object.assign({}, opts, {
    caller: Object.assign({
      name: "babel-loader",
      // Provide plugins with insight into webpack target.
      // https://github.com/babel/babel-loader/issues/787
      target,
      // Webpack >= 2 supports ESM and dynamic import.
      supportsStaticESM: true,
      supportsDynamicImport: true,
      // Webpack 5 supports TLA behind a flag. We enable it by default
      // for Babel, and then webpack will throw an error if the experimental
      // flag isn't enabled.
      supportsTopLevelAwait: true
    }, opts.caller)
  });
}; // TODO: We can remove this eventually, I'm just adding it so that people have
// a little time to migrate to the newer RCs of @babel/core without getting
// hard-to-diagnose errors about unknown 'caller' options.


let supportsCallerOptionFlag = undefined;

function supportsCallerOption() {
  if (supportsCallerOptionFlag === undefined) {
    try {
      // Rather than try to match the Babel version, we just see if it throws
      // when passed a 'caller' flag, and use that to decide if it is supported.
      babel.loadPartialConfig({
        caller: undefined,
        babelrc: false,
        configFile: false
      });
      supportsCallerOptionFlag = true;
    } catch (err) {
      supportsCallerOptionFlag = false;
    }
  }

  return supportsCallerOptionFlag;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735555);
})()
//miniprogram-npm-outsideDeps=["@babel/core","./schema","path","loader-utils","schema-utils","fs","os","zlib","crypto","find-cache-dir","util","make-dir"]
//# sourceMappingURL=index.js.map