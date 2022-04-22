<template>
  <view class="detail-view">
    <view class="banner">
      <image :src="item.img" mode="" />
    </view>
    <view class="header">基本信息</view>
    <view class="info">
      <view class="infobox">
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="wap-home-o" size="40rpx" id="icon"></van-icon>
            球场名称
          </view>
          <view class="iteminfo">{{ item.name }}</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="clock-o" size="40rpx" id="icon"></van-icon>
            预约时间
          </view>
          <view class="iteminfo">10:00-22:00</view>
        </view>
        <view class="infoitem">
          <view class="itemtitle">
            <van-icon name="gold-coin-o" size="40rpx" id="icon"></van-icon>
            人均消费
          </view>
          <view class="iteminfo">￥{{ item.price }}</view>
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
          <view class="iteminfo">{{ item.scoreObj.people }}人</view>
        </view>
      </view>
    </view>
    <view class="header">参与人员</view>
    <view class="joinPeople">
      <view class="peoplebox">
        <view class="person" v-for="person in personList" :key="person">
         <view class="avatar">
            <image class="avatar" :src="person.avatarUrl">
         </view>
          <view class="name">{{person.nickName}}</view>
        </view>
      </view>
    </view>
    <view class="creditbtn">
      <van-button round type="info" plain @click="credit" class="credit"
      >点我打卡</van-button
      >
    </view>
    <view class="footer">
      <van-button round type="info" plain @click="star">{{
        collect
      }}</van-button>
      <van-button round type="info" plain @click="quit">退出比赛</van-button>
      <van-button round type="info" plain @click="complete"
        >结束比赛</van-button
      >
      <van-overlay :show="show">
        <view class="ratebox">
          <view class="rateboxtitle">请评分</view>
          <view class="rate">
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
        </view>
      </van-overlay>
    </view>
  </view>
</template>

<script>
import { getContestUser } from "@/api/getContestUser";
import { quitContest } from "@/api/quitContest";
import { setCreditScore } from "@/api/setCreditScore";
import { CalculateDistance } from "../../../utils/Applets/calculateDistance";
import { joinContest } from "@/api/joinContest";
export default {
  name: "detail",
  data() {
    return {
      item: {},
      personList: [],
      flag: true, //标识是否已经收藏
      value: 5,
      show: false,
    };
  },
  methods: {
    star() {
      const that = this;
      wx.cloud.callFunction({
        name: "star",
        data: {
          _id: this.item._id,
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
    quit() {
      // 退出比赛
      const that = this;
      uni.showModal({
        title: "警告",
        content: "中途退出会扣除信誉分",
        success: function (res) {
          if (res.confirm) {
            quitContest(that.item._id).then((res) => {
              // 更改信誉分
              setCreditScore(10, false).then((result) => {
                console.log("扣除信誉分：", result);
                // 跳转到我的比赛页
                uni.switchTab({
                  url: "/pages/conTest/index",
                  success: (res) => {
                    console.log("成功跳转：", res);
                  },
                  fail: (err) => {
                    console.log("跳转失败：", err);
                  },
                });
              });
            });
          } else {
            uni.showToast({
              title: "已取消",
              duration: 2000,
            });
          }
        },
      });
    },
    credit() {
      // 打卡功能（需要确定时间+地点是否合适）
      wx.cloud
        .callFunction({
          name: "credit",
          data: {
            id: this.item._id,
          },
        })
        .then((res) => {
          CalculateDistance([res.result.location]).then((res) => {
            const distance = res.result.elements[0].distance;
            if (distance >= 100) {
              uni.showModal({
                title: "打卡失败",
                content: `距离场地${distance}米，请前往场地打卡`,
              });
            } else {
              uni.showModal({
                title: "打开成功",
                content: `成功打开，尽情挥洒汗水吧！！`,
              });
            }
          });
          // console.log(res.result.location)
        });
    },
    complete() {
      // 退出比赛
      quitContest(this.item._id).then((res) => {
        // 然后打开打分系统
        this.show = true;
      });
    },
    onChange(event) {
      wx.cloud.callFunction({
        name: "setScore",
        data: {
          _id: this.item._id,
          score: event.detail,
        },
        success: (res) => {
          if (res.result.status === "200") {
            uni.showToast({
              title: "打分成功",
              duration: 2000,
              success: () => {
                //  跳转到首页
                uni.switchTab({
                  url: "/pages/conTest/index",
                });
              },
            });
          } else if (res.result.status === "400") {
            uni.showToast({
              title: "打分失败",
              icon: "error",
              duration: 2000,
            });
          } else {
            uni.showToast({
              title: "请先登录",
              icon: "error",
              duration: 2000,
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: "打分失败",
            icon: "error",
            duration: 2000,
          });
        },
        complete: () => {
          this.show = false;
        },
      });
    },
  },
  computed: {
    collect() {
      return this.flag ? "点击收藏" : "取消收藏";
    },
    score() {
      //将分数保留一位小数
      if (this.item.scoreObj) {
        return (this.item.scoreObj.score / this.item.scoreObj.people).toFixed(
          1
        );
      } else {
        return 5.0;
      }
    },
  },
  onLoad: function (option) {
    const item = JSON.parse(option.item); //接收跳转前的页面
    this.item = item;
    // 获取参与比赛的人员姓名
    getContestUser(item._id)
      .then((res) => {
        this.personList = res.result;
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (res.result.data[0].star.indexOf(this.item._id) != -1) {
          // 说明在里面
          this.flag = false;
        } else {
          this.flag = true;
        }
      });
  },
  onShow() {
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
        if (res.result.data[0].star.indexOf(this.item._id) != -1) {
          // 说明在里面
          this.flag = false;
        } else {
          this.flag = true;
        }
      });
  },
};
</script>

<style scoped>
.detail-view {
  width: 100%;
  height: 100%;
}
.banner {
  width: 100%;
  height: 500rpx;
  box-shadow: 0px 0px 20px 2px #666666;
}
.banner > image {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 60rpx;
  margin: 40rpx 0;
  text-align: center;
  line-height: 60rpx;
  font-size: 40rpx;
  font-weight: 700;
}
.header::after {
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
.infobox {
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
.joinPeople {
  width: 640rpx;
  margin: 60rpx auto;
  border: 2rpx solid #eee;
  border-radius: 40rpx;
  box-shadow: 4rpx 8rpx 20rpx #888888;
}
.peoplebox {
  width: 560rpx;
  margin: 40rpx auto;
}
.joinPeople .person {
  display: flex;
  width: 100%;
  height: 104rpx;
  align-items: center;
}
.person .name {
  margin-left: 30rpx;
  font-size: 40rpx;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.avatar image {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.creditbtn {
  margin: 10rpx auto 160rpx;
  height: 90rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
  width: 100%;
  height: 120rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #f4f4f4;
}
.ratebox {
  width: 600rpx;
  height: 200rpx;
  background-color: #fff;
  border-radius: 40rpx;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.rateboxtitle {
  margin: 30rpx auto 0;
  text-align: center;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 40rpx;
  font-weight: 700;
}
.rate {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>