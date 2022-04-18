module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735377, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edit = edit;
exports.editWithAST = editWithAST;
exports.add = add;
exports.addWithAST = addWithAST;

var _wasmParser = require("@webassemblyjs/wasm-parser");

var _ast = require("@webassemblyjs/ast");

var _clone = require("@webassemblyjs/ast/lib/clone");

var _wasmOpt = require("@webassemblyjs/wasm-opt");

var _helperWasmBytecode = _interopRequireWildcard(require("@webassemblyjs/helper-wasm-bytecode"));

var _apply = require("./apply");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function hashNode(node) {
  return JSON.stringify(node);
}

function preprocess(ab) {
  var optBin = (0, _wasmOpt.shrinkPaddedLEB128)(new Uint8Array(ab));
  return optBin.buffer;
}

function sortBySectionOrder(nodes) {
  var originalOrder = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _node = _step.value;
      originalOrder.set(_node, originalOrder.size);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  nodes.sort(function (a, b) {
    var sectionA = (0, _helperWasmBytecode.getSectionForNode)(a);
    var sectionB = (0, _helperWasmBytecode.getSectionForNode)(b);
    var aId = _helperWasmBytecode.default.sections[sectionA];
    var bId = _helperWasmBytecode.default.sections[sectionB];

    if (typeof aId !== "number" || typeof bId !== "number") {
      throw new Error("Section id not found");
    }

    if (aId === bId) {
      // $FlowIgnore originalOrder is filled for all nodes
      return originalOrder.get(a) - originalOrder.get(b);
    }

    return aId - bId;
  });
}

function edit(ab, visitors) {
  ab = preprocess(ab);
  var ast = (0, _wasmParser.decode)(ab);
  return editWithAST(ast, ab, visitors);
}

function editWithAST(ast, ab, visitors) {
  var operations = [];
  var uint8Buffer = new Uint8Array(ab);
  var nodeBefore;

  function before(type, path) {
    nodeBefore = (0, _clone.cloneNode)(path.node);
  }

  function after(type, path) {
    if (path.node._deleted === true) {
      operations.push({
        kind: "delete",
        node: path.node
      }); // $FlowIgnore
    } else if (hashNode(nodeBefore) !== hashNode(path.node)) {
      operations.push({
        kind: "update",
        oldNode: nodeBefore,
        node: path.node
      });
    }
  }

  (0, _ast.traverse)(ast, visitors, before, after);
  uint8Buffer = (0, _apply.applyOperations)(ast, uint8Buffer, operations);
  return uint8Buffer.buffer;
}

function add(ab, newNodes) {
  ab = preprocess(ab);
  var ast = (0, _wasmParser.decode)(ab);
  return addWithAST(ast, ab, newNodes);
}

function addWithAST(ast, ab, newNodes) {
  // Sort nodes by insertion order
  sortBySectionOrder(newNodes);
  var uint8Buffer = new Uint8Array(ab); // Map node into operations

  var operations = newNodes.map(function (n) {
    return {
      kind: "add",
      node: n
    };
  });
  uint8Buffer = (0, _apply.applyOperations)(ast, uint8Buffer, operations);
  return uint8Buffer.buffer;
}
}, function(modId) {var map = {"./apply":1650257735378}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735378, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyOperations = applyOperations;

var _wasmGen = require("@webassemblyjs/wasm-gen");

var _encoder = require("@webassemblyjs/wasm-gen/lib/encoder");

var _ast = require("@webassemblyjs/ast");

var _helperWasmSection = require("@webassemblyjs/helper-wasm-section");

var _helperBuffer = require("@webassemblyjs/helper-buffer");

var _helperWasmBytecode = require("@webassemblyjs/helper-wasm-bytecode");

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function shiftLocNodeByDelta(node, delta) {
  (0, _ast.assertHasLoc)(node); // $FlowIgnore: assertHasLoc ensures that

  node.loc.start.column += delta; // $FlowIgnore: assertHasLoc ensures that

  node.loc.end.column += delta;
}

function applyUpdate(ast, uint8Buffer, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      oldNode = _ref2[0],
      newNode = _ref2[1];

  var deltaElements = 0;
  (0, _ast.assertHasLoc)(oldNode);
  var sectionName = (0, _helperWasmBytecode.getSectionForNode)(newNode);
  var replacementByteArray = (0, _wasmGen.encodeNode)(newNode);
  /**
   * Replace new node as bytes
   */

  uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, // $FlowIgnore: assertHasLoc ensures that
  oldNode.loc.start.column, // $FlowIgnore: assertHasLoc ensures that
  oldNode.loc.end.column, replacementByteArray);
  /**
   * Update function body size if needed
   */

  if (sectionName === "code") {
    // Find the parent func
    (0, _ast.traverse)(ast, {
      Func: function Func(_ref3) {
        var node = _ref3.node;
        var funcHasThisIntr = node.body.find(function (n) {
          return n === newNode;
        }) !== undefined; // Update func's body size if needed

        if (funcHasThisIntr === true) {
          // These are the old functions locations informations
          (0, _ast.assertHasLoc)(node);
          var oldNodeSize = (0, _wasmGen.encodeNode)(oldNode).length;
          var bodySizeDeltaBytes = replacementByteArray.length - oldNodeSize;

          if (bodySizeDeltaBytes !== 0) {
            var newValue = node.metadata.bodySize + bodySizeDeltaBytes;
            var newByteArray = (0, _encoder.encodeU32)(newValue); // function body size byte
            // FIXME(sven): only handles one byte u32

            var start = node.loc.start.column;
            var end = start + 1;
            uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, start, end, newByteArray);
          }
        }
      }
    });
  }
  /**
   * Update section size
   */


  var deltaBytes = replacementByteArray.length - ( // $FlowIgnore: assertHasLoc ensures that
  oldNode.loc.end.column - oldNode.loc.start.column); // Init location informations

  newNode.loc = {
    start: {
      line: -1,
      column: -1
    },
    end: {
      line: -1,
      column: -1
    }
  }; // Update new node end position
  // $FlowIgnore: assertHasLoc ensures that

  newNode.loc.start.column = oldNode.loc.start.column; // $FlowIgnore: assertHasLoc ensures that

  newNode.loc.end.column = // $FlowIgnore: assertHasLoc ensures that
  oldNode.loc.start.column + replacementByteArray.length;
  return {
    uint8Buffer: uint8Buffer,
    deltaBytes: deltaBytes,
    deltaElements: deltaElements
  };
}

function applyDelete(ast, uint8Buffer, node) {
  var deltaElements = -1; // since we removed an element

  (0, _ast.assertHasLoc)(node);
  var sectionName = (0, _helperWasmBytecode.getSectionForNode)(node);

  if (sectionName === "start") {
    var sectionMetadata = (0, _ast.getSectionMetadata)(ast, "start");
    /**
     * The start section only contains one element,
     * we need to remove the whole section
     */

    uint8Buffer = (0, _helperWasmSection.removeSections)(ast, uint8Buffer, "start");

    var _deltaBytes = -(sectionMetadata.size.value + 1);
    /* section id */


    return {
      uint8Buffer: uint8Buffer,
      deltaBytes: _deltaBytes,
      deltaElements: deltaElements
    };
  } // replacement is nothing


  var replacement = [];
  uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, // $FlowIgnore: assertHasLoc ensures that
  node.loc.start.column, // $FlowIgnore: assertHasLoc ensures that
  node.loc.end.column, replacement);
  /**
   * Update section
   */
  // $FlowIgnore: assertHasLoc ensures that

  var deltaBytes = -(node.loc.end.column - node.loc.start.column);
  return {
    uint8Buffer: uint8Buffer,
    deltaBytes: deltaBytes,
    deltaElements: deltaElements
  };
}

function applyAdd(ast, uint8Buffer, node) {
  var deltaElements = +1; // since we added an element

  var sectionName = (0, _helperWasmBytecode.getSectionForNode)(node);
  var sectionMetadata = (0, _ast.getSectionMetadata)(ast, sectionName); // Section doesn't exists, we create an empty one

  if (typeof sectionMetadata === "undefined") {
    var res = (0, _helperWasmSection.createEmptySection)(ast, uint8Buffer, sectionName);
    uint8Buffer = res.uint8Buffer;
    sectionMetadata = res.sectionMetadata;
  }
  /**
   * check that the expressions were ended
   */


  if ((0, _ast.isFunc)(node)) {
    // $FlowIgnore
    var body = node.body;

    if (body.length === 0 || body[body.length - 1].id !== "end") {
      throw new Error("expressions must be ended");
    }
  }

  if ((0, _ast.isGlobal)(node)) {
    // $FlowIgnore
    var body = node.init;

    if (body.length === 0 || body[body.length - 1].id !== "end") {
      throw new Error("expressions must be ended");
    }
  }
  /**
   * Add nodes
   */


  var newByteArray = (0, _wasmGen.encodeNode)(node); // The size of the section doesn't include the storage of the size itself
  // we need to manually add it here

  var start = (0, _ast.getEndOfSection)(sectionMetadata);
  var end = start;
  /**
   * Update section
   */

  var deltaBytes = newByteArray.length;
  uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, start, end, newByteArray);
  node.loc = {
    start: {
      line: -1,
      column: start
    },
    end: {
      line: -1,
      column: start + deltaBytes
    }
  }; // for func add the additional metadata in the AST

  if (node.type === "Func") {
    // the size is the first byte
    // FIXME(sven): handle LEB128 correctly here
    var bodySize = newByteArray[0];
    node.metadata = {
      bodySize: bodySize
    };
  }

  if (node.type !== "IndexInFuncSection") {
    (0, _ast.orderedInsertNode)(ast.body[0], node);
  }

  return {
    uint8Buffer: uint8Buffer,
    deltaBytes: deltaBytes,
    deltaElements: deltaElements
  };
}

function applyOperations(ast, uint8Buffer, ops) {
  ops.forEach(function (op) {
    var state;
    var sectionName;

    switch (op.kind) {
      case "update":
        state = applyUpdate(ast, uint8Buffer, [op.oldNode, op.node]);
        sectionName = (0, _helperWasmBytecode.getSectionForNode)(op.node);
        break;

      case "delete":
        state = applyDelete(ast, uint8Buffer, op.node);
        sectionName = (0, _helperWasmBytecode.getSectionForNode)(op.node);
        break;

      case "add":
        state = applyAdd(ast, uint8Buffer, op.node);
        sectionName = (0, _helperWasmBytecode.getSectionForNode)(op.node);
        break;

      default:
        throw new Error("Unknown operation");
    }
    /**
     * Resize section vec size.
     * If the length of the LEB-encoded size changes, this can change
     * the byte length of the section and the offset for nodes in the
     * section. So we do this first before resizing section byte size
     * or shifting following operations' nodes.
     */


    if (state.deltaElements !== 0 && sectionName !== "start") {
      var oldBufferLength = state.uint8Buffer.length;
      state.uint8Buffer = (0, _helperWasmSection.resizeSectionVecSize)(ast, state.uint8Buffer, sectionName, state.deltaElements); // Infer bytes added/removed by comparing buffer lengths

      state.deltaBytes += state.uint8Buffer.length - oldBufferLength;
    }
    /**
     * Resize section byte size.
     * If the length of the LEB-encoded size changes, this can change
     * the offset for nodes in the section. So we do this before
     * shifting following operations' nodes.
     */


    if (state.deltaBytes !== 0 && sectionName !== "start") {
      var _oldBufferLength = state.uint8Buffer.length;
      state.uint8Buffer = (0, _helperWasmSection.resizeSectionByteSize)(ast, state.uint8Buffer, sectionName, state.deltaBytes); // Infer bytes added/removed by comparing buffer lengths

      state.deltaBytes += state.uint8Buffer.length - _oldBufferLength;
    }
    /**
     * Shift following operation's nodes
     */


    if (state.deltaBytes !== 0) {
      ops.forEach(function (op) {
        // We don't need to handle add ops, they are positioning independent
        switch (op.kind) {
          case "update":
            shiftLocNodeByDelta(op.oldNode, state.deltaBytes);
            break;

          case "delete":
            shiftLocNodeByDelta(op.node, state.deltaBytes);
            break;
        }
      });
    }

    uint8Buffer = state.uint8Buffer;
  });
  return uint8Buffer;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735377);
})()
//miniprogram-npm-outsideDeps=["@webassemblyjs/wasm-parser","@webassemblyjs/ast","@webassemblyjs/ast/lib/clone","@webassemblyjs/wasm-opt","@webassemblyjs/helper-wasm-bytecode","@webassemblyjs/wasm-gen","@webassemblyjs/wasm-gen/lib/encoder","@webassemblyjs/helper-wasm-section","@webassemblyjs/helper-buffer"]
//# sourceMappingURL=index.js.map