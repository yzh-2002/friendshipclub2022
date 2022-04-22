<template>
  <view class="userBars">
<!--    用户头像-->
    <view class="userAvatar">
    <van-image
        class="avatar"
        round
        width="5rem"
        height="5rem"
        :src="avatar"
    />
      <div>
        {{nickname}}
      </div>
<!--    用户信息-->
    <div
        class="intro"
    >{{ introduction }}</div>

    </view>
    <van-cell-group class="userMsg">
      <van-cell title="修改简介" is-link @click="showPopup" />
      <van-popup :show="show" @close="onClose">
        <input type="text" v-model="introduction">
        <button @click="reWrite">确认修改</button>
      </van-popup>
      <van-cell title="用户名" :value="nickname" />
      <van-cell title="信誉分" :value="credit" />
      <van-cell title="收藏场地" @click="toStarGround"/>
      <van-cell title="关于我们" class="about" @click="toAboutUs"/>
    </van-cell-group>

  </view>


</template>

<script>
import Vue from "vue";
import {getUserIntroduction} from "@/api/getUserIntroduction"
export default {
  name: "userHome",
  data (){
    return {
      avatar:Vue.prototype.userInformation.avatarUrl,
      introduction:"",
      nickname:Vue.prototype.userInformation.nickName,
      credit:0,
      show: false
    }
  },
  methods:{
    // 控制简介修改弹出
    showPopup() {
      this.show = true
    },

    onClose() {
      this.show = false
    },
    // 两个跳转按钮
    toAboutUs(){
      wx.navigateTo({
        url:'navigatorPages/aboutUs'
      })
    },
    toStarGround(){
      wx.navigateTo({
        url:'navigatorPages/starGround'
      })
    },
  },

  //组件创建时获取credit和introduction
  created() {
      getUserIntroduction('',false)
      .then(res=>{
        // 赋值
        this.introduction =res.result.data[0].introduction=='' ? '这个人还没有个性签名':res.result.data[0].introduction
      })
  }
}
</script>

<style scoped>
.userBars {
  text-align: center;
}

.userAvatar {
  height: 10rem;
  background-color: #ffffff;
  border-top: 1rem solid #ffffff;
}
.userMsg {
  position: relative;
  top: 3rem;
  text-align: left;
}
/deep/ .van-cell-group .van-cell {
  background-color: #ffffff;
  margin-bottom: 0.7rem;
}
.userBars {
  background-color: #e3e3e3;
  height: 100%;
}
.about {
  margin-top: 0.7rem;
}
.intro {
  border:1px solid #e3e3e3;
  height: 3rem;
  margin: 0 1rem;
}
</style>