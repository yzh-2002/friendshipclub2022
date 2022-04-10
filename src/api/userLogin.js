// 注意api中函数和云函数的区别：
// 经过云函数和直接操作数据库差别在于前者权限多，并且使用的是
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
                            // 不用调用uni.login获取code了，云函数会帮你获取
                            // 除了获取用户信息外，还需要获取用户所处位置
                            wx.cloud.callFunction({
                                name:"userLogin",
                                data:{
                                    nickName:res.nickName,
                                    gender:res.gender,
                                    avatarUrl:res.avatarUrl
                               }
                            }).then(res=>{
                                resolve(res)
                            }).catch(err=>{
                                reject(err)
                            })
                        }
                    })
                }
            }
        })
    })
}
