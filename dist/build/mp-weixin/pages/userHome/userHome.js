(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/userHome/userHome"],{

/***/ 48:
/*!************************************************************!*\
  !*** ./src/main.js?{"page":"pages%2FuserHome%2FuserHome"} ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));

var _userHome = _interopRequireDefault(__webpack_require__(/*! ./pages/userHome/userHome.vue */ 49));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_userHome.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/_@dcloudio_uni-mp-weixin@2.0.1-33920220314003@@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 49:
/*!*****************************************!*\
  !*** ./src/pages/userHome/userHome.vue ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userHome.vue?vue&type=template&id=5722c9c6&scoped=true& */ 50);
/* harmony import */ var _userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userHome.vue?vue&type=script&lang=js& */ 52);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _userHome_vue_vue_type_style_index_0_id_5722c9c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userHome.vue?vue&type=style&index=0&id=5722c9c6&scoped=true&lang=css& */ 55);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 12);

var renderjs





/* normalize component */

var component = Object(_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5722c9c6",
  null,
  false,
  _userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/userHome/userHome.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 50:
/*!************************************************************************************!*\
  !*** ./src/pages/userHome/userHome.vue?vue&type=template&id=5722c9c6&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_15_0_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--15-0!../../../node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/style.js!./userHome.vue?vue&type=template&id=5722c9c6&scoped=true& */ 51);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_15_0_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_15_0_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_15_0_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_15_0_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_template_id_5722c9c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 51:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--15-0!./node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/userHome/userHome.vue?vue&type=template&id=5722c9c6&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 52:
/*!******************************************************************!*\
  !*** ./src/pages/userHome/userHome.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_8_2_5_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/_babel-loader@8.2.5@babel-loader/lib!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/style.js!./userHome.vue?vue&type=script&lang=js& */ 53);
/* harmony import */ var _node_modules_babel_loader_8_2_5_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_8_2_5_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_8_2_5_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_8_2_5_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_8_2_5_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 53:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_babel-loader@8.2.5@babel-loader/lib!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/userHome/userHome.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));

var _getUserIntroduction = __webpack_require__(/*! @/api/getUserIntroduction */ 54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: "userHome",
  data: function data() {
    return {
      avatar: _vue.default.prototype.userInformation.avatarUrl,
      introduction: "",
      nickname: _vue.default.prototype.userInformation.nickName,
      credit: 0,
      show: false
    };
  },
  methods: {
    // 控制简介修改弹出
    showPopup: function showPopup() {
      this.show = true;
    },
    onClose: function onClose() {
      (0, _getUserIntroduction.getUserIntroduction)(this.introduction, true).then(function (res) {
        console.log(res.result);
      });
      this.show = false;
    },
    // 两个跳转按钮
    toAboutUs: function toAboutUs() {
      wx.navigateTo({
        url: 'navigatorPages/aboutUs'
      });
    },
    toStarGround: function toStarGround() {
      wx.navigateTo({
        url: 'navigatorPages/starGround'
      });
    }
  },
  //组件创建时获取credit和introduction
  created: function created() {
    var _this = this;

    (0, _getUserIntroduction.getUserIntroduction)('', false).then(function (res) {
      // 赋值
      _this.introduction = res.result.data[0].introduction == '' ? '这个人还没有个性签名' : res.result.data[0].introduction;
    });
  }
};
exports.default = _default;

/***/ }),

/***/ 55:
/*!**************************************************************************************************!*\
  !*** ./src/pages/userHome/userHome.vue?vue&type=style&index=0&id=5722c9c6&scoped=true&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_9_0_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_style_index_0_id_5722c9c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/_mini-css-extract-plugin@0.9.0@mini-css-extract-plugin/dist/loader.js??ref--7-oneOf-1-0!../../../node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-oneOf-1-2!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--7-oneOf-1-3!../../../node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/style.js!./userHome.vue?vue&type=style&index=0&id=5722c9c6&scoped=true&lang=css& */ 56);
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_9_0_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_style_index_0_id_5722c9c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_9_0_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_style_index_0_id_5722c9c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_0_9_0_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_style_index_0_id_5722c9c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_0_9_0_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_style_index_0_id_5722c9c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_0_9_0_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_2_0_1_33920220314003_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_2_0_1_33920220314003_dcloudio_webpack_uni_mp_loader_lib_style_js_userHome_vue_vue_type_style_index_0_id_5722c9c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 56:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_mini-css-extract-plugin@0.9.0@mini-css-extract-plugin/dist/loader.js??ref--7-oneOf-1-0!./node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-oneOf-1-2!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--7-oneOf-1-3!./node_modules/_@dcloudio_vue-cli-plugin-uni@2.0.1-33920220314003@@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/_@dcloudio_webpack-uni-mp-loader@2.0.1-33920220314003@@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/userHome/userHome.vue?vue&type=style&index=0&id=5722c9c6&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[48,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/userHome/userHome.js.map