<script>
import {userLogin} from "@/api/userLogin"
import Vue from "vue"
export default {
  onLaunch: function () {
    console.log("App Launch");
    // 初始化Vue全局变量上的userInformation
    Vue.prototype.userInformation ={}
    // 获取用户个人信息+地理位置信息
    userLogin().then(res=>{
      console.log('获取个人信息：',res)
    })

  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
page {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
}
</style>
