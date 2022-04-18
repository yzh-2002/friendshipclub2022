module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257734975, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _t = require("@babel/types");

const {
  assignmentExpression,
  cloneNode,
  isIdentifier,
  isLiteral,
  isMemberExpression,
  isPrivateName,
  isPureish,
  isSuper,
  memberExpression,
  toComputedKey
} = _t;

function getObjRef(node, nodes, scope) {
  let ref;

  if (isIdentifier(node)) {
    if (scope.hasBinding(node.name)) {
      return node;
    } else {
      ref = node;
    }
  } else if (isMemberExpression(node)) {
    ref = node.object;

    if (isSuper(ref) || isIdentifier(ref) && scope.hasBinding(ref.name)) {
      return ref;
    }
  } else {
    throw new Error(`We can't explode this node type ${node["type"]}`);
  }

  const temp = scope.generateUidIdentifierBasedOnNode(ref);
  scope.push({
    id: temp
  });
  nodes.push(assignmentExpression("=", cloneNode(temp), cloneNode(ref)));
  return temp;
}

function getPropRef(node, nodes, scope) {
  const prop = node.property;

  if (isPrivateName(prop)) {
    throw new Error("We can't generate property ref for private name, please install `@babel/plugin-proposal-class-properties`");
  }

  const key = toComputedKey(node, prop);
  if (isLiteral(key) && isPureish(key)) return key;
  const temp = scope.generateUidIdentifierBasedOnNode(prop);
  scope.push({
    id: temp
  });
  nodes.push(assignmentExpression("=", cloneNode(temp), cloneNode(prop)));
  return temp;
}

function _default(node, nodes, file, scope, allowedSingleIdent) {
  let obj;

  if (isIdentifier(node) && allowedSingleIdent) {
    obj = node;
  } else {
    obj = getObjRef(node, nodes, scope);
  }

  let ref, uid;

  if (isIdentifier(node)) {
    ref = cloneNode(node);
    uid = obj;
  } else {
    const prop = getPropRef(node, nodes, scope);
    const computed = node.computed || isLiteral(prop);
    uid = memberExpression(cloneNode(obj), cloneNode(prop), computed);
    ref = memberExpression(cloneNode(obj), cloneNode(prop), computed);
  }

  return {
    uid: uid,
    ref: ref
  };
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257734975);
})()
//miniprogram-npm-outsideDeps=["@babel/types"]
//# sourceMappingURL=index.js.map