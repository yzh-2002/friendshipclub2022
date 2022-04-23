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
            <van-icon name="clock-o" size="40rpx" id="icon"></van-icon>
            营业时间
          </view>
          <view class="iteminfo">10:00-22:00</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="gold-coin-o" size="40rpx" id="icon"></van-icon>
            球场费用
          </view>
          <view class="iteminfo">￥{{ data.price }}</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="star-o" size="40rpx" id="icon"></van-icon>
            球场评分
          </view>
          <view class="iteminfo">{{ score }}分</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="friends-o" size="40rpx" id="icon"></van-icon>
            评分人数
          </view>
          <view class="iteminfo">{{ data.scoreObj.people }}人</view>
        </view>
      </view>
    </view>
    <view class="title">注意事项</view>
    <view class="notice">{{ data.notice }}</view>
    <view class="button">
      <van-button round type="info" plain @click="star">{{
        collect
      }}</van-button>
      <van-button round type="info" plain @click="join" :disabled="disabled">{{
        state
      }}</van-button>
    </view>
    <van-overlay :show="show" class="overlay">
      <view class="time">
        <view class="picker">
          <van-datetime-picker
            v-model="startTime"
            type="time"
            title="选择起始时间"
            :min-hour="10"
            :max-hour="20"
            :item-height="36"
          />
          <van-datetime-picker
            class="endpicker"
            v-model="endTime"
            type="time"
            title="选择结束时间"
            :min-hour="10"
            :max-hour="20"
            :item-height="36"
          />
        </view>
        <view class="btn" @click="checkTime">预约比赛</view>
      </view>
    </van-overlay>
  </view>
</template>

<script>
import { joinContest } from "@/api/joinContest";
import { declare } from "../../../dist/build/mp-weixin/wxcomponents/dist/calendar/utils";
export default {
  name: "playgroundDetail",
  data() {
    return {
      id: "",
      data: {},
      disabled: false,
      flag: true, //标识该场地是否已被收藏
      show: false,
      startTime: "12:00",
      endTime: "12:00",
    };
  },
  onLoad(options) {
    this.id = options.id;
    console.log("该场地的id：", this.id);
    // 获取场地详情信息
    this.getplaygroundDetail();
    wx.cloud
      .callFunction({
        name: "getUserIntroduction",
        data: {
          flag: false,
          newValue: "",
        },
      })
      .then((res) => {
        // 检测场地id是否在用户收藏里
        if (res.result.data[0].star.indexOf(this.id) != -1) {
          // 说明在里面
          this.flag = false;
        } else {
          this.flag = true;
        }
      });
  },
  onShow(options) {
    this.id = options.id;
    // 获取场地详情信息
    this.getplaygroundDetail();
    // 需要更新flag，是否处于收藏状态
    // 这里可以借用getUserIntroduction函数获取用户信息
    wx.cloud
      .callFunction({
        name: "getUserIntroduction",
        data: {
          flag: false,
          newValue: "",
        },
      })
      .then((res) => {
        // 检测场地id是否在用户收藏里
        if (res.result.data[0].star.indexOf(this.id) != -1) {
          // 说明在里面
          this.flag = false;
        } else {
          this.flag = true;
        }
      });
  },
  computed: {
    score() {
      //将分数保留一位小数
      if (this.data.scoreObj) {
        return (this.data.scoreObj.score / this.data.scoreObj.people).toFixed(
          1
        );
      } else {
        return 5.0;
      }
    },
    state() {
      // 如果无人预约就空闲，有人预约查看人数看差几人
      if (this.data.person) {
        if (this.data.person.length) {
          // 有
          const rest = this.data.type.limit - this.data.person.length;
          return rest ? `加入比赛` : "人已满";
        } else {
          return "预约比赛";
        }
      } else {
        return "预约比赛";
      }
    },
    collect() {
      return this.flag ? "点击收藏" : "取消收藏";
    },
  },
  methods: {
    getplaygroundDetail() {
      wx.cloud.callFunction({
        name: "getplaygroundDetail",
        data: {
          _id: this.id,
        },
        success: (res) => {
          console.log("获取场地详情信息：", res);
          this.data = res.result.data[0];
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
    star() {
      const that = this;
      wx.cloud.callFunction({
        name: "star",
        data: {
          _id: this.id,
          f: this.flag,
        },
        success: (res) => {
          if (res.result.status === "200") {
            uni.showToast({
              title: `${res.result.msg}`,
              duration: 2000,
              success: () => {
                that.flag = !that.flag; //取反（表示此时已经收藏过了）
              },
              fail: (err) => {
                console.log(err);
              },
            });
          } else {
            uni.showToast({
              title: "已经收藏过啦",
              icon: "error",
              duration: 2000,
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: "收藏失败",
            icon: "error",
            duration: 2000,
          });
        },
      });
    },
    checkTime() {
      const start = this.startTime.detail;
      const end = this.endTime.detail;
      if (
        start.substr(0, 2) > end.substr(0, 2) ||
        (start.substr(0, 2) == end.substr(0, 2) &&
          start.substr(3, 2) > end.substr(3, 2))
      ) {
        uni.showToast({
          icon: "error",
          title: "预约时间不合理！",
        });
        this.show = false; //关闭
      } else if (
        start.substr(0, 2) == end.substr(0, 2) &&
        end.substr(3, 2) - start.substr(3, 2) < 30
      ) {
        uni.showToast({
          icon: "error",
          title: "预约时间过短!",
          duration: 2000,
        });
        this.show = false; //关闭
      } else if (end.substr(0, 2) - start.substr(0, 2) > 2) {
        uni.showToast({
          icon: "error",
          title: "预约时间过长!",
          duration: 2000,
        });
        this.show = false; //关闭
      } else {
        uni.showToast({
          icon: "success",
          title: "恭喜你预约成功！",
          duration: 2000,
        });
        // 加入比赛
        // 预约比赛成功之后才能加入比赛
        joinContest(this.id).then((res) => {
          if (res.result.status == 200) {
            uni.showToast({
              title: "预约比赛成功",
            });
            this.disabled = true;
            this.show = false;
          }
        });
      }
    },
    join() {
      if (this.state == "预约比赛") {
        this.show = true; //打开遮罩即可
      } else {
        // 加入比赛
        joinContest(this.id).then((res) => {
          if (res.result.status == 200) {
            uni.showToast({
              title: "加入比赛成功",
            });
            this.disabled = true;
          } else if (res.result.status == 201) {
            uni.showToast({
              title: "请勿重复加入",
            });
            this.disabled = false;
          }
        });
      }
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
  border: 2rpx solid #eee;
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
  border-bottom: 2rpx solid #eee;
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
  height: 120rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #f4f4f4;
}
.notice {
  width: 560rpx;
  height: 80rpx;
  margin: 20rpx auto 180rpx;
  border-radius: 40rpx;
  box-shadow: 4rpx 8rpx 20rpx #888888;
  text-align: center;
  line-height: 80rpx;
  color: #afb2b1;
}
.overlay {
  width: 100%;
}
.overlay .picker {
  height: 60%;
}
.btn {
  width: 200rpx;
  height: 60rpx;
  margin: 60rpx auto 0;
  border-radius: 10px;
  background-color: #1989fa;
  text-align: center;
  line-height: 60rpx;
  color: #fff;
}
</style>

