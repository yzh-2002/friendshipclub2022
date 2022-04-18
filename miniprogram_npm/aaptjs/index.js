module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735393, function(require, module, exports) {


require('shelljs/global');
const fs = require('fs');
const os = require('os');
const path = require('path');

const platform = os.platform();
const aapt = path.join(__dirname, 'bin', platform , 'aapt');

if (platform === 'linux') {
	fs.chmodSync(aapt, '777')	
}

function promistify(cmd, callback) {
	callback = callback || function () {};
	return new Promise((resolve, reject) => {
		exec(cmd, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	});
}

function list(apkfilePath, callback) {
	return promistify(`${aapt} l ${apkfilePath}`, callback);
}

function dump(what, apkfilePath, callback) {
	return promistify(`${aapt} d ${what} ${apkfilePath}`, callback);
}

function packageCmd(command, callback) {
	return promistify(`${aapt} p ${command}`, callback);
}

function remove(apkfilePath, files, callback) {
	if (!Array.isArray(files)) {
		files = [files]
	}
	const removeFiles = files.join(' ')
	return promistify(`${aapt} r ${apkfilePath} ${removeFiles}`, callback);
}

function add(apkfilePath, files, callback) {
	if (!Array.isArray(files)) {
		files = [files]
	}
	const addFiles = files.join(' ')
	return promistify(`${aapt} a ${apkfilePath} ${addFiles}`, callback);
}

function crunch(resource, outputFolder, callback) {
	if (!Array.isArray(resource)) {
		resource = [resource]
	}
	const resourceSources = resource.join(' ')
	return promistify(`${aapt} c -S ${resourceSources} -C ${outputFolder}`, callback);
}

function singleCrunch(inputFile, outputfile, callback) {
	return promistify(`${aapt} s -i ${inputFile} -o ${outputfile}`, callback);
}

function version(callback) {
	return promistify(`${aapt} v`, callback);
}

module.exports = {
	list: list,
	dump: dump,
	packageCmd: packageCmd,
	remove: remove,
	add: add,
	crunch: crunch,
	singleCrunch: singleCrunch,
	version: version
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735393);
})()
//miniprogram-npm-outsideDeps=["shelljs/global","fs","os","path"]
//# sourceMappingURL=index.js.map