module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735396, function(require, module, exports) {

const EventEmitter = require("events");
const util_1 = require("util");
const adbCommander = require("adb-commander");
const debugAdb = util_1.debuglog('adb');
class ADBDevicesEmitter extends EventEmitter {
    constructor() {
        super(...arguments);
        this._stopFlag = false;
        this._builtinEvents = ['deviceAdded', 'deviceRemoved'];
        this._snList = [];
    }
    addEventListener(eventType, listener) {
        debugAdb(`addEventListener(): start for ${eventType}`);
        const idx = this._builtinEvents.indexOf(eventType);
        if (idx >= 0) {
            this.on(eventType, listener);
        }
    }
    start() {
        debugAdb(`start(): start`);
        this._stopFlag = false;
        this._execPolling(async (resolve) => {
            debugAdb(`execPolling(): callback start`);
            const { deviceList, err } = await adbCommander.deviceList();
            debugAdb(`execPolling():\nfound deviceList: ${JSON.stringify(deviceList)},\n_snList: ${JSON.stringify(this._snList)}`);
            if (err) {
                console.error(`adb-commander: adb获取手机设备失败`, JSON.stringify(err));
                return resolve(true);
            }
            const deviceListState = this._detectDeviceListChange(deviceList);
            debugAdb(`execPolling():\nnewlyAdded devices: ${JSON.stringify(deviceListState.newlyAdded)}\nremoved devices: ${JSON.stringify(deviceListState.removed)}`);
            deviceListState.newlyAdded.forEach(sn => {
                this.emit('deviceAdded', { sn });
            });
            deviceListState.removed.forEach(sn => {
                this.emit('deviceRemoved', { sn });
            });
            debugAdb(`execPolling(): go to next polling`);
            return resolve(true);
        });
    }
    stop() {
        this._stopFlag = true;
    }
    _detectDeviceListChange(currentList) {
        const result = {
            newlyAdded: [],
            removed: [],
        };
        result.newlyAdded = currentList.filter(item => {
            return this._snList.indexOf(item) < 0;
        });
        result.removed = this._snList.filter(item => {
            return currentList.indexOf(item) < 0;
        });
        this._snList = currentList;
        return result;
    }
    _execPolling(callback) {
        const delay = 5e3;
        const polling = () => {
            new Promise((res, rej) => {
                debugAdb(`execPolling(): promise def start`);
                callback.apply(this, [res, rej]);
            })
                .then(next => {
                next &&
                    !this._stopFlag &&
                    setTimeout(() => {
                        debugAdb(`execPolling(): start polling again`);
                        polling();
                    }, delay);
            })
                .catch(err => {
                console.error(`adb-commander: 退出轮询: ${err.message}`);
            });
        };
        polling();
    }
}
const adbDevicesEmitter = new ADBDevicesEmitter();
module.exports = adbDevicesEmitter;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735396);
})()
//miniprogram-npm-outsideDeps=["events","util","adb-commander"]
//# sourceMappingURL=index.js.map