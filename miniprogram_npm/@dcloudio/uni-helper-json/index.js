module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257735220, function(require, module, exports) {
module.exports = {
    "block": {
        "description": "block节点"
    },
    "view": {
        "description": "基本视图容器",
        "attributes": [
            "hover-class",
            "hover-stop-propagation",
            "hover-start-time",
            "hover-stay-time"
        ]
    },
    "scroll-view": {
        "description": "可滚动视图区域",
        "attributes": [
            "scroll-x",
            "scroll-y",
            "upper-threshold",
            "lower-threshold",
            "scroll-top",
            "scroll-left",
            "scroll-into-view",
            "scroll-with-animation",
            "enable-back-to-top",
            "scroll-x",
            "scroll-x"
        ]
    },
    "match-media": {
        "description": "media query 匹配检测节点",
        "attributes": [
            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height",
            "orientation"
        ]
    },
    "swiper": {
        "description": "滑块视图容器",
        "attributes": [
            "indicator-dots",
            "indicator-color",
            "indicator-active-color",
            "active-class",
            "changing-class",
            "acceleration",
            "disable-programmatic-animation",
            "disable-touch",
            "touchable",
            "easing-function",
            "autoplay",
            "current",
            "current-item-id",
            "interval",
            "duration",
            "circular",
            "vertical",
            "previous-margin",
            "next-margin",
            "display-multiple-items",
            "skip-hidden-item-layout"
        ]
    },
    "swiper-item": {
        "description": "仅可放置在 swiper 组件中，宽高自动设置为100%",
        "attributes": [
            "item-id"
        ]
    },
    "movable-view": {
        "description": "可移动的视图容器，在页面中可以拖拽滑动",
        "attributes": [
            "direction",
            "inertia",
            "out-of-bounds",
            "x",
            "y",
            "damping",
            "friction",
            "disabled",
            "scale",
            "scale-min",
            "scale-max",
            "scale-value",
            "animation"
        ]
    },
    "movable-area": {
        "description": "movable-view 的可移动区域",
        "attributes": []
    },
    "text": {
        "description": "文本",
        "attributes": [
            "selectable",
            "space",
            "decode"
        ]
    },
    "rich-text": {
        "description": "富文本",
        "attributes": [
            "nodes"
        ]
    },
    "progress": {
        "description": "进度条",
        "attributes": [
            "percent",
            "show-info",
            "stroke-width",
            "color",
            "activeColor",
            "backgroundColor",
            "active",
            "active-mode"
        ]
    },
    "button": {
        "description": "按钮",
        "attributes": [
            "disabled",
            "hover-class",
            "hover-stop-propagation",
            "hover-start-time",
            "hover-stay-time",
            "size",
            "type",
            "plain",
            "loading",
            "form-type",
            "open-type",
            "lang",
            "session-from",
            "send-message-title",
            "send-message-path",
            "send-message-img",
            "show-message-card",
            "app-parameter"
        ]
    },
    "checkbox-group": {
        "description": "多项选择器，内部由多个checkbox组成",
        "attributes": []
    },
    "checkbox": {
        "description": "多选项目",
        "attributes": [
            "disabled",
            "value",
            "checked",
            "color"
        ]
    },
    "form": {
        "description": "表单",
        "attributes": [
            "disabled",
            "report-submit"
        ]
    },
    "input": {
        "description": "输入框",
        "attributes": [
            "disabled",
            "value",
            "type",
            "password",
            "placeholder",
            "placeholder-style",
            "placeholder-class",
            "maxlength",
            "cursor-spacing",
            "auto-focus",
            "focus",
            "confirm-type",
            "confirm-hold",
            "cursor",
            "selection-start",
            "selection-end",
            "adjust-position"
        ]
    },
    "label": {
        "description": "用来改进表单组件的可用性，使用for属性找到对应的id，或者将控件放在该标签下，当点击时，就会触发对应的控件",
        "attributes": [
            "disabled",
            "for"
        ]
    },
    "picker": {
        "description": "从底部弹起的滚动选择器，现支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。",
        "attributes": [
            "disabled",
            "mode",
            "range",
            "range-key",
            "value",
            "start",
            "end",
            "fields",
            "custom-item"
        ]
    },
    "picker-view": {
        "description": "嵌入页面的滚动选择器",
        "attributes": [
            "disabled",
            "value",
            "indicator-style",
            "indicator-class",
            "mask-style",
            "mask-class"
        ]
    },
    "radio-group": {
        "description": "单项选择器，内部由多个 radio 组成",
        "attributes": [
            "disabled"
        ]
    },
    "radio": {
        "description": "单选项目",
        "attributes": [
            "disabled",
            "value",
            "checked",
            "color"
        ]
    },
    "slider": {
        "description": "滑动选择器",
        "attributes": [
            "disabled",
            "min",
            "max",
            "step",
            "value",
            "color",
            "select-color",
            "activeColor",
            "backgroundColor",
            "block-size",
            "block-color",
            "show-value"
        ]
    },
    "switch": {
        "description": "开关选择器",
        "attributes": [
            "checked",
            "type",
            "color",
            "disabled"
        ]
    },
    "textarea": {
        "description": "多行输入框",
        "attributes": [
            "display",
            "value",
            "placeholder",
            "placeholder-style",
            "placeholder-class",
            "maxlength",
            "auto-focus",
            "focus",
            "cursor",
            "confirm-type",
            "auto-height",
            "fixed",
            "cursor-spacing",
            "show-confirm-bar",
            "selection-start",
            "selection-end",
            "adjust-position"
        ]
    },
    "navigator": {
        "description": "页面链接",
        "attributes": [
            "target",
            "url",
            "open-type",
            "delta",
            "app-id",
            "path",
            "extra-data",
            "version",
            "animation-type",
            "animation-duration",
            "hover-class",
            "hover-stop-propagation",
            "hover-start-time",
            "hover-stay-time"
        ]
    },
    "audio": {
        "description": "音频",
        "attributes": [
            "loop",
            "src",
            "controls",
            "poster",
            "name",
            "author"
        ]
    },
    "image": {
        "description": "图片",
        "attributes": [
            "loop",
            "src",
            "mode",
            "lazy-load",
            "fade-show",
            "webp",
            "show-menu-by-longpress"
        ]
    },
    "video": {
        "description": "视频",
        "attributes": [
            "loop",
            "src",
            "initial-time",
            "duration",
            "controls",
            "danmu-list",
            "danmu-btn",
            "enable-danmu",
            "autoplay",
            "muted",
            "page-gesture",
            "direction",
            "show-progress",
            "show-fullscreen-btn",
            "show-play-btn",
            "show-center-play-btn",
            "enable-progress-gesture",
            "objectFit",
            "poster",
            "show-mute-btn",
            "title",
            "play-btn-position",
            "enable-play-gesture",
            "auto-pause-if-navigate",
            "auto-pause-if-open-native",
            "vslide-gesture",
            "vslide-gesture-in-fullscreen",
            "ad-unit-id",
            "poster-for-crawler",
            "codec",
            "http-cache",
            "play-strategy"
        ]
    },
    "map": {
        "description": "地图",
        "attributes": [
            "longitude",
            "latitude",
            "scale",
            "markers",
            "covers",
            "polyline",
            "circles",
            "controls",
            "include-points",
            "show-location"
        ]
    },
    "canvas": {
        "description": "画布",
        "attributes": [
            "canvas-id",
            "disable-scroll"
        ]
    },
    "web-view": {
        "description": "承载网页的容器",
        "attributes": [
            "src",
            "webview-styles"
        ]
    },
    "cover-view": {
        "description": "覆盖在原生组件之上的文本视图，可覆盖的原生组件包括map、video、canvas、camera，只支持嵌套cover-view、cover-image",
        "attributes": []
    },
    "cover-image": {
        "description": "覆盖在原生组件之上的图片视图，可覆盖的原生组件同cover-view，支持嵌套在cover-view里。",
        "attributes": [
            "v-for",
            "v-if",
            "v-show",
            "src"
        ]
    },
    "icon": {
        "description": "图标",
        "attributes": [
            "type",
            "size",
            "color"
        ]
    },
    "picker-view-column": {
        "description": "仅可放置于 picker-view 中，其孩子节点的高度会自动设置成与picker-view的选中框的高度一致",
        "attributes": [
            "disabled"
        ]
    },
    "camera": {
        "description": "相机组件",
        "attributes": [
            "flash",
            "device-position"
        ]
    },
    "live-player": {
        "description": "实时音视频播放",
        "attributes": [
            "src",
            "mode",
            "autoplay",
            "muted",
            "orientation",
            "object-fit",
            "background-mute",
            "min-cache",
            "max-cache"
        ]
    },
    "live-pusher": {
        "description": "实时音视频录制",
        "attributes": [
            "url",
            "mode",
            "autopush",
            "muted",
            "enable-camera",
            "auto-focus",
            "orientation",
            "beauty",
            "aspect",
            "min-bitrate",
            "max-bitrate",
            "waiting-image",
            "waiting-image-md5",
            "background-mute"
        ]
    },
    "open-data": {
        "description": "用于展示微信开放的数据",
        "attributes": [
            "type",
            "open-gid",
            "lang"
        ]
    },
    "ad": {
        "description": "广告",
        "attributes": [
            "adpid"
        ]
    },
    "ad-draw": {
        "description": "Draw 信息流广告",
        "attributes": [
            "adpid"
        ]
    },
    "navigation-bar": {
        "description": "页面导航条配置节点",
        "attributes": [
            "title",
            "title-icon",
            "titleIcon-radius",
            "subtitle-text",
            "subtitle-size",
            "subtitle-color",
            "subtitle-overflow",
            "title-align",
            "background-image",
            "background-repeat",
            "blur-effect",
            "loading",
            "front-color",
            "background-color",
            "color-animation-duration",
            "color-animation-timing-func"
        ]
    },
    "custom-tab-bar": {
        "description": "自定义tabBar",
        "attributes": [
            "direction",
            "show-icon",
            "selected"
        ]
    },
    "page-meta": {
        "description": "自定义tabBar",
        "attributes": [
            "background-text-style",
            "background-color",
            "background-color-top",
            "background-color-bottom",
            "scroll-top",
            "scroll-duration",
            "page-style",
            "root-font-size",
            "enable-pull-down-refresh"
        ]
    },
    "editor": {
        "description": "富文本编辑器，可以对图片、文字进行编辑。",
        "attributes": [
            "read-only",
            "placeholder",
            "show-img-size",
            "show-img-toolbar",
            "show-img-resize"
        ]
    },
    "unicloud-db": {
        "description": "是一个数据库查询组件，它是对uni-clientdb的js库的再封装。",
        "attributes": [
            "collection",
            "field",
            "where",
            "action",
            "orderby",
            "groupby",
            "group-field",
            "distinct",
            "page-data",
            "page-current",
            "page-size",
            "getone",
            "getcount",
            "gettree",
            "startwith",
            "limitlevel",
            "manual"
        ]
    }
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257735220);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map