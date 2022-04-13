<template>
  <view class="container">
    <view class="img">
      <image :src="data.img"></image>
    </view>
    <view class="title">基本信息</view>
    <view class="info">
      <view class="infobox">
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="wap-home-o" size="40rpx" id="icon"></van-icon>
            球场名称
          </view>
          <view class="iteminfo">{{ data.name }}</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="wap-home-o" size="40rpx" id="icon"></van-icon>
            联系方式
          </view>
          <view class="iteminfo">1647652643</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="wap-home-o" size="40rpx" id="icon"></van-icon>
            营业时间
          </view>
          <view class="iteminfo">10:00-22:00</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="wap-home-o" size="40rpx" id="icon"></van-icon>
            球场费用
          </view>
          <view class="iteminfo">￥{{ data.price }}</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="wap-home-o" size="40rpx" id="icon"></van-icon>
            球场评分
          </view>
          <view class="iteminfo">{{ data.scoreObj.score }}分</view>
        </view>
      </view>
    </view>
    <view class="title">注意事项</view>
    <view class="notice"></view>
    <view class="button">
      <van-button round type="info" plain @click="star">点我收藏</van-button>
      <van-button round type="info" plain @click="setScore"
        >点我评分</van-button
      >
    </view>
    <van-overlay :show="show">
      <view class="ratebox">
        <van-rate
          :value="value"
          :size="40"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
          @change="onChange"
          class="rate"
        />
      </view>
    </van-overlay>
  </view>
</template>

<script>
export default {
  name: "playgroundDetail",
  data() {
    return {
      id: "",
      data: {},
      show: false,
      value: 3,
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getplaygroundDetail();
  },
  methods: {
    getplaygroundDetail() {
      wx.cloud.callFunction({
        name: "getplaygroundDetail",
        data: {
          _id: this.id,
        },
        success: (res) => {
          this.data = res.result.data[0];
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    star() {
      wx.cloud.callFunction({});
    },
    setScore() {
      this.show = true;
    },
    onChange(event) {
      this.value = event.detail;
      wx.cloud.callFunction({
        name: "setScore",
        data: {
          openid: "111",
          _id: "78d8343762528bfb0003c2f92f09dbb6",
          score: event.detail,
        },
        success: (res) => {
          if (res.result.status === "200") {
            uni.showToast({
              title: "打分成功",
              duration: 2000,
            });
          } else {
            uni.showToast({
              title: "打分失败",
              duration: 2000,
            });
          }
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {
          this.show = false;
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  position: relative;
}
.img {
  width: 100%;
  height: 500rpx;
}
.img image {
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
.info {
  width: 640rpx;
  height: 600rpx;
  margin: 60rpx auto;
  border: 1px solid #eee;
  border-radius: 40rpx;
  box-shadow: 4rpx 8rpx 20rpx #888888;
}
.info .infobox {
  width: 560rpx;
  height: 520rpx;
  margin: 40rpx auto;
}
.infobox .infoitem {
  width: 100%;
  height: 104rpx;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.infoitem .itemtitle {
  color: #090909;
}
.infoitem .itemtitle #icon {
  margin-right: 8rpx;
  display: inline-block;
  vertical-align: top;
}
.infoitem .iteminfo {
  color: #afb2b1;
}
.button {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  background-color: #f4f4f4;
}
.notice {
  width: 560rpx;
  height: 80rpx;
  margin: 20rpx auto 160rpx;
  border-radius: 40rpx;
  box-shadow: 4rpx 8rpx 20rpx #888888;
}
.ratebox {
  width: 600rpx;
  height: 120rpx;
  background-color: #fff;
  border-radius: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

