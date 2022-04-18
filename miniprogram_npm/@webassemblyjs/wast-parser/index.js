module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735385, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  parse: true
};
exports.parse = parse;

var parser = _interopRequireWildcard(require("./grammar"));

var _tokenizer = require("./tokenizer");

var _numberLiterals = require("./number-literals");

Object.keys(_numberLiterals).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _numberLiterals[key];
    }
  });
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function parse(source) {
  var tokens = (0, _tokenizer.tokenize)(source); // We pass the source here to show code frames

  var ast = parser.parse(tokens, source);
  return ast;
}
}, function(modId) {var map = {"./grammar":1650257735386,"./tokenizer":1650257735389,"./number-literals":1650257735387}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735386, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var _helperCodeFrame = require("@webassemblyjs/helper-code-frame");

var t = _interopRequireWildcard(require("@webassemblyjs/ast"));

var _numberLiterals = require("./number-literals");

var _stringLiterals = require("./string-literals");

var _tokenizer = require("./tokenizer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function hasPlugin(name) {
  if (name !== "wast") throw new Error("unknow plugin");
  return true;
}

function isKeyword(token, id) {
  return token.type === _tokenizer.tokens.keyword && token.value === id;
}

function tokenToString(token) {
  if (token.type === "keyword") {
    return "keyword (".concat(token.value, ")");
  }

  return token.type;
}

function identifierFromToken(token) {
  var _token$loc = token.loc,
      end = _token$loc.end,
      start = _token$loc.start;
  return t.withLoc(t.identifier(token.value), end, start);
}

function parse(tokensList, source) {
  var current = 0;
  var getUniqueName = t.getUniqueNameGenerator();
  var state = {
    registredExportedElements: []
  }; // But this time we're going to use recursion instead of a `while` loop. So we
  // define a `walk` function.

  function walk() {
    var token = tokensList[current];

    function eatToken() {
      token = tokensList[++current];
    }

    function getEndLoc() {
      var currentToken = token;

      if (typeof currentToken === "undefined") {
        var lastToken = tokensList[tokensList.length - 1];
        currentToken = lastToken;
      }

      return currentToken.loc.end;
    }

    function getStartLoc() {
      return token.loc.start;
    }

    function eatTokenOfType(type) {
      if (token.type !== type) {
        throw new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "Assertion error: expected token of type " + type + ", given " + tokenToString(token));
      }

      eatToken();
    }

    function parseExportIndex(token) {
      if (token.type === _tokenizer.tokens.identifier) {
        var index = identifierFromToken(token);
        eatToken();
        return index;
      } else if (token.type === _tokenizer.tokens.number) {
        var _index = t.numberLiteralFromRaw(token.value);

        eatToken();
        return _index;
      } else {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "unknown export index" + ", given " + tokenToString(token));
        }();
      }
    }

    function lookaheadAndCheck() {
      var len = arguments.length;

      for (var i = 0; i < len; i++) {
        var tokenAhead = tokensList[current + i];
        var expectedToken = i < 0 || arguments.length <= i ? undefined : arguments[i];

        if (tokenAhead.type === "keyword") {
          if (isKeyword(tokenAhead, expectedToken) === false) {
            return false;
          }
        } else if (expectedToken !== tokenAhead.type) {
          return false;
        }
      }

      return true;
    } // TODO(sven): there is probably a better way to do this
    // can refactor it if it get out of hands


    function maybeIgnoreComment() {
      if (typeof token === "undefined") {
        // Ignore
        return;
      }

      while (token.type === _tokenizer.tokens.comment) {
        eatToken();

        if (typeof token === "undefined") {
          // Hit the end
          break;
        }
      }
    }
    /**
     * Parses a memory instruction
     *
     * WAST:
     *
     * memory:  ( memory <name>? <memory_sig> )
     *          ( memory <name>? ( export <string> ) <...> )
     *          ( memory <name>? ( import <string> <string> ) <memory_sig> )
     *          ( memory <name>? ( export <string> )* ( data <string>* )
     * memory_sig: <nat> <nat>?
     *
     */


    function parseMemory() {
      var id = t.identifier(getUniqueName("memory"));
      var limits = t.limit(0);

      if (token.type === _tokenizer.tokens.string || token.type === _tokenizer.tokens.identifier) {
        id = t.identifier(token.value);
        eatToken();
      } else {
        id = t.withRaw(id, ""); // preserve anonymous
      }
      /**
       * Maybe data
       */


      if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.data)) {
        eatToken(); // (

        eatToken(); // data
        // TODO(sven): do something with the data collected here

        var stringInitializer = token.value;
        eatTokenOfType(_tokenizer.tokens.string); // Update limits accordingly

        limits = t.limit(stringInitializer.length);
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }
      /**
       * Maybe export
       */


      if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.export)) {
        eatToken(); // (

        eatToken(); // export

        if (token.type !== _tokenizer.tokens.string) {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Expected string in export" + ", given " + tokenToString(token));
          }();
        }

        var _name = token.value;
        eatToken();
        state.registredExportedElements.push({
          exportType: "Memory",
          name: _name,
          id: id
        });
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }
      /**
       * Memory signature
       */


      if (token.type === _tokenizer.tokens.number) {
        limits = t.limit((0, _numberLiterals.parse32I)(token.value));
        eatToken();

        if (token.type === _tokenizer.tokens.number) {
          limits.max = (0, _numberLiterals.parse32I)(token.value);
          eatToken();
        }
      }

      return t.memory(limits, id);
    }
    /**
     * Parses a data section
     * https://webassembly.github.io/spec/core/text/modules.html#data-segments
     *
     * WAST:
     *
     * data:  ( data <index>? <offset> <string> )
     */


    function parseData() {
      // optional memory index
      var memidx = 0;

      if (token.type === _tokenizer.tokens.number) {
        memidx = token.value;
        eatTokenOfType(_tokenizer.tokens.number); // .
      }

      eatTokenOfType(_tokenizer.tokens.openParen);
      var offset;

      if (token.type === _tokenizer.tokens.valtype) {
        eatTokenOfType(_tokenizer.tokens.valtype); // i32

        eatTokenOfType(_tokenizer.tokens.dot); // .

        if (token.value !== "const") {
          throw new Error("constant expression required");
        }

        eatTokenOfType(_tokenizer.tokens.name); // const

        var numberLiteral = t.numberLiteralFromRaw(token.value, "i32");
        offset = t.objectInstruction("const", "i32", [numberLiteral]);
        eatToken();
        eatTokenOfType(_tokenizer.tokens.closeParen);
      } else {
        eatTokenOfType(_tokenizer.tokens.name); // get_global

        var _numberLiteral = t.numberLiteralFromRaw(token.value, "i32");

        offset = t.instruction("get_global", [_numberLiteral]);
        eatToken();
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      var byteArray = (0, _stringLiterals.parseString)(token.value);
      eatToken(); // "string"

      return t.data(t.memIndexLiteral(memidx), offset, t.byteArray(byteArray));
    }
    /**
     * Parses a table instruction
     *
     * WAST:
     *
     * table:   ( table <name>? <table_type> )
     *          ( table <name>? ( export <string> ) <...> )
     *          ( table <name>? ( import <string> <string> ) <table_type> )
     *          ( table <name>? ( export <string> )* <elem_type> ( elem <var>* ) )
     *
     * table_type:  <nat> <nat>? <elem_type>
     * elem_type: anyfunc
     *
     * elem:    ( elem <var>? (offset <instr>* ) <var>* )
     *          ( elem <var>? <expr> <var>* )
     */


    function parseTable() {
      var name = t.identifier(getUniqueName("table"));
      var limit = t.limit(0);
      var elemIndices = [];
      var elemType = "anyfunc";

      if (token.type === _tokenizer.tokens.string || token.type === _tokenizer.tokens.identifier) {
        name = identifierFromToken(token);
        eatToken();
      } else {
        name = t.withRaw(name, ""); // preserve anonymous
      }

      while (token.type !== _tokenizer.tokens.closeParen) {
        /**
         * Maybe export
         */
        if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.elem)) {
          eatToken(); // (

          eatToken(); // elem

          while (token.type === _tokenizer.tokens.identifier) {
            elemIndices.push(t.identifier(token.value));
            eatToken();
          }

          eatTokenOfType(_tokenizer.tokens.closeParen);
        } else if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.export)) {
          eatToken(); // (

          eatToken(); // export

          if (token.type !== _tokenizer.tokens.string) {
            throw function () {
              return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Expected string in export" + ", given " + tokenToString(token));
            }();
          }

          var exportName = token.value;
          eatToken();
          state.registredExportedElements.push({
            exportType: "Table",
            name: exportName,
            id: name
          });
          eatTokenOfType(_tokenizer.tokens.closeParen);
        } else if (isKeyword(token, _tokenizer.keywords.anyfunc)) {
          // It's the default value, we can ignore it
          eatToken(); // anyfunc
        } else if (token.type === _tokenizer.tokens.number) {
          /**
           * Table type
           */
          var min = parseInt(token.value);
          eatToken();

          if (token.type === _tokenizer.tokens.number) {
            var max = parseInt(token.value);
            eatToken();
            limit = t.limit(min, max);
          } else {
            limit = t.limit(min);
          }

          eatToken();
        } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token" + ", given " + tokenToString(token));
          }();
        }
      }

      if (elemIndices.length > 0) {
        return t.table(elemType, limit, name, elemIndices);
      } else {
        return t.table(elemType, limit, name);
      }
    }
    /**
     * Parses an import statement
     *
     * WAST:
     *
     * import:  ( import <string> <string> <imkind> )
     * imkind:  ( func <name>? <func_sig> )
     *          ( global <name>? <global_sig> )
     *          ( table <name>? <table_sig> )
     *          ( memory <name>? <memory_sig> )
     *
     * global_sig: <type> | ( mut <type> )
     */


    function parseImport() {
      if (token.type !== _tokenizer.tokens.string) {
        throw new Error("Expected a string, " + token.type + " given.");
      }

      var moduleName = token.value;
      eatToken();

      if (token.type !== _tokenizer.tokens.string) {
        throw new Error("Expected a string, " + token.type + " given.");
      }

      var name = token.value;
      eatToken();
      eatTokenOfType(_tokenizer.tokens.openParen);
      var descr;

      if (isKeyword(token, _tokenizer.keywords.func)) {
        eatToken(); // keyword

        var fnParams = [];
        var fnResult = [];
        var typeRef;
        var fnName = t.identifier(getUniqueName("func"));

        if (token.type === _tokenizer.tokens.identifier) {
          fnName = identifierFromToken(token);
          eatToken();
        }

        while (token.type === _tokenizer.tokens.openParen) {
          eatToken();

          if (lookaheadAndCheck(_tokenizer.keywords.type) === true) {
            eatToken();
            typeRef = parseTypeReference();
          } else if (lookaheadAndCheck(_tokenizer.keywords.param) === true) {
            eatToken();
            fnParams.push.apply(fnParams, _toConsumableArray(parseFuncParam()));
          } else if (lookaheadAndCheck(_tokenizer.keywords.result) === true) {
            eatToken();
            fnResult.push.apply(fnResult, _toConsumableArray(parseFuncResult()));
          } else {
            throw function () {
              return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in import of type" + ", given " + tokenToString(token));
            }();
          }

          eatTokenOfType(_tokenizer.tokens.closeParen);
        }

        if (typeof fnName === "undefined") {
          throw new Error("Imported function must have a name");
        }

        descr = t.funcImportDescr(fnName, typeRef !== undefined ? typeRef : t.signature(fnParams, fnResult));
      } else if (isKeyword(token, _tokenizer.keywords.global)) {
        eatToken(); // keyword

        if (token.type === _tokenizer.tokens.openParen) {
          eatToken(); // (

          eatTokenOfType(_tokenizer.tokens.keyword); // mut keyword

          var valtype = token.value;
          eatToken();
          descr = t.globalType(valtype, "var");
          eatTokenOfType(_tokenizer.tokens.closeParen);
        } else {
          var _valtype = token.value;
          eatTokenOfType(_tokenizer.tokens.valtype);
          descr = t.globalType(_valtype, "const");
        }
      } else if (isKeyword(token, _tokenizer.keywords.memory) === true) {
        eatToken(); // Keyword

        descr = parseMemory();
      } else if (isKeyword(token, _tokenizer.keywords.table) === true) {
        eatToken(); // Keyword

        descr = parseTable();
      } else {
        throw new Error("Unsupported import type: " + tokenToString(token));
      }

      eatTokenOfType(_tokenizer.tokens.closeParen);
      return t.moduleImport(moduleName, name, descr);
    }
    /**
     * Parses a block instruction
     *
     * WAST:
     *
     * expr: ( block <name>? <block_sig> <instr>* )
     * instr: block <name>? <block_sig> <instr>* end <name>?
     * block_sig : ( result <type>* )*
     *
     */


    function parseBlock() {
      var label = t.identifier(getUniqueName("block"));
      var blockResult = null;
      var instr = [];

      if (token.type === _tokenizer.tokens.identifier) {
        label = identifierFromToken(token);
        eatToken();
      } else {
        label = t.withRaw(label, ""); // preserve anonymous
      }

      while (token.type === _tokenizer.tokens.openParen) {
        eatToken();

        if (lookaheadAndCheck(_tokenizer.keywords.result) === true) {
          eatToken();
          blockResult = token.value;
          eatToken();
        } else if (lookaheadAndCheck(_tokenizer.tokens.name) === true || lookaheadAndCheck(_tokenizer.tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            // Instruction
            instr.push(parseFuncInstr());
          } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in block body of type" + ", given " + tokenToString(token));
          }();
        }

        maybeIgnoreComment();
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      return t.blockInstruction(label, instr, blockResult);
    }
    /**
     * Parses a if instruction
     *
     * WAST:
     *
     * expr:
     * ( if <name>? <block_sig> ( then <instr>* ) ( else <instr>* )? )
     * ( if <name>? <block_sig> <expr>+ ( then <instr>* ) ( else <instr>* )? )
     *
     * instr:
     * if <name>? <block_sig> <instr>* end <name>?
     * if <name>? <block_sig> <instr>* else <name>? <instr>* end <name>?
     *
     * block_sig : ( result <type>* )*
     *
     */


    function parseIf() {
      var blockResult = null;
      var label = t.identifier(getUniqueName("if"));
      var testInstrs = [];
      var consequent = [];
      var alternate = [];

      if (token.type === _tokenizer.tokens.identifier) {
        label = identifierFromToken(token);
        eatToken();
      } else {
        label = t.withRaw(label, ""); // preserve anonymous
      }

      while (token.type === _tokenizer.tokens.openParen) {
        eatToken(); // (

        /**
         * Block signature
         */

        if (isKeyword(token, _tokenizer.keywords.result) === true) {
          eatToken();
          blockResult = token.value;
          eatTokenOfType(_tokenizer.tokens.valtype);
          eatTokenOfType(_tokenizer.tokens.closeParen);
          continue;
        }
        /**
         * Then
         */


        if (isKeyword(token, _tokenizer.keywords.then) === true) {
          eatToken(); // then

          while (token.type === _tokenizer.tokens.openParen) {
            eatToken(); // Instruction

            if (lookaheadAndCheck(_tokenizer.tokens.name) === true || lookaheadAndCheck(_tokenizer.tokens.valtype) === true || token.type === "keyword" // is any keyword
            ) {
                consequent.push(parseFuncInstr());
              } else {
              throw function () {
                return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in consequent body of type" + ", given " + tokenToString(token));
              }();
            }

            eatTokenOfType(_tokenizer.tokens.closeParen);
          }

          eatTokenOfType(_tokenizer.tokens.closeParen);
          continue;
        }
        /**
         * Alternate
         */


        if (isKeyword(token, _tokenizer.keywords.else)) {
          eatToken(); // else

          while (token.type === _tokenizer.tokens.openParen) {
            eatToken(); // Instruction

            if (lookaheadAndCheck(_tokenizer.tokens.name) === true || lookaheadAndCheck(_tokenizer.tokens.valtype) === true || token.type === "keyword" // is any keyword
            ) {
                alternate.push(parseFuncInstr());
              } else {
              throw function () {
                return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in alternate body of type" + ", given " + tokenToString(token));
              }();
            }

            eatTokenOfType(_tokenizer.tokens.closeParen);
          }

          eatTokenOfType(_tokenizer.tokens.closeParen);
          continue;
        }
        /**
         * Test instruction
         */


        if (lookaheadAndCheck(_tokenizer.tokens.name) === true || lookaheadAndCheck(_tokenizer.tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            testInstrs.push(parseFuncInstr());
            eatTokenOfType(_tokenizer.tokens.closeParen);
            continue;
          }

        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in if body" + ", given " + tokenToString(token));
        }();
      }

      return t.ifInstruction(label, testInstrs, blockResult, consequent, alternate);
    }
    /**
     * Parses a loop instruction
     *
     * WAT:
     *
     * blockinstr :: 'loop' I:label rt:resulttype (in:instr*) 'end' id?
     *
     * WAST:
     *
     * instr     :: loop <name>? <block_sig> <instr>* end <name>?
     * expr      :: ( loop <name>? <block_sig> <instr>* )
     * block_sig :: ( result <type>* )*
     *
     */


    function parseLoop() {
      var label = t.identifier(getUniqueName("loop"));
      var blockResult;
      var instr = [];

      if (token.type === _tokenizer.tokens.identifier) {
        label = identifierFromToken(token);
        eatToken();
      } else {
        label = t.withRaw(label, ""); // preserve anonymous
      }

      while (token.type === _tokenizer.tokens.openParen) {
        eatToken();

        if (lookaheadAndCheck(_tokenizer.keywords.result) === true) {
          eatToken();
          blockResult = token.value;
          eatToken();
        } else if (lookaheadAndCheck(_tokenizer.tokens.name) === true || lookaheadAndCheck(_tokenizer.tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            // Instruction
            instr.push(parseFuncInstr());
          } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in loop body" + ", given " + tokenToString(token));
          }();
        }

        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      return t.loopInstruction(label, blockResult, instr);
    }

    function parseCallIndirect() {
      var typeRef;
      var params = [];
      var results = [];
      var instrs = [];

      while (token.type !== _tokenizer.tokens.closeParen) {
        if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.type)) {
          eatToken(); // (

          eatToken(); // type

          typeRef = parseTypeReference();
        } else if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.param)) {
          eatToken(); // (

          eatToken(); // param

          /**
           * Params can be empty:
           * (params)`
           */

          if (token.type !== _tokenizer.tokens.closeParen) {
            params.push.apply(params, _toConsumableArray(parseFuncParam()));
          }
        } else if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.result)) {
          eatToken(); // (

          eatToken(); // result

          /**
           * Results can be empty:
           * (result)`
           */

          if (token.type !== _tokenizer.tokens.closeParen) {
            results.push.apply(results, _toConsumableArray(parseFuncResult()));
          }
        } else {
          eatTokenOfType(_tokenizer.tokens.openParen);
          instrs.push(parseFuncInstr());
        }

        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      return t.callIndirectInstruction(typeRef !== undefined ? typeRef : t.signature(params, results), instrs);
    }
    /**
     * Parses an export instruction
     *
     * WAT:
     *
     * export:  ( export <string> <exkind> )
     * exkind:  ( func <var> )
     *          ( global <var> )
     *          ( table <var> )
     *          ( memory <var> )
     * var:    <nat> | <name>
     *
     */


    function parseExport() {
      if (token.type !== _tokenizer.tokens.string) {
        throw new Error("Expected string after export, got: " + token.type);
      }

      var name = token.value;
      eatToken();
      var moduleExportDescr = parseModuleExportDescr();
      return t.moduleExport(name, moduleExportDescr);
    }

    function parseModuleExportDescr() {
      var startLoc = getStartLoc();
      var type = "";
      var index;
      eatTokenOfType(_tokenizer.tokens.openParen);

      while (token.type !== _tokenizer.tokens.closeParen) {
        if (isKeyword(token, _tokenizer.keywords.func)) {
          type = "Func";
          eatToken();
          index = parseExportIndex(token);
        } else if (isKeyword(token, _tokenizer.keywords.table)) {
          type = "Table";
          eatToken();
          index = parseExportIndex(token);
        } else if (isKeyword(token, _tokenizer.keywords.global)) {
          type = "Global";
          eatToken();
          index = parseExportIndex(token);
        } else if (isKeyword(token, _tokenizer.keywords.memory)) {
          type = "Memory";
          eatToken();
          index = parseExportIndex(token);
        }

        eatToken();
      }

      if (type === "") {
        throw new Error("Unknown export type");
      }

      if (index === undefined) {
        throw new Error("Exported function must have a name");
      }

      var node = t.moduleExportDescr(type, index);
      var endLoc = getEndLoc();
      eatTokenOfType(_tokenizer.tokens.closeParen);
      return t.withLoc(node, endLoc, startLoc);
    }

    function parseModule() {
      var name = null;
      var isBinary = false;
      var isQuote = false;
      var moduleFields = [];

      if (token.type === _tokenizer.tokens.identifier) {
        name = token.value;
        eatToken();
      }

      if (hasPlugin("wast") && token.type === _tokenizer.tokens.name && token.value === "binary") {
        eatToken();
        isBinary = true;
      }

      if (hasPlugin("wast") && token.type === _tokenizer.tokens.name && token.value === "quote") {
        eatToken();
        isQuote = true;
      }

      if (isBinary === true) {
        var blob = [];

        while (token.type === _tokenizer.tokens.string) {
          blob.push(token.value);
          eatToken();
          maybeIgnoreComment();
        }

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.binaryModule(name, blob);
      }

      if (isQuote === true) {
        var string = [];

        while (token.type === _tokenizer.tokens.string) {
          string.push(token.value);
          eatToken();
        }

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.quoteModule(name, string);
      }

      while (token.type !== _tokenizer.tokens.closeParen) {
        moduleFields.push(walk());

        if (state.registredExportedElements.length > 0) {
          state.registredExportedElements.forEach(function (decl) {
            moduleFields.push(t.moduleExport(decl.name, t.moduleExportDescr(decl.exportType, decl.id)));
          });
          state.registredExportedElements = [];
        }

        token = tokensList[current];
      }

      eatTokenOfType(_tokenizer.tokens.closeParen);
      return t.module(name, moduleFields);
    }
    /**
     * Parses the arguments of an instruction
     */


    function parseFuncInstrArguments(signature) {
      var args = [];
      var namedArgs = {};
      var signaturePtr = 0;

      while (token.type === _tokenizer.tokens.name || isKeyword(token, _tokenizer.keywords.offset)) {
        var key = token.value;
        eatToken();
        eatTokenOfType(_tokenizer.tokens.equal);
        var value = void 0;

        if (token.type === _tokenizer.tokens.number) {
          value = t.numberLiteralFromRaw(token.value);
        } else {
          throw new Error("Unexpected type for argument: " + token.type);
        }

        namedArgs[key] = value;
        eatToken();
      } // $FlowIgnore


      var signatureLength = signature.vector ? Infinity : signature.length;

      while (token.type !== _tokenizer.tokens.closeParen && ( // $FlowIgnore
      token.type === _tokenizer.tokens.openParen || signaturePtr < signatureLength)) {
        if (token.type === _tokenizer.tokens.identifier) {
          args.push(t.identifier(token.value));
          eatToken();
        } else if (token.type === _tokenizer.tokens.valtype) {
          // Handle locals
          args.push(t.valtypeLiteral(token.value));
          eatToken();
        } else if (token.type === _tokenizer.tokens.string) {
          args.push(t.stringLiteral(token.value));
          eatToken();
        } else if (token.type === _tokenizer.tokens.number) {
          args.push( // TODO(sven): refactor the type signature handling
          // https://github.com/xtuc/webassemblyjs/pull/129 is a good start
          t.numberLiteralFromRaw(token.value, // $FlowIgnore
          signature[signaturePtr] || "f64")); // $FlowIgnore

          if (!signature.vector) {
            ++signaturePtr;
          }

          eatToken();
        } else if (token.type === _tokenizer.tokens.openParen) {
          /**
           * Maybe some nested instructions
           */
          eatToken(); // Instruction

          if (lookaheadAndCheck(_tokenizer.tokens.name) === true || lookaheadAndCheck(_tokenizer.tokens.valtype) === true || token.type === "keyword" // is any keyword
          ) {
              // $FlowIgnore
              args.push(parseFuncInstr());
            } else {
            throw function () {
              return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in nested instruction" + ", given " + tokenToString(token));
            }();
          }

          if (token.type === _tokenizer.tokens.closeParen) {
            eatToken();
          }
        } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in instruction argument" + ", given " + tokenToString(token));
          }();
        }
      }

      return {
        args: args,
        namedArgs: namedArgs
      };
    }
    /**
     * Parses an instruction
     *
     * WAT:
     *
     * instr      :: plaininst
     *               blockinstr
     *
     * blockinstr :: 'block' I:label rt:resulttype (in:instr*) 'end' id?
     *               'loop' I:label rt:resulttype (in:instr*) 'end' id?
     *               'if' I:label rt:resulttype (in:instr*) 'else' id? (in2:intr*) 'end' id?
     *
     * plaininst  :: 'unreachable'
     *               'nop'
     *               'br' l:labelidx
     *               'br_if' l:labelidx
     *               'br_table' l*:vec(labelidx) ln:labelidx
     *               'return'
     *               'call' x:funcidx
     *               'call_indirect' x, I:typeuse
     *
     * WAST:
     *
     * instr:
     *   <expr>
     *   <op>
     *   block <name>? <block_sig> <instr>* end <name>?
     *   loop <name>? <block_sig> <instr>* end <name>?
     *   if <name>? <block_sig> <instr>* end <name>?
     *   if <name>? <block_sig> <instr>* else <name>? <instr>* end <name>?
     *
     * expr:
     *   ( <op> )
     *   ( <op> <expr>+ )
     *   ( block <name>? <block_sig> <instr>* )
     *   ( loop <name>? <block_sig> <instr>* )
     *   ( if <name>? <block_sig> ( then <instr>* ) ( else <instr>* )? )
     *   ( if <name>? <block_sig> <expr>+ ( then <instr>* ) ( else <instr>* )? )
     *
     * op:
     *   unreachable
     *   nop
     *   br <var>
     *   br_if <var>
     *   br_table <var>+
     *   return
     *   call <var>
     *   call_indirect <func_sig>
     *   drop
     *   select
     *   get_local <var>
     *   set_local <var>
     *   tee_local <var>
     *   get_global <var>
     *   set_global <var>
     *   <type>.load((8|16|32)_<sign>)? <offset>? <align>?
     *   <type>.store(8|16|32)? <offset>? <align>?
     *   current_memory
     *   grow_memory
     *   <type>.const <value>
     *   <type>.<unop>
     *   <type>.<binop>
     *   <type>.<testop>
     *   <type>.<relop>
     *   <type>.<cvtop>/<type>
     *
     * func_type:   ( type <var> )? <param>* <result>*
     */


    function parseFuncInstr() {
      var startLoc = getStartLoc();
      maybeIgnoreComment();
      /**
       * A simple instruction
       */

      if (token.type === _tokenizer.tokens.name || token.type === _tokenizer.tokens.valtype) {
        var _name2 = token.value;
        var object;
        eatToken();

        if (token.type === _tokenizer.tokens.dot) {
          object = _name2;
          eatToken();

          if (token.type !== _tokenizer.tokens.name) {
            throw new TypeError("Unknown token: " + token.type + ", name expected");
          }

          _name2 = token.value;
          eatToken();
        }

        if (token.type === _tokenizer.tokens.closeParen) {
          var _endLoc = token.loc.end;

          if (typeof object === "undefined") {
            return t.withLoc(t.instruction(_name2), _endLoc, startLoc);
          } else {
            return t.withLoc(t.objectInstruction(_name2, object, []), _endLoc, startLoc);
          }
        }

        var signature = t.signatureForOpcode(object || "", _name2);

        var _parseFuncInstrArgume = parseFuncInstrArguments(signature),
            _args = _parseFuncInstrArgume.args,
            _namedArgs = _parseFuncInstrArgume.namedArgs;

        var endLoc = token.loc.end;

        if (typeof object === "undefined") {
          return t.withLoc(t.instruction(_name2, _args, _namedArgs), endLoc, startLoc);
        } else {
          return t.withLoc(t.objectInstruction(_name2, object, _args, _namedArgs), endLoc, startLoc);
        }
      } else if (isKeyword(token, _tokenizer.keywords.loop)) {
        /**
         * Else a instruction with a keyword (loop or block)
         */
        eatToken(); // keyword

        return parseLoop();
      } else if (isKeyword(token, _tokenizer.keywords.block)) {
        eatToken(); // keyword

        return parseBlock();
      } else if (isKeyword(token, _tokenizer.keywords.call_indirect)) {
        eatToken(); // keyword

        return parseCallIndirect();
      } else if (isKeyword(token, _tokenizer.keywords.call)) {
        eatToken(); // keyword

        var index;

        if (token.type === _tokenizer.tokens.identifier) {
          index = identifierFromToken(token);
          eatToken();
        } else if (token.type === _tokenizer.tokens.number) {
          index = t.indexLiteral(token.value);
          eatToken();
        }

        var instrArgs = []; // Nested instruction

        while (token.type === _tokenizer.tokens.openParen) {
          eatToken();
          instrArgs.push(parseFuncInstr());
          eatTokenOfType(_tokenizer.tokens.closeParen);
        }

        if (typeof index === "undefined") {
          throw new Error("Missing argument in call instruciton");
        }

        if (instrArgs.length > 0) {
          return t.callInstruction(index, instrArgs);
        } else {
          return t.callInstruction(index);
        }
      } else if (isKeyword(token, _tokenizer.keywords.if)) {
        eatToken(); // Keyword

        return parseIf();
      } else if (isKeyword(token, _tokenizer.keywords.module) && hasPlugin("wast")) {
        eatToken(); // In WAST you can have a module as an instruction's argument
        // we will cast it into a instruction to not break the flow
        // $FlowIgnore

        var module = parseModule();
        return module;
      } else {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected instruction in function body" + ", given " + tokenToString(token));
        }();
      }
    }
    /*
     * Parses a function
     *
     * WAT:
     *
     * functype :: ( 'func' t1:vec(param) t2:vec(result) )
     * param    :: ( 'param' id? t:valtype )
     * result   :: ( 'result' t:valtype )
     *
     * WAST:
     *
     * func     :: ( func <name>? <func_sig> <local>* <instr>* )
     *             ( func <name>? ( export <string> ) <...> )
     *             ( func <name>? ( import <string> <string> ) <func_sig> )
     * func_sig :: ( type <var> )? <param>* <result>*
     * param    :: ( param <type>* ) | ( param <name> <type> )
     * result   :: ( result <type>* )
     * local    :: ( local <type>* ) | ( local <name> <type> )
     *
     */


    function parseFunc() {
      var fnName = t.identifier(getUniqueName("func"));
      var typeRef;
      var fnBody = [];
      var fnParams = [];
      var fnResult = []; // name

      if (token.type === _tokenizer.tokens.identifier) {
        fnName = identifierFromToken(token);
        eatToken();
      } else {
        fnName = t.withRaw(fnName, ""); // preserve anonymous
      }

      maybeIgnoreComment();

      while (token.type === _tokenizer.tokens.openParen || token.type === _tokenizer.tokens.name || token.type === _tokenizer.tokens.valtype) {
        // Instructions without parens
        if (token.type === _tokenizer.tokens.name || token.type === _tokenizer.tokens.valtype) {
          fnBody.push(parseFuncInstr());
          continue;
        }

        eatToken();

        if (lookaheadAndCheck(_tokenizer.keywords.param) === true) {
          eatToken();
          fnParams.push.apply(fnParams, _toConsumableArray(parseFuncParam()));
        } else if (lookaheadAndCheck(_tokenizer.keywords.result) === true) {
          eatToken();
          fnResult.push.apply(fnResult, _toConsumableArray(parseFuncResult()));
        } else if (lookaheadAndCheck(_tokenizer.keywords.export) === true) {
          eatToken();
          parseFuncExport(fnName);
        } else if (lookaheadAndCheck(_tokenizer.keywords.type) === true) {
          eatToken();
          typeRef = parseTypeReference();
        } else if (lookaheadAndCheck(_tokenizer.tokens.name) === true || lookaheadAndCheck(_tokenizer.tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            // Instruction
            fnBody.push(parseFuncInstr());
          } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in func body" + ", given " + tokenToString(token));
          }();
        }

        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      return t.func(fnName, typeRef !== undefined ? typeRef : t.signature(fnParams, fnResult), fnBody);
    }
    /**
     * Parses shorthand export in func
     *
     * export :: ( export <string> )
     */


    function parseFuncExport(funcId) {
      if (token.type !== _tokenizer.tokens.string) {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Function export expected a string" + ", given " + tokenToString(token));
        }();
      }

      var name = token.value;
      eatToken();
      /**
       * Func export shorthand, we trait it as a syntaxic sugar.
       * A export ModuleField will be added later.
       *
       * We give the anonymous function a generated name and export it.
       */

      var id = t.identifier(funcId.value);
      state.registredExportedElements.push({
        exportType: "Func",
        name: name,
        id: id
      });
    }
    /**
     * Parses a type instruction
     *
     * WAST:
     *
     * typedef: ( type <name>? ( func <param>* <result>* ) )
     */


    function parseType() {
      var id;
      var params = [];
      var result = [];

      if (token.type === _tokenizer.tokens.identifier) {
        id = identifierFromToken(token);
        eatToken();
      }

      if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.func)) {
        eatToken(); // (

        eatToken(); // func

        if (token.type === _tokenizer.tokens.closeParen) {
          eatToken(); // function with an empty signature, we can abort here

          return t.typeInstruction(id, t.signature([], []));
        }

        if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.param)) {
          eatToken(); // (

          eatToken(); // param

          params = parseFuncParam();
          eatTokenOfType(_tokenizer.tokens.closeParen);
        }

        if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.result)) {
          eatToken(); // (

          eatToken(); // result

          result = parseFuncResult();
          eatTokenOfType(_tokenizer.tokens.closeParen);
        }

        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      return t.typeInstruction(id, t.signature(params, result));
    }
    /**
     * Parses a function result
     *
     * WAST:
     *
     * result :: ( result <type>* )
     */


    function parseFuncResult() {
      var results = [];

      while (token.type !== _tokenizer.tokens.closeParen) {
        if (token.type !== _tokenizer.tokens.valtype) {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in func result" + ", given " + tokenToString(token));
          }();
        }

        var valtype = token.value;
        eatToken();
        results.push(valtype);
      }

      return results;
    }
    /**
     * Parses a type reference
     *
     */


    function parseTypeReference() {
      var ref;

      if (token.type === _tokenizer.tokens.identifier) {
        ref = identifierFromToken(token);
        eatToken();
      } else if (token.type === _tokenizer.tokens.number) {
        ref = t.numberLiteralFromRaw(token.value);
        eatToken();
      }

      return ref;
    }
    /**
     * Parses a global instruction
     *
     * WAST:
     *
     * global:  ( global <name>? <global_sig> <instr>* )
     *          ( global <name>? ( export <string> ) <...> )
     *          ( global <name>? ( import <string> <string> ) <global_sig> )
     *
     * global_sig: <type> | ( mut <type> )
     *
     */


    function parseGlobal() {
      var name = t.identifier(getUniqueName("global"));
      var type; // Keep informations in case of a shorthand import

      var importing = null;
      maybeIgnoreComment();

      if (token.type === _tokenizer.tokens.identifier) {
        name = identifierFromToken(token);
        eatToken();
      } else {
        name = t.withRaw(name, ""); // preserve anonymous
      }
      /**
       * maybe export
       */


      if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.export)) {
        eatToken(); // (

        eatToken(); // export

        var exportName = token.value;
        eatTokenOfType(_tokenizer.tokens.string);
        state.registredExportedElements.push({
          exportType: "Global",
          name: exportName,
          id: name
        });
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }
      /**
       * maybe import
       */


      if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.import)) {
        eatToken(); // (

        eatToken(); // import

        var moduleName = token.value;
        eatTokenOfType(_tokenizer.tokens.string);
        var _name3 = token.value;
        eatTokenOfType(_tokenizer.tokens.string);
        importing = {
          module: moduleName,
          name: _name3,
          descr: undefined
        };
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }
      /**
       * global_sig
       */


      if (token.type === _tokenizer.tokens.valtype) {
        type = t.globalType(token.value, "const");
        eatToken();
      } else if (token.type === _tokenizer.tokens.openParen) {
        eatToken(); // (

        if (isKeyword(token, _tokenizer.keywords.mut) === false) {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unsupported global type, expected mut" + ", given " + tokenToString(token));
          }();
        }

        eatToken(); // mut

        type = t.globalType(token.value, "var");
        eatToken();
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      if (type === undefined) {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Could not determine global type" + ", given " + tokenToString(token));
        }();
      }

      maybeIgnoreComment();
      var init = [];

      if (importing != null) {
        importing.descr = type;
        init.push(t.moduleImport(importing.module, importing.name, importing.descr));
      }
      /**
       * instr*
       */


      while (token.type === _tokenizer.tokens.openParen) {
        eatToken();
        init.push(parseFuncInstr());
        eatTokenOfType(_tokenizer.tokens.closeParen);
      }

      return t.global(type, init, name);
    }
    /**
     * Parses a function param
     *
     * WAST:
     *
     * param    :: ( param <type>* ) | ( param <name> <type> )
     */


    function parseFuncParam() {
      var params = [];
      var id;
      var valtype;

      if (token.type === _tokenizer.tokens.identifier) {
        id = token.value;
        eatToken();
      }

      if (token.type === _tokenizer.tokens.valtype) {
        valtype = token.value;
        eatToken();
        params.push({
          id: id,
          valtype: valtype
        });
        /**
         * Shorthand notation for multiple anonymous parameters
         * @see https://webassembly.github.io/spec/core/text/types.html#function-types
         * @see https://github.com/xtuc/webassemblyjs/issues/6
         */

        if (id === undefined) {
          while (token.type === _tokenizer.tokens.valtype) {
            valtype = token.value;
            eatToken();
            params.push({
              id: undefined,
              valtype: valtype
            });
          }
        }
      } else {// ignore
      }

      return params;
    }
    /**
     * Parses an element segments instruction
     *
     * WAST:
     *
     * elem:    ( elem <var>? (offset <instr>* ) <var>* )
     *          ( elem <var>? <expr> <var>* )
     *
     * var:    <nat> | <name>
     */


    function parseElem() {
      var tableIndex = t.indexLiteral(0);
      var offset = [];
      var funcs = [];

      if (token.type === _tokenizer.tokens.identifier) {
        tableIndex = identifierFromToken(token);
        eatToken();
      }

      if (token.type === _tokenizer.tokens.number) {
        tableIndex = t.indexLiteral(token.value);
        eatToken();
      }

      while (token.type !== _tokenizer.tokens.closeParen) {
        if (lookaheadAndCheck(_tokenizer.tokens.openParen, _tokenizer.keywords.offset)) {
          eatToken(); // (

          eatToken(); // offset

          while (token.type !== _tokenizer.tokens.closeParen) {
            eatTokenOfType(_tokenizer.tokens.openParen);
            offset.push(parseFuncInstr());
            eatTokenOfType(_tokenizer.tokens.closeParen);
          }

          eatTokenOfType(_tokenizer.tokens.closeParen);
        } else if (token.type === _tokenizer.tokens.identifier) {
          funcs.push(t.identifier(token.value));
          eatToken();
        } else if (token.type === _tokenizer.tokens.number) {
          funcs.push(t.indexLiteral(token.value));
          eatToken();
        } else if (token.type === _tokenizer.tokens.openParen) {
          eatToken(); // (

          offset.push(parseFuncInstr());
          eatTokenOfType(_tokenizer.tokens.closeParen);
        } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unsupported token in elem" + ", given " + tokenToString(token));
          }();
        }
      }

      return t.elem(tableIndex, offset, funcs);
    }
    /**
     * Parses the start instruction in a module
     *
     * WAST:
     *
     * start:   ( start <var> )
     * var:    <nat> | <name>
     *
     * WAT:
     * start ::= ‘(’ ‘start’  x:funcidx ‘)’
     */


    function parseStart() {
      if (token.type === _tokenizer.tokens.identifier) {
        var index = identifierFromToken(token);
        eatToken();
        return t.start(index);
      }

      if (token.type === _tokenizer.tokens.number) {
        var _index2 = t.indexLiteral(token.value);

        eatToken();
        return t.start(_index2);
      }

      throw new Error("Unknown start, token: " + tokenToString(token));
    }

    if (token.type === _tokenizer.tokens.openParen) {
      eatToken();
      var startLoc = getStartLoc();

      if (isKeyword(token, _tokenizer.keywords.export)) {
        eatToken();
        var node = parseExport();

        var _endLoc2 = getEndLoc();

        return t.withLoc(node, _endLoc2, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.loop)) {
        eatToken();

        var _node = parseLoop();

        var _endLoc3 = getEndLoc();

        return t.withLoc(_node, _endLoc3, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.func)) {
        eatToken();

        var _node2 = parseFunc();

        var _endLoc4 = getEndLoc();

        maybeIgnoreComment();
        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node2, _endLoc4, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.module)) {
        eatToken();

        var _node3 = parseModule();

        var _endLoc5 = getEndLoc();

        return t.withLoc(_node3, _endLoc5, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.import)) {
        eatToken();

        var _node4 = parseImport();

        var _endLoc6 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node4, _endLoc6, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.block)) {
        eatToken();

        var _node5 = parseBlock();

        var _endLoc7 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node5, _endLoc7, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.memory)) {
        eatToken();

        var _node6 = parseMemory();

        var _endLoc8 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node6, _endLoc8, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.data)) {
        eatToken();

        var _node7 = parseData();

        var _endLoc9 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node7, _endLoc9, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.table)) {
        eatToken();

        var _node8 = parseTable();

        var _endLoc10 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node8, _endLoc10, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.global)) {
        eatToken();

        var _node9 = parseGlobal();

        var _endLoc11 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node9, _endLoc11, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.type)) {
        eatToken();

        var _node10 = parseType();

        var _endLoc12 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node10, _endLoc12, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.start)) {
        eatToken();

        var _node11 = parseStart();

        var _endLoc13 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node11, _endLoc13, startLoc);
      }

      if (isKeyword(token, _tokenizer.keywords.elem)) {
        eatToken();

        var _node12 = parseElem();

        var _endLoc14 = getEndLoc();

        eatTokenOfType(_tokenizer.tokens.closeParen);
        return t.withLoc(_node12, _endLoc14, startLoc);
      }

      var instruction = parseFuncInstr();
      var endLoc = getEndLoc();
      maybeIgnoreComment();

      if (_typeof(instruction) === "object") {
        if (typeof token !== "undefined") {
          eatTokenOfType(_tokenizer.tokens.closeParen);
        }

        return t.withLoc(instruction, endLoc, startLoc);
      }
    }

    if (token.type === _tokenizer.tokens.comment) {
      var _startLoc = getStartLoc();

      var builder = token.opts.type === "leading" ? t.leadingComment : t.blockComment;

      var _node13 = builder(token.value);

      eatToken(); // comment

      var _endLoc15 = getEndLoc();

      return t.withLoc(_node13, _endLoc15, _startLoc);
    }

    throw function () {
      return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unknown token" + ", given " + tokenToString(token));
    }();
  }

  var body = [];

  while (current < tokensList.length) {
    body.push(walk());
  }

  return t.program(body);
}
}, function(modId) { var map = {"./number-literals":1650257735387,"./string-literals":1650257735388,"./tokenizer":1650257735389}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735387, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse32F = parse32F;
exports.parse64F = parse64F;
exports.parse32I = parse32I;
exports.parseU32 = parseU32;
exports.parse64I = parse64I;
exports.isInfLiteral = isInfLiteral;
exports.isNanLiteral = isNanLiteral;

var _long = _interopRequireDefault(require("@xtuc/long"));

var _floatingPointHexParser = _interopRequireDefault(require("@webassemblyjs/floating-point-hex-parser"));

var _helperApiError = require("@webassemblyjs/helper-api-error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse32F(sourceString) {
  if (isHexLiteral(sourceString)) {
    return (0, _floatingPointHexParser.default)(sourceString);
  }

  if (isInfLiteral(sourceString)) {
    return sourceString[0] === "-" ? -1 : 1;
  }

  if (isNanLiteral(sourceString)) {
    return (sourceString[0] === "-" ? -1 : 1) * (sourceString.includes(":") ? parseInt(sourceString.substring(sourceString.indexOf(":") + 1), 16) : 0x400000);
  }

  return parseFloat(sourceString);
}

function parse64F(sourceString) {
  if (isHexLiteral(sourceString)) {
    return (0, _floatingPointHexParser.default)(sourceString);
  }

  if (isInfLiteral(sourceString)) {
    return sourceString[0] === "-" ? -1 : 1;
  }

  if (isNanLiteral(sourceString)) {
    return (sourceString[0] === "-" ? -1 : 1) * (sourceString.includes(":") ? parseInt(sourceString.substring(sourceString.indexOf(":") + 1), 16) : 0x8000000000000);
  }

  if (isHexLiteral(sourceString)) {
    return (0, _floatingPointHexParser.default)(sourceString);
  }

  return parseFloat(sourceString);
}

function parse32I(sourceString) {
  var value = 0;

  if (isHexLiteral(sourceString)) {
    value = ~~parseInt(sourceString, 16);
  } else if (isDecimalExponentLiteral(sourceString)) {
    throw new Error("This number literal format is yet to be implemented.");
  } else {
    value = parseInt(sourceString, 10);
  }

  return value;
}

function parseU32(sourceString) {
  var value = parse32I(sourceString);

  if (value < 0) {
    throw new _helperApiError.CompileError("Illegal value for u32: " + sourceString);
  }

  return value;
}

function parse64I(sourceString) {
  var long;

  if (isHexLiteral(sourceString)) {
    long = _long.default.fromString(sourceString, false, 16);
  } else if (isDecimalExponentLiteral(sourceString)) {
    throw new Error("This number literal format is yet to be implemented.");
  } else {
    long = _long.default.fromString(sourceString);
  }

  return {
    high: long.high,
    low: long.low
  };
}

var NAN_WORD = /^\+?-?nan/;
var INF_WORD = /^\+?-?inf/;

function isInfLiteral(sourceString) {
  return INF_WORD.test(sourceString.toLowerCase());
}

function isNanLiteral(sourceString) {
  return NAN_WORD.test(sourceString.toLowerCase());
}

function isDecimalExponentLiteral(sourceString) {
  return !isHexLiteral(sourceString) && sourceString.toUpperCase().includes("E");
}

function isHexLiteral(sourceString) {
  return sourceString.substring(0, 2).toUpperCase() === "0X" || sourceString.substring(0, 3).toUpperCase() === "-0X";
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735388, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseString = parseString;
// string literal characters cannot contain control codes
var CONTROL_CODES = [0, // null
7, // bell
8, // backspace
9, // horizontal
10, // line feed
11, // vertical tab
12, // form feed
13, // carriage return
26, // Control-Z
27, // escape
127 // delete
]; // escaped sequences can either be a two character hex value, or one of the
// following single character codes

function decodeControlCharacter(char) {
  switch (char) {
    case "t":
      return 0x09;

    case "n":
      return 0x0a;

    case "r":
      return 0x0d;

    case '"':
      return 0x22;

    case "′":
      return 0x27;

    case "\\":
      return 0x5c;
  }

  return -1;
}

var ESCAPE_CHAR = 92; // backslash

var QUOTE_CHAR = 34; // backslash
// parse string as per the spec:
// https://webassembly.github.io/spec/core/multipage/text/values.html#text-string

function parseString(value) {
  var byteArray = [];
  var index = 0;

  while (index < value.length) {
    var charCode = value.charCodeAt(index);

    if (CONTROL_CODES.indexOf(charCode) !== -1) {
      throw new Error("ASCII control characters are not permitted within string literals");
    }

    if (charCode === QUOTE_CHAR) {
      throw new Error("quotes are not permitted within string literals");
    }

    if (charCode === ESCAPE_CHAR) {
      var firstChar = value.substr(index + 1, 1);
      var decodedControlChar = decodeControlCharacter(firstChar);

      if (decodedControlChar !== -1) {
        // single character escaped values, e.g. \r
        byteArray.push(decodedControlChar);
        index += 2;
      } else {
        // hex escaped values, e.g. \2a
        var hexValue = value.substr(index + 1, 2);

        if (!/^[0-9A-F]{2}$/i.test(hexValue)) {
          throw new Error("invalid character encoding");
        }

        byteArray.push(parseInt(hexValue, 16));
        index += 3;
      }
    } else {
      // ASCII encoded values
      byteArray.push(charCode);
      index++;
    }
  }

  return byteArray;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735389, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = tokenize;
exports.tokens = exports.keywords = void 0;

var _helperFsm = require("@webassemblyjs/helper-fsm");

var _helperCodeFrame = require("@webassemblyjs/helper-code-frame");

// eslint-disable-next-line
function getCodeFrame(source, line, column) {
  var loc = {
    start: {
      line: line,
      column: column
    }
  };
  return "\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, loc) + "\n";
}

var WHITESPACE = /\s/;
var PARENS = /\(|\)/;
var LETTERS = /[a-z0-9_/]/i;
var idchar = /[a-z0-9!#$%&*+./:<=>?@\\[\]^_`|~-]/i;
var valtypes = ["i32", "i64", "f32", "f64"];
var NUMBERS = /[0-9|.|_]/;
var NUMBER_KEYWORDS = /nan|inf/;

function isNewLine(char) {
  return char.charCodeAt(0) === 10 || char.charCodeAt(0) === 13;
}

function Token(type, value, start, end) {
  var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var token = {
    type: type,
    value: value,
    loc: {
      start: start,
      end: end
    }
  };

  if (Object.keys(opts).length > 0) {
    // $FlowIgnore
    token["opts"] = opts;
  }

  return token;
}

var tokenTypes = {
  openParen: "openParen",
  closeParen: "closeParen",
  number: "number",
  string: "string",
  name: "name",
  identifier: "identifier",
  valtype: "valtype",
  dot: "dot",
  comment: "comment",
  equal: "equal",
  keyword: "keyword"
};
var keywords = {
  module: "module",
  func: "func",
  param: "param",
  result: "result",
  export: "export",
  loop: "loop",
  block: "block",
  if: "if",
  then: "then",
  else: "else",
  call: "call",
  call_indirect: "call_indirect",
  import: "import",
  memory: "memory",
  table: "table",
  global: "global",
  anyfunc: "anyfunc",
  mut: "mut",
  data: "data",
  type: "type",
  elem: "elem",
  start: "start",
  offset: "offset"
};
exports.keywords = keywords;
var NUMERIC_SEPARATOR = "_";
/**
 * Build the FSM for number literals
 */

var numberLiteralFSM = new _helperFsm.FSM({
  START: [(0, _helperFsm.makeTransition)(/-|\+/, "AFTER_SIGN"), (0, _helperFsm.makeTransition)(/nan:0x/, "NAN_HEX", {
    n: 6
  }), (0, _helperFsm.makeTransition)(/nan|inf/, "STOP", {
    n: 3
  }), (0, _helperFsm.makeTransition)(/0x/, "HEX", {
    n: 2
  }), (0, _helperFsm.makeTransition)(/[0-9]/, "DEC"), (0, _helperFsm.makeTransition)(/\./, "DEC_FRAC")],
  AFTER_SIGN: [(0, _helperFsm.makeTransition)(/nan:0x/, "NAN_HEX", {
    n: 6
  }), (0, _helperFsm.makeTransition)(/nan|inf/, "STOP", {
    n: 3
  }), (0, _helperFsm.makeTransition)(/0x/, "HEX", {
    n: 2
  }), (0, _helperFsm.makeTransition)(/[0-9]/, "DEC"), (0, _helperFsm.makeTransition)(/\./, "DEC_FRAC")],
  DEC_FRAC: [(0, _helperFsm.makeTransition)(/[0-9]/, "DEC_FRAC", {
    allowedSeparator: NUMERIC_SEPARATOR
  }), (0, _helperFsm.makeTransition)(/e|E/, "DEC_SIGNED_EXP")],
  DEC: [(0, _helperFsm.makeTransition)(/[0-9]/, "DEC", {
    allowedSeparator: NUMERIC_SEPARATOR
  }), (0, _helperFsm.makeTransition)(/\./, "DEC_FRAC"), (0, _helperFsm.makeTransition)(/e|E/, "DEC_SIGNED_EXP")],
  DEC_SIGNED_EXP: [(0, _helperFsm.makeTransition)(/\+|-/, "DEC_EXP"), (0, _helperFsm.makeTransition)(/[0-9]/, "DEC_EXP")],
  DEC_EXP: [(0, _helperFsm.makeTransition)(/[0-9]/, "DEC_EXP", {
    allowedSeparator: NUMERIC_SEPARATOR
  })],
  HEX: [(0, _helperFsm.makeTransition)(/[0-9|A-F|a-f]/, "HEX", {
    allowedSeparator: NUMERIC_SEPARATOR
  }), (0, _helperFsm.makeTransition)(/\./, "HEX_FRAC"), (0, _helperFsm.makeTransition)(/p|P/, "HEX_SIGNED_EXP")],
  HEX_FRAC: [(0, _helperFsm.makeTransition)(/[0-9|A-F|a-f]/, "HEX_FRAC", {
    allowedSeparator: NUMERIC_SEPARATOR
  }), (0, _helperFsm.makeTransition)(/p|P|/, "HEX_SIGNED_EXP")],
  HEX_SIGNED_EXP: [(0, _helperFsm.makeTransition)(/[0-9|+|-]/, "HEX_EXP")],
  HEX_EXP: [(0, _helperFsm.makeTransition)(/[0-9]/, "HEX_EXP", {
    allowedSeparator: NUMERIC_SEPARATOR
  })],
  NAN_HEX: [(0, _helperFsm.makeTransition)(/[0-9|A-F|a-f]/, "NAN_HEX", {
    allowedSeparator: NUMERIC_SEPARATOR
  })],
  STOP: []
}, "START", "STOP");

function tokenize(input) {
  var current = 0;
  var char = input[current]; // Used by SourceLocation

  var column = 1;
  var line = 1;
  var tokens = [];
  /**
   * Creates a pushToken function for a given type
   */

  function pushToken(type) {
    return function (v) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var startColumn = opts.startColumn || column - String(v).length;
      delete opts.startColumn;
      var endColumn = opts.endColumn || startColumn + String(v).length - 1;
      delete opts.endColumn;
      var start = {
        line: line,
        column: startColumn
      };
      var end = {
        line: line,
        column: endColumn
      };
      tokens.push(Token(type, v, start, end, opts));
    };
  }
  /**
   * Functions to save newly encountered tokens
   */


  var pushCloseParenToken = pushToken(tokenTypes.closeParen);
  var pushOpenParenToken = pushToken(tokenTypes.openParen);
  var pushNumberToken = pushToken(tokenTypes.number);
  var pushValtypeToken = pushToken(tokenTypes.valtype);
  var pushNameToken = pushToken(tokenTypes.name);
  var pushIdentifierToken = pushToken(tokenTypes.identifier);
  var pushKeywordToken = pushToken(tokenTypes.keyword);
  var pushDotToken = pushToken(tokenTypes.dot);
  var pushStringToken = pushToken(tokenTypes.string);
  var pushCommentToken = pushToken(tokenTypes.comment);
  var pushEqualToken = pushToken(tokenTypes.equal);
  /**
   * Can be used to look at the next character(s).
   *
   * The default behavior `lookahead()` simply returns the next character without consuming it.
   * Letters are always returned in lowercase.
   *
   * @param {number} length How many characters to query. Default = 1
   * @param {number} offset How many characters to skip forward from current one. Default = 1
   *
   */

  function lookahead() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return input.substring(current + offset, current + offset + length).toLowerCase();
  }
  /**
   * Advances the cursor in the input by a certain amount
   *
   * @param {number} amount How many characters to consume. Default = 1
   */


  function eatCharacter() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    column += amount;
    current += amount;
    char = input[current];
  }

  while (current < input.length) {
    // ;;
    if (char === ";" && lookahead() === ";") {
      var startColumn = column;
      eatCharacter(2);
      var text = "";

      while (!isNewLine(char)) {
        text += char;
        eatCharacter();

        if (char === undefined) {
          break;
        }
      }

      var endColumn = column;
      pushCommentToken(text, {
        type: "leading",
        startColumn: startColumn,
        endColumn: endColumn
      });
      continue;
    } // (;


    if (char === "(" && lookahead() === ";") {
      var _startColumn = column;
      eatCharacter(2);
      var _text = ""; // ;)

      while (true) {
        char = input[current];

        if (char === ";" && lookahead() === ")") {
          eatCharacter(2);
          break;
        }

        _text += char;
        eatCharacter();

        if (isNewLine(char)) {
          line++;
          column = 0;
        }
      }

      var _endColumn = column;
      pushCommentToken(_text, {
        type: "block",
        startColumn: _startColumn,
        endColumn: _endColumn
      });
      continue;
    }

    if (char === "(") {
      pushOpenParenToken(char);
      eatCharacter();
      continue;
    }

    if (char === "=") {
      pushEqualToken(char);
      eatCharacter();
      continue;
    }

    if (char === ")") {
      pushCloseParenToken(char);
      eatCharacter();
      continue;
    }

    if (isNewLine(char)) {
      line++;
      eatCharacter();
      column = 0;
      continue;
    }

    if (WHITESPACE.test(char)) {
      eatCharacter();
      continue;
    }

    if (char === "$") {
      var _startColumn2 = column;
      eatCharacter();
      var value = "";

      while (idchar.test(char)) {
        value += char;
        eatCharacter();
      }

      var _endColumn2 = column;
      pushIdentifierToken(value, {
        startColumn: _startColumn2,
        endColumn: _endColumn2
      });
      continue;
    }

    if (NUMBERS.test(char) || NUMBER_KEYWORDS.test(lookahead(3, 0)) || char === "-" || char === "+") {
      var _startColumn3 = column;

      var _value = numberLiteralFSM.run(input.slice(current));

      if (_value === "") {
        throw new Error(getCodeFrame(input, line, column) + "Unexpected character " + JSON.stringify(char));
      }

      pushNumberToken(_value, {
        startColumn: _startColumn3
      });
      eatCharacter(_value.length);

      if (char && !PARENS.test(char) && !WHITESPACE.test(char)) {
        throw new Error(getCodeFrame(input, line, column) + "Unexpected character " + JSON.stringify(char));
      }

      continue;
    }

    if (char === '"') {
      var _startColumn4 = column;
      var _value2 = "";
      eatCharacter(); // "

      while (char !== '"') {
        if (isNewLine(char)) {
          throw new Error(getCodeFrame(input, line, column) + "Unexpected character " + JSON.stringify(char));
        }

        _value2 += char;
        eatCharacter(); // char
      }

      eatCharacter(); // "

      var _endColumn3 = column;
      pushStringToken(_value2, {
        startColumn: _startColumn4,
        endColumn: _endColumn3
      });
      continue;
    }

    if (LETTERS.test(char)) {
      var _value3 = "";
      var _startColumn5 = column;

      while (char && LETTERS.test(char)) {
        _value3 += char;
        eatCharacter();
      }
      /*
       * Handle MemberAccess
       */


      if (char === ".") {
        var dotStartColumn = column;

        if (valtypes.indexOf(_value3) !== -1) {
          pushValtypeToken(_value3, {
            startColumn: _startColumn5
          });
        } else {
          pushNameToken(_value3);
        }

        eatCharacter();
        _value3 = "";
        var nameStartColumn = column;

        while (LETTERS.test(char)) {
          _value3 += char;
          eatCharacter();
        }

        pushDotToken(".", {
          startColumn: dotStartColumn
        });
        pushNameToken(_value3, {
          startColumn: nameStartColumn
        });
        continue;
      }
      /*
       * Handle keywords
       */
      // $FlowIgnore


      if (typeof keywords[_value3] === "string") {
        pushKeywordToken(_value3, {
          startColumn: _startColumn5
        });
        continue;
      }
      /*
       * Handle types
       */


      if (valtypes.indexOf(_value3) !== -1) {
        pushValtypeToken(_value3, {
          startColumn: _startColumn5
        });
        continue;
      }
      /*
       * Handle literals
       */


      pushNameToken(_value3, {
        startColumn: _startColumn5
      });
      continue;
    }

    throw new Error(getCodeFrame(input, line, column) + "Unexpected character " + JSON.stringify(char));
  }

  return tokens;
}

var tokens = tokenTypes;
exports.tokens = tokens;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735385);
})()
//miniprogram-npm-outsideDeps=["@webassemblyjs/helper-code-frame","@webassemblyjs/ast","@xtuc/long","@webassemblyjs/floating-point-hex-parser","@webassemblyjs/helper-api-error","@webassemblyjs/helper-fsm"]
//# sourceMappingURL=index.js.map