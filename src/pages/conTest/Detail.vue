<template>
  <div class="detail-view">
       <div class="banner">
            <image src="../../static/common/logo.png" mode="" />
        </div>
        <div class="detail">
             <div class="header">基本信息</div>
             <div class="content">
                 <van-cell title="球场名称" icon="location-o" :value="item.name" />
                 <van-cell title="预约时间" icon="location-o" value="10：00~22：00" />
                 <van-cell title="人均消费" icon="location-o" :value="'￥'+item.price+'元'" />
                 <van-cell title="球场评分" icon="location-o" :value="scoreObj.score/scoreObj.people" />
             </div>
             <div class="persons">
                 <div class="header">参与人员</div>
                 <div class="person" v-for="person in personList" :key="person">
                     <img :src="person.avatarUrl" alt="">
                     <div class="name">{{person.nickName}}</div>
                 </div>
             </div>
              <van-button round type="info" plain @click="credit" class="credit">点我打卡</van-button>
        </div>
        <div class="footer">
            <van-button round type="info" plain @click="star">点我收藏</van-button>
            <van-button round type="info" plain @click="quit" 
              >退出比赛</van-button
            >
        </div>
  </div>
</template>

<script>
import {getContestUser} from "@/api/getContestUser"
import {quitContest} from "@/api/quitContest"
import {setCreditScore} from "@/api/setCreditScore"
export default {
    name:"detail",
    data(){
        return{
            item:{},
            personList:[]
        }
    },
    methods:{
        star(){
            wx.cloud.callFunction({
                name:"star",
                data:{
                    "_id":this.item._id
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err);
            })
        },
        quit(){
            // 退出比赛
            const that =this
            uni.showModal({
                    title:"警告",
                    content:"中途退出会扣除信誉分",
                    success:function(res){
                        if (res.confirm){
                            quitContest(that.item._id).then(res=>{
                                // 更改信誉分
                                setCreditScore(10,false).then(result=>{
                                    console.log("扣除信誉分：",result);
                                    // 跳转到我的比赛页
                                    uni.switchTab({
                                         url: '/pages/conTest/index',
                                         success:(res)=>{
                                             console.log("成功跳转：",res)
                                         },fail:(err)=>{
                                             console.log("跳转失败：",err)
                                         }
                                    });
                                })
                           })
                        }else{
                            uni.showToast({
                                title:"已取消",
                                duration:2000
                            })
                        }
                    }
                })
        },
        credit(){
            // 打卡功能（需要确定时间+地点是否合适）
        }
    },
    onLoad:function(option){
        const item =JSON.parse(option.item) //接收跳转前的页面
        this.item =item
        // 获取参与比赛的人员姓名
        getContestUser(item._id).then(res=>{
            this.personList =res.result
        }).catch(err=>{
            console.log(err)
        })
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
.credit{
    margin-top: 10px;
}
.footer{
    width: 100%;
  height: 120rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #f4f4f4;
}

</style>