module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735360, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeFrameFromAst = codeFrameFromAst;
exports.codeFrameFromSource = codeFrameFromSource;

var _wastPrinter = require("@webassemblyjs/wast-printer");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var SHOW_LINES_AROUND_POINTER = 5;

function repeat(char, nb) {
  return Array(nb).fill(char).join("");
} // TODO(sven): allow arbitrary ast nodes


function codeFrameFromAst(ast, loc) {
  return codeFrameFromSource((0, _wastPrinter.print)(ast), loc);
}

function codeFrameFromSource(source, loc) {
  var start = loc.start,
      end = loc.end;
  var length = 1;

  if (_typeof(end) === "object") {
    length = end.column - start.column + 1;
  }

  return source.split("\n").reduce(function (acc, line, lineNbr) {
    if (Math.abs(start.line - lineNbr) < SHOW_LINES_AROUND_POINTER) {
      acc += line + "\n";
    } // Add a new line with the pointer padded left


    if (lineNbr === start.line - 1) {
      acc += repeat(" ", start.column - 1);
      acc += repeat("^", length);
      acc += "\n";
    }

    return acc;
  }, "");
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735360);
})()
//miniprogram-npm-outsideDeps=["@webassemblyjs/wast-printer"]
//# sourceMappingURL=index.js.map