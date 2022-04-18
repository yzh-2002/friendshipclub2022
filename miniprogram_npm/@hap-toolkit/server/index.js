module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735336, function(require, module, exports) {
var _sharedUtils=require("@hap-toolkit/shared-utils"),_config=_interopRequireDefault(require("./config")),_modules=_interopRequireDefault(require("./config/modules")),_server=require("./server");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}module.exports.launchServer=function(e){try{_sharedUtils.colorconsole.init(e.log),e.modules&&e.modules.length&&Object.assign(_config.default.options,{moduleList:e.modules}),Object.assign(_config.default.options,e),(0,_sharedUtils.setCustomConfig)(e.cwd,e.port),_modules.default.init(_config.default)}catch(e){return Promise.reject(e)}return(0,_server.launch)(_config.default,_modules.default)},module.exports.stopServer=function(){return(0,_server.stop)()};
//# sourceMappingURL=index.js.map

}, function(modId) {var map = {"./config":1650257735337,"./config/modules":1650257735338,"./server":1650257735339}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735337, function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _path=_interopRequireDefault(require("path"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const pathToolkit=_path.default.resolve(__dirname,"../../..");var _default={defaults:{pathToolkit:pathToolkit},options:{moduleList:[]}};exports.default=_default;
//# sourceMappingURL=index.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735338, function(require, module, exports) {
function init(e){const t=[{name:"debugger",path:require.resolve("@hap-toolkit/debugger/lib/router")},{name:"packager",path:require.resolve("@hap-toolkit/packager/lib/router")},{name:"preview",path:require.resolve("../preview/index.js")}],o=e.options.moduleList;t.filter(e=>!o.length||o.indexOf(e.name)>=0).forEach(e=>{const t={name:e.name,path:e.path,hash:require(e.path)};moduler.moduleList.push(t),moduler.moduleHash[t.name]=t})}function contains(e){return!!moduler.moduleHash[e]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const moduler={moduleList:[],moduleHash:{},init:init,contains:contains};var _default=moduler;exports.default=_default;
//# sourceMappingURL=modules.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257735339, function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0}),exports.launch=launch,exports.stop=stop;var _http=_interopRequireDefault(require("http")),_koa=_interopRequireDefault(require("koa")),_opn=_interopRequireDefault(require("opn")),_portfinder=_interopRequireDefault(require("portfinder")),_sharedUtils=require("@hap-toolkit/shared-utils"),_recordClient=require("@hap-toolkit/shared-utils/lib/record-client"),_config=_interopRequireDefault(require("@hap-toolkit/shared-utils/config"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}let server=null;async function launch(e,r){return new Promise(async o=>{try{const s=new _koa.default;let t=_config.default.server.port;t=await _portfinder.default.getPortPromise({port:t}),Object.assign(e.defaults,{serverPort:t}),s.context.conf=e;const{clearRecords:l,openBrowser:n}=e.options;if(l){const{clientRecordPath:e}=_config.default;(0,_recordClient.clearProjectRecord)(e)}for(let e=0,o=r.moduleList.length;e<o;e++){const o=r.moduleList[e];"function"==typeof o.hash.applyRouter&&s.use(o.hash.applyRouter(s).routes())}server=_http.default.Server(s.callback()),s.server=server;for(let e=0,o=r.moduleList.length;e<o;e++){const o=r.moduleList[e];"function"==typeof o.hash.beforeStart&&await o.hash.beforeStart(server,s)}server.listen(t,()=>{const e=`http://localhost:${t}`,r=(0,_sharedUtils.getIPv4IPAddress)();if(!r)return _sharedUtils.colorconsole.warn("### App Server ### 本机IP地址为空，无法通过WIFI调试"),void o({launchServerError:null,server:server,address:e,previewAddress:e+"/previewAddress"});const s=`http://${r}:${t}`;_sharedUtils.colorconsole.info(`### App Server ### 服务器地址: ${e}, ${s}`),_sharedUtils.colorconsole.info("### App Server ### 请确保手机与App Server处于相同网段"),(0,_sharedUtils.outputQRCodeOnTerminal)(s),n&&(0,_opn.default)(s),o({launchServerError:null,server:server,address:s,previewAddress:s+"/preview"})}),s.on("error",(e,r)=>{_sharedUtils.colorconsole.error(`### App Server ### 服务器错误: ${e.message}`);const s=`出错了!HTTP error code: ${e.status}, 出错信息: ${e.message}`;r&&(r.body=s),o({launchServerError:e,server:server})}),server.on("error",e=>{_sharedUtils.colorconsole.error(`### App Server ### 服务器错误: ${e.message}`),"EADDRINUSE"===e.code&&_sharedUtils.colorconsole.error(`### App Server ### 服务器错误:端口 ${t} 被占用, 请检查`),o({launchServerError:e,server:server})}),process.on("SIGINT",()=>{_sharedUtils.colorconsole.info("### App Server ### SIGINT信号"),_sharedUtils.colorconsole.info(`### App Server ### 退出server进程 pid: ${process.pid}`),process.exit()}),process.on("uncaughtException",e=>{_sharedUtils.colorconsole.error(`### App Server ### 未定义的异常, 出错信息: ${e.message}`),console.error(e)}),process.on("unhandledRejection",(e,r)=>{_sharedUtils.colorconsole.error(`### App Server ### 未处理的 rejection, 出错信息: ${e}`),r.catch(e=>{console.error(e)})})}catch(e){throw _sharedUtils.colorconsole.error(`### App Server ### 服务器启动失败: ${e.message}`),o({launchServerError:e,server:null}),e}})}function stop(){return new Promise(e=>{if(server)try{server.close(r=>{e({stopServerError:r})})}catch(r){throw _sharedUtils.colorconsole.error(`### App Server ### 服务器关闭失败: ${r.message}`),e({stopServerError:r}),r}else e({stopServerError:"no server"})})}
//# sourceMappingURL=server.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735336);
})()
//miniprogram-npm-outsideDeps=["@hap-toolkit/shared-utils","path","http","koa","opn","portfinder","@hap-toolkit/shared-utils/lib/record-client","@hap-toolkit/shared-utils/config"]
//# sourceMappingURL=index.js.map