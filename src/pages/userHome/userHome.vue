<template>
  <view class="userBars">
<!--    用户头像-->
    <view class="userAvatar">
    <van-image
        class="avatar"
        round
        width="5rem"
        height="5rem"
        :src=avatar
    />

<!--    用户信息-->
    <div>{{ introduction }}</div>
    </view>
    <van-cell-group class="userMsg">
      <van-cell title="修改简介" is-link @click="showPopup" />
      <van-popup show="{{ show }}" @close="onClose">
        <input type="text" v-model="introduction">
        <button @click="onClose">确认修改</button>
      </van-popup>
      <van-cell title="用户名" :value=nickname />
      <van-cell title="信誉分" :value=credit />
      <van-cell title="收藏场地" @click="toStarGround"/>
      <van-cell title="关于我们" class="about" @click="toAboutUs"/>
    </van-cell-group>

  </view>


</template>

<script>
import Vue from "vue";

export default {
  name: "userHome",
  data (){
    return {
      avatar:"https://img.yzcdn.cn/vant/cat.jpeg",
      introduction:"123",
      nickname:Vue.prototype.userInformation.nickName,
      credit:0,
      show: false
    }
  },
  methods:{
    // 控制简介修改弹出
    showPopup() {
      this.show = true
    },

    onClose() {
      this.show = false
    },
    //修改简历
    reWrite(){
      // this.introduction = '12'
    },
    // 两个跳转按钮
    toAboutUs(){
      wx.navigateTo({
        url:'navigatorPages/aboutUs'
      })
    },
    toStarGround(){
      wx.navigateTo({
        url:'navigatorPages/starGround'
      })
    },
  },

  //组件创建时获取credit和introduction
  created() {
      wx.cloud.callFunction({
        name:'getUserInfo',
        data:{
          _id: '5464a294625fed1e0189b16e708e2462'
        }
      }).then(res=>{
        console.log(res.result.data.credit)
        this.introduction = res.result.data.introduction
        this.credit = res.result.data.credit
      })
  }
}
</script>

<style scoped>
.userBars {
  text-align: center;
}

.userAvatar {
  height: 10rem;
  background-color: skyblue;
  border-top: 1rem solid skyblue;
}
.avatar {
  /*border: 1px solid skyblue;*/
}

.userMsg {
  position: relative;
  top: 3rem;
  text-align: left;
}

</style>