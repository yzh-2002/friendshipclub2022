module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735361, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTransition = makeTransition;
exports.FSM = void 0;

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var STOP = Symbol("STOP");

function makeTransition(regex, nextState) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$n = _ref.n,
      n = _ref$n === void 0 ? 1 : _ref$n,
      allowedSeparator = _ref.allowedSeparator;

  return function (instance) {
    if (allowedSeparator) {
      if (instance.input[instance.ptr] === allowedSeparator) {
        if (regex.test(instance.input.substring(instance.ptr - 1, instance.ptr))) {
          // Consume the separator and stay in current state
          return [instance.currentState, 1];
        } else {
          return [instance.terminatingState, 0];
        }
      }
    }

    if (regex.test(instance.input.substring(instance.ptr, instance.ptr + n))) {
      return [nextState, n];
    }

    return false;
  };
}

function combineTransitions(transitions) {
  return function () {
    var match = false;
    var currentTransitions = transitions[this.currentState] || [];

    for (var i = 0; i < currentTransitions.length; ++i) {
      match = currentTransitions[i](this);

      if (match !== false) {
        break;
      }
    }

    return match || [this.terminatingState, 0];
  };
}

var FSM =
/*#__PURE__*/
function () {
  function FSM(transitions, initialState) {
    var terminatingState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : STOP;

    _classCallCheck(this, FSM);

    this.initialState = initialState;
    this.terminatingState = terminatingState;

    if (terminatingState === STOP || !transitions[terminatingState]) {
      transitions[terminatingState] = [];
    }

    this.transitionFunction = combineTransitions.call(this, transitions);
  }

  _createClass(FSM, [{
    key: "run",
    value: function run(input) {
      this.input = input;
      this.ptr = 0;
      this.currentState = this.initialState;
      var value = "";
      var eatLength, nextState;

      while (this.currentState !== this.terminatingState && this.ptr < this.input.length) {
        var _transitionFunction = this.transitionFunction();

        var _transitionFunction2 = _slicedToArray(_transitionFunction, 2);

        nextState = _transitionFunction2[0];
        eatLength = _transitionFunction2[1];
        value += this.input.substring(this.ptr, this.ptr += eatLength);
        this.currentState = nextState;
      }

      return value;
    }
  }]);

  return FSM;
}();

exports.FSM = FSM;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735361);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map