module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735008, function(require, module, exports) {


Object.defineProperty(exports, '__esModule', { value: true });

var helperPluginUtils = require('@babel/helper-plugin-utils');
var pluginProposalOptionalChaining = require('@babel/plugin-proposal-optional-chaining');
var helperSkipTransparentExpressionWrappers = require('@babel/helper-skip-transparent-expression-wrappers');
var core = require('@babel/core');

function matchAffectedArguments(argumentNodes) {
  const spreadIndex = argumentNodes.findIndex(node => core.types.isSpreadElement(node));
  return spreadIndex >= 0 && spreadIndex !== argumentNodes.length - 1;
}

function shouldTransform(path) {
  let optionalPath = path;
  const chains = [];

  while (optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression()) {
    const {
      node
    } = optionalPath;
    chains.push(node);

    if (optionalPath.isOptionalMemberExpression()) {
      optionalPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(optionalPath.get("object"));
    } else if (optionalPath.isOptionalCallExpression()) {
      optionalPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(optionalPath.get("callee"));
    }
  }

  for (let i = 0; i < chains.length; i++) {
    const node = chains[i];

    if (core.types.isOptionalCallExpression(node) && matchAffectedArguments(node.arguments)) {
      if (node.optional) {
        return true;
      }

      const callee = chains[i + 1];

      if (core.types.isOptionalMemberExpression(callee, {
        optional: true
      })) {
        return true;
      }
    }
  }

  return false;
}

var index = helperPluginUtils.declare(api => {
  api.assertVersion(7);
  const noDocumentAll = api.assumption("noDocumentAll");
  const pureGetters = api.assumption("pureGetters");
  return {
    name: "bugfix-v8-spread-parameters-in-optional-chaining",
    visitor: {
      "OptionalCallExpression|OptionalMemberExpression"(path) {
        if (shouldTransform(path)) {
          pluginProposalOptionalChaining.transform(path, {
            noDocumentAll,
            pureGetters
          });
        }
      }

    }
  };
});

exports.default = index;
//# sourceMappingURL=index.js.map

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735008);
})()
//miniprogram-npm-outsideDeps=["@babel/helper-plugin-utils","@babel/plugin-proposal-optional-chaining","@babel/helper-skip-transparent-expression-wrappers","@babel/core"]
//# sourceMappingURL=index.js.map