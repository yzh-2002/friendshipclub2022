module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257736279, function(require, module, exports) {

const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
const sniffer_linux_1 = require("./sniffer-linux");
const sniffer_mac_1 = require("./sniffer-mac");
const sniffer_windows_1 = require("./sniffer-windows");
const lookupMap = {
    win32: sniffer_windows_1.default,
    darwin: sniffer_mac_1.default,
    linux: sniffer_linux_1.default,
};
let chromeArgs = ['--enable-devtools-experiments', '--no-first-run'];
function launch(url, options = {}) {
    setupUserProfileArg();
    return new Promise((resolve, reject) => {
        lookupForChromePath(options).then(chromeBinaryPath => {
            const chromeProcess = launchChrome(chromeBinaryPath, url, options);
            resolve(chromeProcess);
        }, err => {
            reject(err);
        });
    });
}
function lookupForChromePath(options) {
    return new Promise((resolve, reject) => {
        let chromePath = options.chromePath;
        if (chromePath) {
            try {
                chromePath = path.resolve(chromePath);
                fs.accessSync(chromePath);
                return resolve(chromePath);
            }
            catch (err) {
                return reject(err);
            }
        }
        else {
            const lookupMethod = lookupMap[process.platform];
            lookupMethod().then(value => {
                return resolve(value);
            });
        }
    });
}
function setupUserProfileArg() {
    chromeArgs = chromeArgs.concat([
        `--user-data-dir=${path.resolve(__dirname, '.devProfile')}`,
    ]);
}
function launchChrome(filePath, url, options) {
    let child;
    const argsUrl = chromeArgs.concat([url]);
    try {
        child = child_process_1.spawn(filePath, argsUrl);
    }
    catch (err) {
        onLaunchChromeError(err);
        return err;
    }
    child.on('error', onLaunchChromeError);
    child.on('exit', onChromeExit);
    return child;
    function onLaunchChromeError(err) {
        typeof options.onError === 'function' && options.onError(err);
    }
    function onChromeExit() {
        typeof options.onExit === 'function' && options.onExit();
    }
}
module.exports = { launch };

}, function(modId) {var map = {"./sniffer-linux":1650257736280,"./sniffer-mac":1650257736281,"./sniffer-windows":1650257736282}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257736280, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fileNameList = ['google-chrome', 'chromium-browser'];
function getChromePath() {
    return new Promise((resolve, reject) => {
        child_process_1.exec(`which ${fileNameList[0]}`, (err, stdout, stderr) => {
            if (!err) {
                const chromePath = stdout.replace(/\n/g, '');
                resolve(chromePath);
                return;
            }
            fileNameList.shift();
            if (!fileNameList[0]) {
                reject(err);
            }
            else {
                getChromePath().then(resolve, reject);
            }
        });
    });
}
function lookupChromeLinux() {
    return getChromePath();
}
exports.default = lookupChromeLinux;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257736281, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
function lookupChromeMac() {
    const bundles = ['com.google.Chrome.canary', 'com.google.Chrome'];
    function mdFind() {
        return new Promise((resolve, reject) => {
            child_process_1.exec(`mdfind 'kMDItemCFBundleIdentifier=${bundles[0]}'`, (err, stdout, stderr) => {
                const chromePath = stdout.trim();
                if (!err && fs.existsSync(chromePath)) {
                    resolve(path.join(chromePath, `/Contents/MacOS/${path.basename(chromePath, '.app')}`));
                }
                else {
                    bundles.shift();
                    if (bundles[0]) {
                        mdFind().then(resolve, reject);
                    }
                    else {
                        reject(err);
                    }
                }
            });
        });
    }
    return mdFind();
}
exports.default = lookupChromeMac;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257736282, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
function lookupChromeWindows() {
    return new Promise((resolve, reject) => {
        let chromePath = '';
        const chromeSysRegHKey = '"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\chrome.exe" /v path';
        child_process_1.exec(`REG QUERY ${chromeSysRegHKey}`, {}, (err, stdout) => {
            if (!err) {
                chromePath = downgradLookup();
                if (!chromePath) {
                    reject(err);
                    return;
                }
                else {
                    resolve(chromePath);
                    return;
                }
            }
            if (typeof stdout === 'string') {
                chromePath = parseChromePathFromRegOutput(stdout);
            }
            if (!chromePath) {
                reject(new Error(`无法解析Reg Query输出`));
                return;
            }
            resolve(chromePath);
        });
    });
}
exports.default = lookupChromeWindows;
function downgradLookup() {
    let chromePath = '';
    const suffix = '\\Google\\Chrome\\Application\\chrome.exe';
    const prefixes = [
        process.env.LOCALAPPDATA || '',
        process.env.PROGRAMFILES || '',
        process.env['PROGRAMFILES(X86)'] || '',
    ];
    for (const prefix of prefixes) {
        try {
            chromePath = path.join(prefix, suffix);
            fs.accessSync(chromePath);
            break;
        }
        catch (err) { }
    }
    return chromePath;
}
function parseChromePathFromRegOutput(stdout) {
    const lines = stdout.split('\n');
    let testPath = '', chromePath = '';
    lines.every(line => {
        const targLine = line.match(/path\s+reg_sz\s+(.+)/i);
        if (targLine) {
            testPath = targLine[1];
            return false;
        }
        return true;
    });
    try {
        testPath = path.resolve(testPath, 'chrome.exe');
        fs.accessSync(testPath);
        chromePath = testPath;
    }
    catch (err) { }
    return chromePath;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257736279);
})()
//miniprogram-npm-outsideDeps=["child_process","fs","path"]
//# sourceMappingURL=index.js.map