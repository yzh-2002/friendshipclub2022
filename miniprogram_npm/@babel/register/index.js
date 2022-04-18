module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735092, function(require, module, exports) {
{
  exports = module.exports = function (...args) {
    return register(...args);
  };

  exports.__esModule = true;

  const node = require("./nodeWrapper");

  const register = node.default;
  Object.assign(exports, node);
}
}, function(modId) {var map = {"./nodeWrapper":1650257735093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735093, function(require, module, exports) {
const Module = require("module");

const globalModuleCache = Module._cache;
const internalModuleCache = Object.create(null);
Module._cache = internalModuleCache;

const node = require("./node");

Module._cache = globalModuleCache;

const smsPath = require.resolve("source-map-support");

globalModuleCache[smsPath] = internalModuleCache[smsPath];
const register = node.default;
register();
module.exports = node;
}, function(modId) { var map = {"./node":1650257735094}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735094, function(require, module, exports) {


const hook = require("./hook");

const {
  LocalClient
} = require("./worker-client");

const client = new LocalClient();

function register(opts = {}) {
  return hook.register(client, Object.assign({}, opts));
}

module.exports = Object.assign(register, {
  revert: hook.revert,
  default: register
});
}, function(modId) { var map = {"./hook":1650257735095,"./worker-client":1650257735096}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735095, function(require, module, exports) {


const {
  addHook
} = require("pirates");

const sourceMapSupport = require("source-map-support");

let piratesRevert;
const maps = Object.create(null);

function installSourceMapSupport() {
  installSourceMapSupport = () => {};

  sourceMapSupport.install({
    handleUncaughtExceptions: false,
    environment: "node",

    retrieveSourceMap(filename) {
      const map = maps == null ? void 0 : maps[filename];

      if (map) {
        return {
          url: null,
          map: map
        };
      } else {
        return null;
      }
    }

  });
}

{
  const Module = require("module");

  let compiling = false;
  const internalModuleCache = Module._cache;

  var compileBabel7 = function compileBabel7(client, code, filename) {
    if (!client.isLocalClient) return compile(client, code, filename);
    if (compiling) return code;
    const globalModuleCache = Module._cache;

    try {
      compiling = true;
      Module._cache = internalModuleCache;
      return compile(client, code, filename);
    } finally {
      compiling = false;
      Module._cache = globalModuleCache;
    }
  };
}

function compile(client, inputCode, filename) {
  const result = client.transform(inputCode, filename);
  if (result === null) return inputCode;
  const {
    code,
    map
  } = result;

  if (map) {
    maps[filename] = map;
    installSourceMapSupport();
  }

  return code;
}

exports.register = function register(client, opts = {}) {
  var _opts$extensions;

  if (piratesRevert) piratesRevert();
  piratesRevert = addHook(compileBabel7.bind(null, client), {
    exts: (_opts$extensions = opts.extensions) != null ? _opts$extensions : client.getDefaultExtensions(),
    ignoreNodeModules: false
  });
  client.setOptions(opts);
};

exports.revert = function revert() {
  if (piratesRevert) piratesRevert();
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735096, function(require, module, exports) {
var _class, _worker, _signal, _temp, _markInRegisterWorker, _worker_threads;

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

const path = require("path");

const ACTIONS = {
  GET_DEFAULT_EXTENSIONS: "GET_DEFAULT_EXTENSIONS",
  SET_OPTIONS: "SET_OPTIONS",
  TRANSFORM: "TRANSFORM",
  TRANSFORM_SYNC: "TRANSFORM_SYNC"
};

var _send = new WeakMap();

var _eCache = new WeakMap();

class Client {
  constructor(send) {
    _classPrivateFieldInitSpec(this, _send, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _eCache, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _send, send);
  }

  getDefaultExtensions() {
    var _classPrivateFieldGet2;

    return (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _eCache)) != null ? _classPrivateFieldGet2 : _classPrivateFieldSet(this, _eCache, _classPrivateFieldGet(this, _send).call(this, ACTIONS.GET_DEFAULT_EXTENSIONS, undefined));
  }

  setOptions(options) {
    return _classPrivateFieldGet(this, _send).call(this, ACTIONS.SET_OPTIONS, options);
  }

  transform(code, filename) {
    return _classPrivateFieldGet(this, _send).call(this, ACTIONS.TRANSFORM, {
      code,
      filename
    });
  }

}

exports.WorkerClient = (_temp = (_worker = new WeakMap(), _signal = new WeakMap(), _class = class WorkerClient extends Client {
  constructor() {
    super((action, payload) => {
      _classPrivateFieldGet(this, _signal)[0] = 0;
      const subChannel = new (_classStaticPrivateFieldSpecGet(WorkerClient, _class, _worker_threads).MessageChannel)();

      _classPrivateFieldGet(this, _worker).postMessage({
        signal: _classPrivateFieldGet(this, _signal),
        port: subChannel.port1,
        action,
        payload
      }, [subChannel.port1]);

      Atomics.wait(_classPrivateFieldGet(this, _signal), 0, 0);

      const {
        message
      } = _classStaticPrivateFieldSpecGet(WorkerClient, _class, _worker_threads).receiveMessageOnPort(subChannel.port2);

      if (message.error) throw Object.assign(message.error, message.errorData);else return message.result;
    });

    _classPrivateFieldInitSpec(this, _worker, {
      writable: true,
      value: new (_classStaticPrivateFieldSpecGet(WorkerClient, _class, _worker_threads).Worker)(path.resolve(__dirname, "./worker/index.js"), {
        env: _classStaticPrivateFieldSpecGet(WorkerClient, _class, _markInRegisterWorker).call(WorkerClient, process.env)
      })
    });

    _classPrivateFieldInitSpec(this, _signal, {
      writable: true,
      value: new Int32Array(new SharedArrayBuffer(4))
    });

    _classPrivateFieldGet(this, _worker).unref();
  }

}), _markInRegisterWorker = {
  get: _get_markInRegisterWorker,
  set: void 0
}, _worker_threads = {
  get: _get_worker_threads,
  set: void 0
}, _temp);

function _get_worker_threads() {
  return require("worker_threads");
}

function _get_markInRegisterWorker() {
  return require("./is-in-register-worker").markInRegisterWorker;
}

{
  var _class2, _temp2, _handleMessage;

  exports.LocalClient = (_temp2 = _class2 = class LocalClient extends Client {
    constructor() {
      var _classStaticPrivateFi;

      (_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(LocalClient, _class2, _handleMessage)) != null ? _classStaticPrivateFi : _classStaticPrivateFieldSpecSet(LocalClient, _class2, _handleMessage, require("./worker/handle-message"));
      super((action, payload) => {
        return _classStaticPrivateFieldSpecGet(LocalClient, _class2, _handleMessage).call(LocalClient, action === ACTIONS.TRANSFORM ? ACTIONS.TRANSFORM_SYNC : action, payload);
      });
      this.isLocalClient = true;
    }

  }, _handleMessage = {
    writable: true,
    value: void 0
  }, _temp2);
}
}, function(modId) { var map = {"./is-in-register-worker":1650257735097,"./worker/handle-message":1650257735098}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735097, function(require, module, exports) {


const envVarName = "___INTERNAL___IS_INSIDE_BABEL_REGISTER_WORKER___";
const envVarValue = "yes_I_am";

exports.markInRegisterWorker = env => Object.assign({}, env, {
  [envVarName]: envVarValue
});

exports.isInRegisterWorker = process.env[envVarName] === envVarValue;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735098, function(require, module, exports) {
const babel = require("./babel-core");

const {
  setOptions,
  transform,
  transformSync
} = require("./transform");

module.exports = function handleMessage(action, payload) {
  switch (action) {
    case "GET_DEFAULT_EXTENSIONS":
      return babel.DEFAULT_EXTENSIONS;

    case "SET_OPTIONS":
      setOptions(payload);
      return;

    case "TRANSFORM":
      return transform(payload.code, payload.filename);

    case "TRANSFORM_SYNC":
      {
        return transformSync(payload.code, payload.filename);
      }
  }

  throw new Error(`Unknown internal parser worker action: ${action}`);
};
}, function(modId) { var map = {"./babel-core":1650257735099,"./transform":1650257735100}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735099, function(require, module, exports) {
function initialize(babel) {
  exports.init = null;
  exports.version = babel.version;
  exports.DEFAULT_EXTENSIONS = babel.DEFAULT_EXTENSIONS;
  exports.loadOptionsAsync = babel.loadOptionsAsync;
  exports.transformAsync = babel.transformAsync;
  exports.getEnv = babel.getEnv;
  {
    exports.OptionManager = babel.OptionManager;
    exports.transformSync = babel.transformSync;
  }
}

{
  initialize(require("@babel/core"));
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735100, function(require, module, exports) {


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const cloneDeep = require("clone-deep");

const path = require("path");

const fs = require("fs");

const babel = require("./babel-core");

const registerCache = require("../cache");

const nmRE = escapeRegExp(path.sep + "node_modules" + path.sep);

function escapeRegExp(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

let cache;
let transformOpts;

exports.setOptions = function (opts) {
  if (opts.cache === false && cache) {
    registerCache.clear();
    cache = null;
  } else if (opts.cache !== false && !cache) {
    registerCache.load();
    cache = registerCache.get();
  }

  delete opts.cache;
  delete opts.extensions;
  transformOpts = Object.assign({}, opts, {
    caller: Object.assign({
      name: "@babel/register"
    }, opts.caller || {})
  });
  let {
    cwd = "."
  } = transformOpts;
  cwd = transformOpts.cwd = path.resolve(cwd);

  if (transformOpts.ignore === undefined && transformOpts.only === undefined) {
    const cwdRE = escapeRegExp(cwd);
    transformOpts.only = [new RegExp("^" + cwdRE, "i")];
    transformOpts.ignore = [new RegExp(`^${cwdRE}(?:${path.sep}.*)?${nmRE}`, "i")];
  }
};

exports.transform = _asyncToGenerator(function* (input, filename) {
  const opts = yield babel.loadOptionsAsync(Object.assign({
    sourceRoot: path.dirname(filename) + path.sep
  }, cloneDeep(transformOpts), {
    filename
  }));
  if (opts === null) return null;
  const {
    cached,
    store
  } = cacheLookup(opts, filename);
  if (cached) return cached;
  const {
    code,
    map
  } = yield babel.transformAsync(input, Object.assign({}, opts, {
    sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
    ast: false
  }));
  return store({
    code,
    map
  });
});
{
  exports.transformSync = function (input, filename) {
    const opts = new babel.OptionManager().init(Object.assign({
      sourceRoot: path.dirname(filename) + path.sep
    }, cloneDeep(transformOpts), {
      filename
    }));
    if (opts === null) return null;
    const {
      cached,
      store
    } = cacheLookup(opts, filename);
    if (cached) return cached;
    const {
      code,
      map
    } = babel.transformSync(input, Object.assign({}, opts, {
      sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
      ast: false
    }));
    return store({
      code,
      map
    });
  };
}

const id = value => value;

function cacheLookup(opts, filename) {
  if (!cache) return {
    cached: null,
    store: id
  };
  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;
  const env = babel.getEnv();
  if (env) cacheKey += `:${env}`;
  const cached = cache[cacheKey];
  const fileMtime = +fs.statSync(filename).mtime;

  if (cached && cached.mtime === fileMtime) {
    return {
      cached: cached.value,
      store: id
    };
  }

  return {
    cached: null,

    store(value) {
      cache[cacheKey] = {
        value,
        mtime: fileMtime
      };
      registerCache.setDirty();
      return value;
    }

  };
}
}, function(modId) { var map = {"./babel-core":1650257735099,"../cache":1650257735101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735101, function(require, module, exports) {
module.exports = require("./worker/cache");
}, function(modId) { var map = {"./worker/cache":1650257735102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735102, function(require, module, exports) {


const path = require("path");

const fs = require("fs");

const os = require("os");

const babel = require("@babel/core");

const findCacheDir = require("find-cache-dir");

const DEFAULT_CACHE_DIR = findCacheDir({
  name: "@babel/register"
}) || os.homedir() || os.tmpdir();
const DEFAULT_FILENAME = path.join(DEFAULT_CACHE_DIR, `.babel.${babel.version}.${babel.getEnv()}.json`);
const FILENAME = process.env.BABEL_CACHE_PATH || DEFAULT_FILENAME;
let data = {};
let cacheDirty = false;
let cacheDisabled = false;

function isCacheDisabled() {
  var _process$env$BABEL_DI;

  return (_process$env$BABEL_DI = process.env.BABEL_DISABLE_CACHE) != null ? _process$env$BABEL_DI : cacheDisabled;
}

exports.save = save;

function save() {
  if (isCacheDisabled() || !cacheDirty) return;
  cacheDirty = false;
  let serialised = "{}";

  try {
    serialised = JSON.stringify(data);
  } catch (err) {
    if (err.message === "Invalid string length") {
      err.message = "Cache too large so it's been cleared.";
      console.error(err.stack);
    } else {
      throw err;
    }
  }

  try {
    (((v, w) => (v = v.split("."), w = w.split("."), +v[0] > +w[0] || v[0] == w[0] && +v[1] >= +w[1]))(process.versions.node, "10.12") ? fs.mkdirSync : require("make-dir").sync)(path.dirname(FILENAME), {
      recursive: true
    });
    fs.writeFileSync(FILENAME, serialised);
  } catch (e) {
    switch (e.code) {
      case "ENOENT":
      case "EACCES":
      case "EPERM":
        console.warn(`Babel could not write cache to file: ${FILENAME}
due to a permission issue. Cache is disabled.`);
        cacheDisabled = true;
        break;

      case "EROFS":
        console.warn(`Babel could not write cache to file: ${FILENAME}
because it resides in a readonly filesystem. Cache is disabled.`);
        cacheDisabled = true;
        break;

      default:
        throw e;
    }
  }
}

exports.load = function load() {
  if (isCacheDisabled()) {
    data = {};
    return;
  }

  process.on("exit", save);
  process.nextTick(save);
  let cacheContent;

  try {
    cacheContent = fs.readFileSync(FILENAME);
  } catch (e) {
    switch (e.code) {
      case "EACCES":
        console.warn(`Babel could not read cache file: ${FILENAME}
due to a permission issue. Cache is disabled.`);
        cacheDisabled = true;

      default:
        return;
    }
  }

  try {
    data = JSON.parse(cacheContent);
  } catch (_unused) {}
};

exports.get = function get() {
  return data;
};

exports.setDirty = function setDirty() {
  cacheDirty = true;
};

exports.clear = function clear() {
  data = {};
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735092);
})()
//miniprogram-npm-outsideDeps=["module","pirates","source-map-support","path","worker_threads","@babel/core","clone-deep","fs","os","find-cache-dir","make-dir"]
//# sourceMappingURL=index.js.map