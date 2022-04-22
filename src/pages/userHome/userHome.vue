<template>
  <view class="userBars">
    <!--    用户头像-->
    <view class="basicInfo">
      <view class=".userAvatar">
        <view class="avatar">
          <van-image
            class="avatar"
            round
            width="180rpx"
            height="180rpx"
            :src="avatar"
          />
        </view>
        <view class="info">
          <view class="nickname" v-if="nickname">{{ nickname }}</view>
          <view class="nickname" v-else @click="login">点击登录</view>
          <view class="gender">性别: {{ gender === 0 ? "男" : "女" }}</view>
        </view>
      </view>
      <view class="intro">
        <view class="introd">简介: </view>
        <view class="introduction" v-if="introduction">{{ introduction }}</view>
      </view>
    </view>
    <view class="modifyintro">
      <view class="title">
        <van-icon name="comment-o" id="icon" />
        修改简介
      </view>
      <view class="detail" @click="showPopup">
        <van-icon name="arrow" />
      </view>
    </view>
    <view class="infodetail">
      <view class="infoitem">
        <view class="title">
          <van-icon name="user-circle-o" id="icon" />
          信誉分
        </view>
        <view class="detail">
          {{ credit }}
        </view>
      </view>
      <view class="infoitem">
        <view class="title">
          <van-icon name="star-o" id="icon" />
          收藏场地
        </view>
        <view class="detail" @click="toStarGround">
          <van-icon name="arrow" />
        </view>
      </view>
    </view>
    <view class="aboutus">
      <view class="title">
        <van-icon name="guide-o" id="icon" />
        关于我们
      </view>
      <view class="detail" @click="toAboutUs">
        <van-icon name="arrow" />
      </view>
    </view>
    <van-overlay :show="show" class="overlay">
      <view class="changeintro">
        <van-field
          label="个性签名："
          v-model="introduction"
          class="input"
          :maxlength="20"
        />
        <view class="btn">
          <van-button type="info" @click="reWrite" class="btn1"
            >确认修改</van-button
          >
          <van-button @click="show = false" class="btn2">取消修改</van-button>
        </view>
      </view>
    </van-overlay>
  </view>
</template>

<script>
import Vue from "vue";
import { getUserIntroduction } from "@/api/getUserIntroduction";
import { userLogin } from "@/api/userLogin";
export default {
  name: "userHome",
  data() {
    return {
      avatar: Vue.prototype.userInformation.avatarUrl,
      introduction: "",
      nickname: Vue.prototype.userInformation.nickName,
      credit: 0,
      show: false,
      gender: Vue.prototype.userInformation.gender,
    };
  },
  methods: {
    // 控制简介修改弹出
    showPopup() {
      this.show = true;
    },
    reWrite() {
      getUserIntroduction(this.introduction, true).then((res) => {
        this.introduction =
          this.introduction == "" ? "这个人还没有个性签名" : this.introduction;
        console.log("修改成功：", res);
        // 关闭
        this.show = false;
      });
    },
    // 两个跳转按钮
    toAboutUs() {
      wx.navigateTo({
        url: "navigatorPages/aboutUs",
      });
    },
    toStarGround() {
      wx.navigateTo({
        url: "navigatorPages/starGround",
      });
    },
    login() {
      userLogin().then((res) => {
        // 加入全局变量
        Vue.prototype.userInformation["nickName"] = res.result.data.nickName;
        Vue.prototype.userInformation["gender"] = res.result.data.gender;
        Vue.prototype.userInformation["avatarUrl"] = res.result.data.avatarUrl;
        Vue.prototype.userInformation["location"] = {
          longitude: res.result.data.location.longitude,
          latitude: res.result.data.location.latitude,
        };
      });
    },
  },
  //组件创建时获取credit和introduction
  created() {
    getUserIntroduction("", false).then((res) => {
      // 赋值
      this.credit = res.result.data[0].credit;
      this.introduction =
        res.result.data[0].introduction == ""
          ? "这个人还没有个性签名"
          : res.result.data[0].introduction;
    });
  },
  onShow() {
    // 每次都要更新
    getUserIntroduction("", false).then((res) => {
      // 赋值
      this.credit = res.result.data[0].credit;
      this.introduction =
        res.result.data[0].introduction == ""
          ? "这个人还没有个性签名"
          : res.result.data[0].introduction;
    });
  },
};
</script>

<style scoped>
.userBars {
  position: relative;
  background-color: #e3e3e3;
  height: 100%;
}
.basicInfo {
  height: 340rpx;
  background-color: #ffffff;
}
.basicInfo .userAvatar {
  display: flex;
}
.basicInfo .intro {
  margin: 10rpx 0 0 60rpx;
  display: flex;
  align-items: center;
  height: 100rpx;
  color: #6d6868;
}
.basicInfo .intro .introd {
  line-height: 100rpx;
}
.basicInfo .intro .introduction {
  margin-left: 10rpx;
  width: 500rpx;
  height: 100rpx;
  line-height: 100rpx;
}
.basicInfo .userAvatar .avatar {
  margin: 30rpx 20rpx 0;
}
.basicInfo .userAvatar .info {
  margin: 60rpx 10rpx 0;
}
.basicInfo .userAvatar .info .nickname {
  font-weight: 700;
  font-size: 40rpx;
}
.basicInfo .info .gender {
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #6d6868;
}
.modifyintro {
  width: 100%;
  height: 100rpx;
  background: #ffffff;
  display: flex;
  margin-top: 40rpx;
  align-items: center;
  justify-content: space-between;
}
.title {
  margin-left: 30rpx;
}
.title #icon {
  margin-right: 8rpx;
  display: inline-block;
  vertical-align: top;
}
.detail {
  margin-right: 40rpx;
  color: #6d6868;
}
.infodetail {
  width: 100%;
  margin-top: 40rpx;
}
.infodetail .infoitem {
  height: 100rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.aboutus {
  height: 100rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40rpx;
}
.changeintro {
  width: 600rpx;
  height: 200rpx;
  background-color: #fff;
  border-radius: 40rpx;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.changeintro .btn {
  display: flex;
  justify-content: space-around;
}
</style>

