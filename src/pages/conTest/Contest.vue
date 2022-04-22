<template>
  <view class="container">
    <view class="leftimg">
      <image :src="item.img"></image>
    </view>
    <view class="info">
      <view class="name">{{ item.name }}</view>
      <van-tag round type="primary" class="sport">{{
        item.type.sport
      }}</van-tag>
      <van-tag round type="primary" class="limit"
        >限{{ item.type.limit }}人</van-tag
      >
      <view class="time">
        <text>营业时间: 10:00-22:00</text>
      </view>
      <van-button plain type="info" @click="navigateToDetail"
        >场地详情</van-button
      >
    </view>
  </view>
</template>

<script>
export default {
  name: "contest",
  props: ["item"],
  methods: {
    navigateToDetail() {
      uni.navigateTo({
        url: "/pages/conTest/Detail?item=" + JSON.stringify(this.item),
        success: () => {
          console.log("已调用");
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 700rpx;
  height: 300rpx;
  margin: 30rpx auto 40rpx;
  display: flex;
  border-radius: 60rpx;
  overflow: hidden;
  border: 2rpx solid #eee;
  box-shadow: 12rpx 12rpx 20rpx #888888;
}
.leftimg {
  flex: 1;
}
.leftimg image {
  width: 100%;
  height: 100%;
}
.info {
  flex: 1;
  margin-left: 40rpx;
}
.info .name {
  margin: 16rpx 0;
  font-size: 40rpx;
  font-weight: 700;
}
.info .limit,
.info .state {
  margin-left: 20rpx;
}
.info .time {
  margin: 16rpx 0 16rpx;
  font-size: 26rpx;
  color: gray;
}
.info .state {
  font-size: 26rpx;
  color: gray;
}
</style>