// 注意api中函数和云函数的区别：
// 经过云函数和直接操作数据库差别在于前者权限多，并且更加安全
import Vue from "vue"
import {GetLocation} from "../../utils/Applets/reverseGeocoder"

export function userLogin(){
    return new Promise((resolve,reject)=>{
        uni.showModal({
            title:"温馨提示",
            content:"请登录",
            success(res){
                if (res.confirm){
                    uni.getUserProfile({
                        desc:"注册用户信息使用",
                        lang:"zh_CN",
                        success:(res)=>{
                            // 除了获取用户信息外，还需要获取用户所处位置
                            GetLocation().then(locat=>{
                                // 挂载到全局对象上
                                Vue.prototype.userInformation ={
                                    nickName:res.userInfo.nickName,
                                    gender:res.userInfo.gender,
                                    avatarUrl:res.userInfo.avatarUrl,
                                    location:{
                                        latitude:locat.latitude,
                                        longitude:locat.longitude
                                    },
                                    star:[],
                                    credit:100,
                                    openid:""
                                }
                                wx.cloud.callFunction({
                                    name:"userLogin",
                                    data:{
                                        nickName:res.userInfo.nickName,
                                        gender:res.userInfo.gender,
                                        avatarUrl:res.userInfo.avatarUrl,
                                        location:{
                                            latitude:locat.latitude,
                                            longitude:locat.longitude
                                        }
                                   }
                                }).then(res=>{
                                    resolve(res)
                                }).catch(err=>{
                                    reject(err)
                                })
                            })
                        }
                    })
                }
            }
        })
    })
}
