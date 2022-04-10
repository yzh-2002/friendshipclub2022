<template>
  <view class="content">
    <van-rate
      :value="value"
      :size="25"
      color="#ffd21e"
      void-icon="star"
      void-color="#eee"
      @change="onChange"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
  methods: {
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
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
  },
};
</script>

<style scoped></style>
