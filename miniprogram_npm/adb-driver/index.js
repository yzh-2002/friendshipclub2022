module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735397, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
const which = require("which");
const base = path.resolve(__dirname, '..', 'bin');
exports.ADB_BINARY_FILE = {
    win32: path.resolve(base, 'window/adb.exe'),
    darwin: path.resolve(base, 'mac/adb'),
    linux: path.resolve(base, 'linux/adb'),
};
function isSystemAdbAvailable() {
    return !!which.sync('adb', { nothrow: true });
}
exports.isSystemAdbAvailable = isSystemAdbAvailable;
let systemAdbExist = isSystemAdbAvailable();
function execADBCommand(command, option) {
    let execCmd = command;
    if (!systemAdbExist) {
        let cmd = command.split(' ');
        const binFile = exports.ADB_BINARY_FILE[process.platform];
        cmd[0] = `"${binFile}"`;
        execCmd = cmd.join(' ');
    }
    return new Promise((resolve, reject) => {
        child_process_1.exec(execCmd, option || { stdio: 'inherit' }, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve(stdout);
        });
    }).catch(err => {
        return err;
    });
}
exports.execADBCommand = execADBCommand;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735397);
})()
//miniprogram-npm-outsideDeps=["path","child_process","which"]
//# sourceMappingURL=index.js.map