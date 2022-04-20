<template>
  <div class="detail-view">
       <div class="banner">
            <image src="../../static/common/logo.png" mode="" />
        </div>
        <div class="detail">
             <div class="header">基本信息</div>
             <div class="content">
                 <van-cell title="球场名称" icon="location-o" :value="item.name" />
                 <van-cell title="联系方式" icon="location-o" value="18790342103" />
                 <van-cell title="预约时间" icon="location-o" value="10：00~22：00" />
                 <van-cell title="人均消费" icon="location-o" :value="'￥'+item.price+'元'" />
                 <van-cell title="球场评分" icon="location-o" :value="scoreObj.score/scoreObj.people" />
             </div>
             <div class="persons">
                 <div class="header">参与人员</div>
                 <div class="person" v-for="person in item.person" :key="person">
                     <img src="../../static/logo.png" alt="">
                     <div class="name">xxxxx</div>
                 </div>
             </div>
        </div>
        <div class="footer">
            <van-button icon="star" type="primary" class="collect" @click="collect"></van-button>
            <van-button icon="plus" type="primary" class="join"></van-button>
        </div>
  </div>
</template>

<script>
export default {
    name:"detail",
    data(){
        return{
            item:{}
        }
    },
    methods:{
        collect(){
            wx.cloud.callFunction({
                name:"star",
                data:{
                    "_id":1
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    onLoad:function(option){
        const item =JSON.parse(option.item)
        this.item =item
    }

}
</script>

<style scoped>
.contest-view{
    width: 100%;
    height: 100%;
    position: relative;
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
.detail{
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
.content{
    width: 80%;
    border: 1px solid #666666;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
}
.persons{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 1px solid #666666;
    padding: 10px;
    border-radius: 10px;
    margin-top: 20px;
}
.person{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.person>img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 0 20px 0 40px;
}
.footer{
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.footer :nth-child(n){
    width: 60px;
    height: 60px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.collect{
    margin-left: 20px;
}
.join{
    margin-right: 20px;
}
</style>