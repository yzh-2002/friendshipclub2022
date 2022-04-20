<template>
    <div class="contest-view">
        <div class="banner">
            <image src="../../static/common/logo.png" mode="" />
        </div>
        <div class="contest">
            <div class="header">我的比赛</div>
            <div class="list" v-if="isLogin">
                <Contest class="item" v-for='item in list' :key="item" :item="item"/>
            </div>
            <div v-else class="noLogin">
                <div class="title">尚未登录！！</div>
                <button @click="login">点击登录</button>
            </div>
        </div>
       </div>
</template>

<script>
import Vue from "vue"
import Contest from "./Contest.vue"
import {userLogin} from "@/api/userLogin"
import {getUserContest} from "@/api/getUserContest"
export default {
    name:"contest-index",
    components: { Contest },
    data(){
        return {
            isLogin:false, //是否登录
            list:[]
        }
    },
    methods:{
        login(){
            userLogin().then(res=>{
                // 加入全局变量
                Vue.prototype.userInformation['nickName'] =res.result.data.nickName;
                Vue.prototype.userInformation['gender'] =res.result.data.gender;
                Vue.prototype.userInformation['avatarUrl'] =res.result.data.avatarUrl;
                Vue.prototype.userInformation['location'] ={
                    "longitude":res.result.data.location.longitude,
                    "latitude":res.result.data.location.latitude
                }
                // 更新isLogin
                this.isLogin =true;
            })
        }
    },
    // 首先判断用户是否登录
    created(){
        // 根据Vue.prototype.userInformation即可知道其是否已经登录了
        if (JSON.stringify(Vue.prototype.userInformation)=='{}'){
            this.isLogin =false
        }else{
            this.isLogin =true
            // 登录成功了才获取活动列表
            getUserContest().then(res=>{
                console.log(res);
                this.list =res.result.data
            })
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
.noLogin{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 35px;
    font-size: x-large;
    color: red;
}
.noLogin>button{
    background-color: #1989FA;
    color: #FFFFFF;
}

</style>