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
      <van-overlay :show="show" class="overlay">
        <van-field label="个性签名：" v-model="introduction" class="input" />
        <van-button @click="reWrite" class="btn1">确认修改</van-button>
        <van-button @click="show=false" class="btn2">取消修改</van-button>
      </van-overlay>
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
    reWrite(){
      getUserIntroduction(this.introduction,true)
      .then(res=>{
        this.introduction =this.introduction=='' ? '这个人还没有个性签名':this.introduction
        console.log("修改成功：",res)
        // 关闭
        this.show =false
      })
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
        this.credit =res.result.data[0].credit
        this.introduction =res.result.data[0].introduction=='' ? '这个人还没有个性签名':res.result.data[0].introduction
      })
  },
  onShow(){
    // 每次都要更新
    getUserIntroduction('',false)
      .then(res=>{
        // 赋值
        this.credit =res.result.data[0].credit
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.intro::after{
  content: '个人简介';
  display: block;
  position: absolute;
  top: -50%;
  transform: translateY(50%);
  left: 20px;
  background-color: #FFFFFF;
}
.overlay .input{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
.overlay .btn1{
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%,50%);
}
.overlay .btn2{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(50%,50%);
}
</style>
<style>
.userBars .van-cell-group .van-cell {
  background-color: #ffffff !important;
  margin-bottom: 0.7rem !important;
}
</style>