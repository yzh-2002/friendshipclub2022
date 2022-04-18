module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735001, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapFunction;

var _helperFunctionName = require("@babel/helper-function-name");

var _template = require("@babel/template");

var _t = require("@babel/types");

const {
  blockStatement,
  callExpression,
  functionExpression,
  isAssignmentPattern,
  isRestElement,
  returnStatement
} = _t;

const buildAnonymousExpressionWrapper = _template.default.expression(`
  (function () {
    var REF = FUNCTION;
    return function NAME(PARAMS) {
      return REF.apply(this, arguments);
    };
  })()
`);

const buildNamedExpressionWrapper = _template.default.expression(`
  (function () {
    var REF = FUNCTION;
    function NAME(PARAMS) {
      return REF.apply(this, arguments);
    }
    return NAME;
  })()
`);

const buildDeclarationWrapper = (0, _template.default)(`
  function NAME(PARAMS) { return REF.apply(this, arguments); }
  function REF() {
    REF = FUNCTION;
    return REF.apply(this, arguments);
  }
`);

function classOrObjectMethod(path, callId) {
  const node = path.node;
  const body = node.body;
  const container = functionExpression(null, [], blockStatement(body.body), true);
  body.body = [returnStatement(callExpression(callExpression(callId, [container]), []))];
  node.async = false;
  node.generator = false;
  path.get("body.body.0.argument.callee.arguments.0").unwrapFunctionEnvironment();
}

function plainFunction(path, callId, noNewArrows, ignoreFunctionLength) {
  const node = path.node;
  const isDeclaration = path.isFunctionDeclaration();
  const functionId = node.id;
  const wrapper = isDeclaration ? buildDeclarationWrapper : functionId ? buildNamedExpressionWrapper : buildAnonymousExpressionWrapper;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToExpression({
      noNewArrows
    });
  }

  node.id = null;

  if (isDeclaration) {
    node.type = "FunctionExpression";
  }

  const built = callExpression(callId, [node]);
  const params = [];

  for (const param of node.params) {
    if (isAssignmentPattern(param) || isRestElement(param)) {
      break;
    }

    params.push(path.scope.generateUidIdentifier("x"));
  }

  const container = wrapper({
    NAME: functionId || null,
    REF: path.scope.generateUidIdentifier(functionId ? functionId.name : "ref"),
    FUNCTION: built,
    PARAMS: params
  });

  if (isDeclaration) {
    path.replaceWith(container[0]);
    path.insertAfter(container[1]);
  } else {
    const retFunction = container.callee.body.body[1].argument;

    if (!functionId) {
      (0, _helperFunctionName.default)({
        node: retFunction,
        parent: path.parent,
        scope: path.scope
      });
    }

    if (!retFunction || retFunction.id || !ignoreFunctionLength && params.length) {
      path.replaceWith(container);
    } else {
      path.replaceWith(built);
    }
  }
}

function wrapFunction(path, callId, noNewArrows = true, ignoreFunctionLength = false) {
  if (path.isMethod()) {
    classOrObjectMethod(path, callId);
  } else {
    plainFunction(path, callId, noNewArrows, ignoreFunctionLength);
  }
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735001);
})()
//miniprogram-npm-outsideDeps=["@babel/helper-function-name","@babel/template","@babel/types"]
//# sourceMappingURL=index.js.map