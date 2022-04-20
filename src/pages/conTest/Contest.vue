<template>
  <div class="contest-view">
      <div class="img">
        <image :src="item.img" />
      </div>
      <div class="detail">
        <div class="title">{{item.name}}</div>
        <div class="tips">
          <div class="type">{{item.type.sport}}</div>
          <div class="limit">限{{item.type.limit}}人</div>
        </div>
        <div class="time">
          预约时间：14：00~16：00
        </div>
        <div class="contest-detail">
            <button @click="navigateToDetail">场地详情</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"contest",
    props:['item'],
    methods:{
      navigateToDetail(){
        uni.navigateTo({
           url: '/pages/conTest/Detail?item='+JSON.stringify(this.item),
           success:()=>{
             console.log("已调用");
          },
          fail:(err)=>{
            console.log(err);
          }
        })
      }
    }
}
</script>

<style scoped>
.contest-view{
  width: 80%;
  height: 150px;
  border-radius: 10px;
  box-shadow:  0px 0px 10px 2px #666666;
  margin-bottom: 20px;
  display: flex;
}
.contest-view>.img{
  width: 45%;
  height: 100%;
}
.img>image{
  width: 100%;
  height: 100%;
  background-image: 100%;
}
.detail{
  width: 55%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.title{
  width: 100%;
  height: 30px;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  margin: 0 0 10px 5px;
}
.tips{
  display: flex;
  justify-content: flex-start;
  height: 25px;
  margin-bottom: 10px;
}
.tips :nth-child(n){
  width: 60px;
  height: 20px;
  margin: 0px 5px;
  background-color: #1989FA;
  border-radius: 5px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
}
.time{
  display: flex;
  flex-wrap: nowrap;
  font-size: 12px;
  margin-left: 5px;
}
.contest-detail{
  width: 100%;
  margin-top: 10px;
}
.contest-detail>button{
  width: 80%;
  height: 35px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1989FA;
  color: #FFFFFF;
}
</style>