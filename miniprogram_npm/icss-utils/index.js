module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737355, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "replaceValueSymbols", {
  enumerable: true,
  get: function get() {
    return _replaceValueSymbols.default;
  }
});
Object.defineProperty(exports, "replaceSymbols", {
  enumerable: true,
  get: function get() {
    return _replaceSymbols.default;
  }
});
Object.defineProperty(exports, "extractICSS", {
  enumerable: true,
  get: function get() {
    return _extractICSS.default;
  }
});
Object.defineProperty(exports, "createICSSRules", {
  enumerable: true,
  get: function get() {
    return _createICSSRules.default;
  }
});

var _replaceValueSymbols = _interopRequireDefault(require("./replaceValueSymbols.js"));

var _replaceSymbols = _interopRequireDefault(require("./replaceSymbols.js"));

var _extractICSS = _interopRequireDefault(require("./extractICSS.js"));

var _createICSSRules = _interopRequireDefault(require("./createICSSRules.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
}, function(modId) {var map = {"./replaceValueSymbols.js":1650257737356,"./replaceSymbols.js":1650257737357,"./extractICSS.js":1650257737358,"./createICSSRules.js":1650257737359}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737356, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const matchValueName = /[$]?[\w-]+/g;

const replaceValueSymbols = (value, replacements) => {
  let matches;

  while (matches = matchValueName.exec(value)) {
    const replacement = replacements[matches[0]];

    if (replacement) {
      value = value.slice(0, matches.index) + replacement + value.slice(matchValueName.lastIndex);
      matchValueName.lastIndex -= matches[0].length - replacement.length;
    }
  }

  return value;
};

var _default = replaceValueSymbols;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737357, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _replaceValueSymbols = _interopRequireDefault(require("./replaceValueSymbols.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const replaceSymbols = (css, replacements) => {
  css.walk(node => {
    if (node.type === "decl" && node.value) {
      node.value = (0, _replaceValueSymbols.default)(node.value.toString(), replacements);
    } else if (node.type === "rule" && node.selector) {
      node.selector = (0, _replaceValueSymbols.default)(node.selector.toString(), replacements);
    } else if (node.type === "atrule" && node.params) {
      node.params = (0, _replaceValueSymbols.default)(node.params.toString(), replacements);
    }
  });
};

var _default = replaceSymbols;
exports.default = _default;
}, function(modId) { var map = {"./replaceValueSymbols.js":1650257737356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737358, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const importPattern = /^:import\(("[^"]*"|'[^']*'|[^"']+)\)$/;

const getDeclsObject = rule => {
  const object = {};
  rule.walkDecls(decl => {
    const before = decl.raws.before ? decl.raws.before.trim() : "";
    object[before + decl.prop] = decl.value;
  });
  return object;
};

const extractICSS = (css, removeRules = true) => {
  const icssImports = {};
  const icssExports = {};
  css.each(node => {
    if (node.type === "rule") {
      if (node.selector.slice(0, 7) === ":import") {
        const matches = importPattern.exec(node.selector);

        if (matches) {
          const path = matches[1].replace(/'|"/g, "");
          icssImports[path] = Object.assign(icssImports[path] || {}, getDeclsObject(node));

          if (removeRules) {
            node.remove();
          }
        }
      }

      if (node.selector === ":export") {
        Object.assign(icssExports, getDeclsObject(node));

        if (removeRules) {
          node.remove();
        }
      }
    }
  });
  return {
    icssImports,
    icssExports
  };
};

var _default = extractICSS;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737359, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postcss = _interopRequireDefault(require("postcss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createImports = imports => {
  return Object.keys(imports).map(path => {
    const aliases = imports[path];
    const declarations = Object.keys(aliases).map(key => _postcss.default.decl({
      prop: key,
      value: aliases[key],
      raws: {
        before: "\n  "
      }
    }));
    const hasDeclarations = declarations.length > 0;

    const rule = _postcss.default.rule({
      selector: `:import('${path}')`,
      raws: {
        after: hasDeclarations ? "\n" : ""
      }
    });

    if (hasDeclarations) {
      rule.append(declarations);
    }

    return rule;
  });
};

const createExports = exports => {
  const declarations = Object.keys(exports).map(key => _postcss.default.decl({
    prop: key,
    value: exports[key],
    raws: {
      before: "\n  "
    }
  }));

  if (declarations.length === 0) {
    return [];
  }

  const rule = _postcss.default.rule({
    selector: `:export`,
    raws: {
      after: "\n"
    }
  }).append(declarations);

  return [rule];
};

const createICSSRules = (imports, exports) => [...createImports(imports), ...createExports(exports)];

var _default = createICSSRules;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737355);
})()
//miniprogram-npm-outsideDeps=["postcss"]
//# sourceMappingURL=index.js.map