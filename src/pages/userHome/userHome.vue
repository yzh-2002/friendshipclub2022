<template>
  <view class="userBars">
<!--    用户头像-->
    <view class="userAvatar">
    <van-image
        class="avatar"
        round
        width="5rem"
        height="5rem"
        :src=avatar
    />

<!--    用户信息-->
    <div>{{ introduction }}</div>
    </view>
    <van-cell-group class="userMsg">
      <van-cell title="用户名" :value=nickname @click="test"/>
      <van-cell title="信誉分" :value=credit />
      <van-cell title="收藏场地" @click="toStarGround"/>
      <van-cell title="关于我们" class="about" @click="toAboutUs"/>
    </van-cell-group>
  </view>


</template>

<script>
import Vue from "vue";
export default {
  name: "userHome",
  data (){
    return {
      avatar:"https://img.yzcdn.cn/vant/cat.jpeg",
      introduction:"123",
      nickname:Vue.prototype.userInformation.nickName,
      credit:Vue.prototype.userInformation.credit
    }
  },
  methods:{
    test(){
      console.log(this.introduction)
    },
    toAboutUs(){
      wx.navigateTo({
        url:'navigatorPages/aboutUs'
      })
    },
    toStarGround(){
      wx.navigateTo({
        url:'navigatorPages/starGround'
      })
    }
  }
}
</script>

<style scoped>
.userBars {
  text-align: center;
}

.userAvatar {
  height: 10rem;
  background-color: skyblue;
  border-top: 1rem solid skyblue;
}
.avatar {
  /*border: 1px solid skyblue;*/
}

.userMsg {
  position: relative;
  top: 5rem;
  text-align: left;
}

</style>