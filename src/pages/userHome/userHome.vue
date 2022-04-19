<template>
  <view class="userBars">
<!--    用户头像-->
    <van-image
        class="avatar"
        round
        width="5rem"
        height="5rem"
        :src=avatar
    />

<!--    用户信息-->
    <div>{{ introduction }}</div>

    <van-cell-group class="userMsg">
      <van-cell title="用户名" :value=nickname @click="test"/>
      <van-cell title="信誉分" value="100"/>
      <van-cell title="收藏场地" @click="toStarGround"/>
      <van-cell title="关于我们" class="about" @click="toAboutUs"/>
    </van-cell-group>
  </view>


</template>

<script>
export default {
  name: "userHome",
  data (){
    return {
      avatar:"https://img.yzcdn.cn/vant/cat.jpeg",
      introduction:"123",
      nickname:"1"
    }
  },
  methods:{
    test(){
      wx.cloud.callFunction({
        name:'getUserInfo',
        data:{
          _id:"2c9907ee625e16a50072f06c31386cef"
        }
      }).then(res=>{
        let nickname = res.result.data.nickName
        console.log(res.result.data.nickName)
        return nickname
      })
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
.avatar {
  /*border: 1px solid skyblue;*/
}

.userMsg {
  position: relative;
  top: 5rem;
  text-align: left;
}

</style>