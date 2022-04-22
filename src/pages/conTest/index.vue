<template>
  <div class="contest-view">
    <div class="banner">
      <image src="../../static/common/logo.png" mode="" />
    </div>
    <div class="contest">
      <div class="header">我的比赛</div>
      <div class="list" v-if="isLogin && JSON.stringify(list) != '[]'">
        <Contest class="item" v-for="item in list" :key="item" :item="item" />
      </div>
      <div v-if="!isLogin" class="noLogin">
        <div class="title">登录后才能查看您的比赛哦~</div>
        <button @click="login">点击登录</button>
      </div>
      <van-empty
        v-if="JSON.stringify(list) == '[]' && isLogin"
        description="暂无比赛，快去球场列表报名吧~"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Contest from "./Contest.vue";
import { userLogin } from "@/api/userLogin";
import { getUserContest } from "@/api/getUserContest";
export default {
  name: "contest-index",
  components: { Contest },
  data() {
    return {
      isLogin: false, //是否登录
      list: [],
    };
  },
  methods: {
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
        // 登录之后要获取比赛列表
        getUserContest().then((res) => {
          console.log("获取我的比赛列表：", res);
          this.list = res.result.data;
          // 更新isLogin
          this.isLogin = true;
        });
      });
    },
  },
  onShow() {
    // 根据Vue.prototype.userInformation即可知道其是否已经登录了
    if (JSON.stringify(Vue.prototype.userInformation) == "{}") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      // 登录成功了才获取活动列表
      getUserContest().then((res) => {
        console.log("获取我的比赛列表：", res);
        this.list = res.result.data;
      });
    }
  },
};
</script>

<style scoped>
.contest-view {
  width: 100%;
}
.banner {
  width: 100%;
  height: 400rpx;
  box-shadow: 0px 0px 20px 2px #666666;
}
.banner > image {
  width: 100%;
  height: 100%;
}
.contest {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.list > .item {
  width: 100%;
  display: flex;
  justify-content: center;
}
.noLogin {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.title {
  width: 100%;
  height: 300rpx;
  text-align: center;
  line-height: 300rpx;
  font-weight: 700;
  font-size: 40rpx;
}
.noLogin > button {
  background-color: #1989fa;
  color: #ffffff;
}
</style>