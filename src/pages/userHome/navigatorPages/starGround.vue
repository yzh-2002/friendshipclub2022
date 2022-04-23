<template>
  <div class="contest-view">
    <div class="contest">
      <div class="header">我的收藏</div>
      <div class="list">
        <Contest class="item" v-for="item in list" :key="item" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Contest from "pages/conTest/Contest";
import { getStar } from "@/api/getStar";

export default {
  name: "contest-index",
  components: { Contest },
  data() {
    return {
      list: [],
    };
  },
  methods: {},
  created() {
    // 获取用户收藏列表
    getStar()
      .then((res) => {
        this.list = res.result;
        console.log(this.list);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.contest-view {
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
  margin-top: 40rpx;
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
  margin-top: 20px;
}
.list > .item {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>