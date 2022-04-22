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
    <view class="changetype">
      <van-tabs type="card" color="#1989fa" @change="changeType">
        <van-tab title="全部"></van-tab>
        <van-tab title="篮球"></van-tab>
        <van-tab title="足球"></van-tab>
        <van-tab title="羽毛球"></van-tab>
        <van-tab title="乒乓球"></van-tab>
      </van-tabs>
    </view>
    <view class="title">球场列表</view>
    <Playground
      v-for="item in playground"
      :key="item._id"
      :playground="item"
      @goDetail="goDetail"
      v-show="type === '全部' || type === item.type.sport"
    />
    <view class="empty" v-show="showEmpty">
      <van-empty description="这里空空如也" />
    </view>
  </view>
</template>

<script>
import Playground from "../../components/playground/Playground";
export default {
  data() {
    return {
      playground: [],
      type: "全部",
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
        success: () => {
          console.log("success!!");
        },
        fail: (err) => {
          console.log(err);
        },
      });
      console.log("点击成功");
    },
    changeType(type) {
      this.type = type.detail.title;
    },
  },
  computed: {
    showEmpty() {
      return (
        this.playground.every((item) => item.type.sport !== this.type) &&
        this.type !== "全部"
      );
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
.changetype {
  width: 700rpx;
  height: 60rpx;
  margin: 60rpx auto 20rpx;
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
.empty {
  width: 600rpx;
  height: 568rpx;
  margin: 20rpx auto;
}
</style>
