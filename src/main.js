import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 全局对象
Vue.prototype.userInformation ={}

App.mpType = 'app'

const app = new Vue({
  ...App
})

wx.cloud.init({
  env: 'cloud1-8gc4g06jbe3d0c1f',  //环境
  traceUser: true, //是否在将用户访问记录到用户管理中，在控制台中可见
})
app.$mount()
