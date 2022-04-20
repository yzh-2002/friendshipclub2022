// 注意api中函数和云函数的区别：
// 经过云函数和直接操作数据库差别在于前者权限多，并且更加安全
import Vue from "vue"
export function userLogin(){
    return new Promise((resolve,reject)=>{
        uni.showModal({
            title:"温馨提示",
            content:"请登录",
            success(res){
                if (res.confirm){
                    // 获取用户信息（个人名称，头像，之类的）
                    uni.getUserProfile({
                        desc:"获取个人信息和地理位置",
                        lang:"zh_CN",
                        success:(res)=>{
                            // 获取用户地理位置信息
                            uni.getLocation({
                                type:"wgs84",
                                success:(local)=>{
                                    //加入全局变量
                                    Vue.prototype.userInformation['nickName'] =res.userInfo.nickName;
                                    Vue.prototype.userInformation['gender'] =res.userInfo.gender;
                                    Vue.prototype.userInformation['avatarUrl'] =res.userInfo.avatarUrl;
                                    Vue.prototype.userInformation['location'] ={
                                        "longitude":local.longitude,
                                        "latitude":local.latitude
                                    }
                                     // 调用登录函数，将信息上传至数据库
                                     wx.cloud.callFunction({
                                        name:"userLogin",
                                        data:{...Vue.prototype.userInformation}
                                    }).then(res=>{
                                        resolve(res)
                                    }).catch(err=>{
                                        reject(err)
                                    })
                                }
                            })
                        }
                    })
                }else{
                    // 用户取消登录
                    uni.showToast({
                        title: '警告：未登录',
                        icon:"error",
                        duration: 2000
                    });
                }
            }
        })
    })
}
