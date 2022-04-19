<template>
  <view class="userBars">
<!--    用户头像-->
    <van-image
        class="avatar"
        round
        width="5rem"
        height="5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
    />

<!--    用户信息-->
    <van-grid  column-num="3">
      <van-grid-item icon="photo-o" text="用户名"/>
      <van-grid-item icon="photo-o" text="信誉分" />
      <van-grid-item icon="photo-o" text="还没想好" />
    </van-grid>
    <span>{{ introduction }}</span>
    <van-cell-group class="userMsg">
      <van-cell title="收藏场地"/>
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
      introduction:"123"
    }
  },
  methods:{
    toAboutUs(){
      wx.navigateTo({
        url:'navigatorPages/aboutUs'
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
  border: 1px solid red;
}

.userMsg {
  position: relative;
  top: 5rem;
}

</style>