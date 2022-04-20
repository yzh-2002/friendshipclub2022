<template>
  <view class="container">
    <!-- 轮播图 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="5000"
      :duration="600"
      indicator-active-color="#1989fa"
    >
      <swiper-item class="swiper-item">
        <image src="../../static/img/1.png"></image>
      </swiper-item>
      <swiper-item class="swiper-item">
        <image src="../../static/img/2.png"></image>
      </swiper-item>
      <swiper-item class="swiper-item">
        <image src="../../static/img/3.png"></image>
      </swiper-item>
      <swiper-item class="swiper-item">
        <image src="../../static/img/4.png"></image>
      </swiper-item>
    </swiper>
    <view class="title">球场列表</view>
    <Playground
      v-for="item in playground"
      :key="item._id"
      :playground="item"
      @goDetail="goDetail"
    />
  </view>
</template>

<script>
import Playground from "../../components/playground/Playground";
export default {
  data() {
    return {
      playground: [],
    };
  },
  onLoad() {
    this.getPlayground();
  },
  methods: {
    getPlayground() {
      wx.cloud.callFunction({
        name: "getPlayground",
        success: (res) => {
          this.playground = res.result.data;
        },
        fail: (err) => {
          uni.showToast({
            title: "请求失败",
            icon: "error",
            duration: 2000,
          });
        },
      });
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/playgroundDetail/playgroundDetail?id=${id}`,
        // url:"/pages/playgroundDetail",
        success:()=>{
        console.log("success!!");
      },fail:(err)=>{
        console.log(err);
      }
      });
      console.log("点击成功");
    },
  },
  components: {
    Playground,
  },
};
</script>

<style>
.swiper {
  height: 150px;
}
.swiper-item image {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  height: 60rpx;
  margin: 40rpx 0;
  text-align: center;
  line-height: 60rpx;
  font-size: 40rpx;
  font-weight: 700;
}
.title::after {
  content: "";
  width: 120rpx;
  height: 4rpx;
  display: block;
  margin: 0 auto;
  border-bottom: 8rpx solid #1989fa;
}
</style>
