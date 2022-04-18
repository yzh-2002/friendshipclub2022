module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735395, function(require, module, exports) {

const adb_driver_1 = require("adb-driver");
class ADBCommander {
    async _commandFactory(command) {
        const cmdResult = await adb_driver_1.execADBCommand(command);
        const isError = cmdResult instanceof Error || (cmdResult.stack && cmdResult.message);
        if (isError) {
            return { err: cmdResult };
        }
        else {
            return { result: cmdResult };
        }
    }
    async deviceList() {
        const { result, err } = await this._commandFactory(`adb devices`);
        return {
            deviceList: _parseDeviceInfo(result),
            err,
        };
        function _parseDeviceInfo(stdout) {
            if (!stdout) {
                return [];
            }
            const lines = stdout.replace(/(\n|\r\n){1,}/g, '\n').split('\n');
            const result = lines
                .filter((item, idx) => {
                const oneDevice = item.split('\t');
                return idx !== 0 && oneDevice[1] === 'device';
            })
                .map(item => {
                return item.split('\t')[0];
            });
            return result;
        }
    }
    async reverse(deviceSN, localPort, remotePort) {
        const cmd = `adb -s ${deviceSN} reverse tcp:${remotePort} tcp:${localPort}`;
        return await this._commandFactory(cmd);
    }
    async forward(deviceSN, localPort, remotePort) {
        const cmd = `adb -s ${deviceSN} forward tcp:${localPort} tcp:${remotePort}`;
        return await this._commandFactory(cmd);
    }
    async version() {
        const { result, err } = await this._commandFactory(`adb version`);
        return { version: result, err };
    }
    async print(cmd) {
        const { err } = await this._commandFactory(cmd);
        if (err) {
            console.error(`### App Server ### print(): adb error: ${err.message}`);
        }
    }
    async uninstall(deviceSN, pkg) {
        const { result, err } = await this._commandFactory(`adb -s ${deviceSN} uninstall ${pkg}`);
        return { result, err };
    }
    async install(deviceSN, apkPath) {
        const { result, err } = await this._commandFactory(`adb -s ${deviceSN} install ${apkPath}`);
        return { result, err };
    }
    async isInstalled(deviceSN, pkg) {
        const { result, err } = await this._commandFactory(`adb -s ${deviceSN} shell pm path ${pkg}`);
        let isInstalled = false;
        if (result && result.indexOf('package:') > -1) {
            isInstalled = true;
        }
        return { isInstalled, err };
    }
    async startActivity(deviceSN, action, component, extra) {
        let commandArray = [];
        commandArray.push('adb', '-s', deviceSN, 'shell', 'am', 'start');
        if (action !== undefined) {
            commandArray.push('-a', action);
        }
        if (component !== undefined) {
            commandArray.push('-n', component);
        }
        function parseExtra(extra) {
            const typeMap = {
                string: '--es',
                null: '--esn',
                boolean: '--ez',
                int: '--ei',
                float: '--ef',
                uri: '--eu',
                component: '--ecn',
                'String[]': '--esa',
                'int[]': '--eia',
                'long[]': '--ela',
                'float[]': '--efa',
            };
            let extraCommands = [];
            extra.forEach(item => {
                if (item.type in typeMap) {
                    extraCommands.push(typeMap[item.type]);
                    extraCommands.push(item.key);
                    if (item.type.endsWith('[]')) {
                        extraCommands.push(item.value.join(','));
                    }
                    else {
                        extraCommands.push(item.value);
                    }
                }
            });
            return extraCommands;
        }
        if (extra) {
            commandArray.push(parseExtra(extra).join(' '));
        }
        const { result, err } = await this._commandFactory(commandArray.join(' '));
        return { result, err };
    }
    async exeCommand(command) {
        return await this._commandFactory(command);
    }
    async getProp(deviceSN) {
        const { result, err } = await this._commandFactory(`adb -s ${deviceSN} shell getprop ro.serialno`);
        return { result, err };
    }
}
const adbCommander = new ADBCommander();
module.exports = adbCommander;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735395);
})()
//miniprogram-npm-outsideDeps=["adb-driver"]
//# sourceMappingURL=index.js.map