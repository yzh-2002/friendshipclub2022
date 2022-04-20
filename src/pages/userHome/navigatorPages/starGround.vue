<template>
  <div class="contest-view">
    <div class="contest">
      <div class="header">我的收藏</div>
      <div class="list">
        <Contest class="item" v-for='item in list' :key="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import Contest from "pages/conTest/Contest"
import Vue from "vue";

export default {
  name:"contest-index",
  components: { Contest },
  data(){
    return {
      list:["1",2,3,4]
    }
  },
  methods:{
    starList(){
      this.list.map((value)=>{
        for (let i =0;i<Vue.prototype.userInformation.star.length;i++){
          if (value.toString() === Vue.prototype.userInformation.star[i]){
            data.list.push(value);
          }
        }
      })
      this.list.splice(0,this.list.length);
    }
  }
}
</script>

<style scoped>
.contest-view{
  width: 100%;
  height: 100%;
}
.banner{
  width: 100%;
  height: 15%;
}
.banner>image{
  width: 100%;
  object-fit: cover;
  box-shadow: 0px 0px 20px 2px #666666;
}
.contest{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.header{
  width: 85px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 20px;
  color: black;
  font-weight: 700;
  padding-bottom: 15px;
  border-bottom: 2px solid blue;
}
.list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.list>.item{
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>