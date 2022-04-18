module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737618, function(require, module, exports) {
let tty = require("tty")

let isColorSupported =
	!("NO_COLOR" in process.env || process.argv.includes("--no-color")) &&
	("FORCE_COLOR" in process.env ||
		process.argv.includes("--color") ||
		process.platform === "win32" ||
		(tty.isatty(1) && process.env.TERM !== "dumb") ||
		"CI" in process.env)

function formatter(open, close, replace = open) {
	return (input) => {
		let string = "" + input
		let index = string.indexOf(close, open.length)
		return !~index
			? open + string + close
			: open + replaceClose(string, close, replace, index) + close
	}
}

function replaceClose(string, close, replace, index) {
	let start = string.substring(0, index) + replace
	let end = string.substring(index + close.length)
	let nextIndex = end.indexOf(close)
	return !~nextIndex ? start + end : start + replaceClose(end, close, replace, nextIndex)
}

function createColors(enabled = isColorSupported) {
	return {
		isColorSupported: enabled,
		reset: enabled ? (s) => `\x1b[0m${s}\x1b[0m` : String,
		bold: enabled ? formatter("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m") : String,
		dim: enabled ? formatter("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m") : String,
		italic: enabled ? formatter("\x1b[3m", "\x1b[23m") : String,
		underline: enabled ? formatter("\x1b[4m", "\x1b[24m") : String,
		inverse: enabled ? formatter("\x1b[7m", "\x1b[27m") : String,
		hidden: enabled ? formatter("\x1b[8m", "\x1b[28m") : String,
		strikethrough: enabled ? formatter("\x1b[9m", "\x1b[29m") : String,
		black: enabled ? formatter("\x1b[30m", "\x1b[39m") : String,
		red: enabled ? formatter("\x1b[31m", "\x1b[39m") : String,
		green: enabled ? formatter("\x1b[32m", "\x1b[39m") : String,
		yellow: enabled ? formatter("\x1b[33m", "\x1b[39m") : String,
		blue: enabled ? formatter("\x1b[34m", "\x1b[39m") : String,
		magenta: enabled ? formatter("\x1b[35m", "\x1b[39m") : String,
		cyan: enabled ? formatter("\x1b[36m", "\x1b[39m") : String,
		white: enabled ? formatter("\x1b[37m", "\x1b[39m") : String,
		gray: enabled ? formatter("\x1b[90m", "\x1b[39m") : String,
		bgBlack: enabled ? formatter("\x1b[40m", "\x1b[49m") : String,
		bgRed: enabled ? formatter("\x1b[41m", "\x1b[49m") : String,
		bgGreen: enabled ? formatter("\x1b[42m", "\x1b[49m") : String,
		bgYellow: enabled ? formatter("\x1b[43m", "\x1b[49m") : String,
		bgBlue: enabled ? formatter("\x1b[44m", "\x1b[49m") : String,
		bgMagenta: enabled ? formatter("\x1b[45m", "\x1b[49m") : String,
		bgCyan: enabled ? formatter("\x1b[46m", "\x1b[49m") : String,
		bgWhite: enabled ? formatter("\x1b[47m", "\x1b[49m") : String,
	}
}

module.exports = createColors()
module.exports.createColors = createColors

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737618);
})()
//miniprogram-npm-outsideDeps=["tty"]
//# sourceMappingURL=index.js.map