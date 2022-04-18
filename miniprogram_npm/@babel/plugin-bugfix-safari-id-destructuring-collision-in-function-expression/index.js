module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735007, function(require, module, exports) {


Object.defineProperty(exports, '__esModule', { value: true });

var helperPluginUtils = require('@babel/helper-plugin-utils');

function shouldTransform(path) {
  const {
    node
  } = path;
  const functionId = node.id;
  if (!functionId) return false;
  const name = functionId.name;
  const paramNameBinding = path.scope.getOwnBinding(name);

  if (paramNameBinding === undefined) {
    return false;
  }

  if (paramNameBinding.kind !== "param") {
    return false;
  }

  if (paramNameBinding.identifier === paramNameBinding.path.node) {
    return false;
  }

  return name;
}

var index = helperPluginUtils.declare(api => {
  api.assertVersion("^7.16.0");
  return {
    name: "plugin-bugfix-safari-id-destructuring-collision-in-function-expression",
    visitor: {
      FunctionExpression(path) {
        const name = shouldTransform(path);

        if (name) {
          const {
            scope
          } = path;
          const newParamName = scope.generateUid(name);
          scope.rename(name, newParamName);
        }
      }

    }
  };
});

exports.default = index;
//# sourceMappingURL=index.js.map

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735007);
})()
//miniprogram-npm-outsideDeps=["@babel/helper-plugin-utils"]
//# sourceMappingURL=index.js.map