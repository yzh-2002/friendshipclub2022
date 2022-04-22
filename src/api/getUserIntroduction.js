// 修改用户个性签名
export function getUserIntroduction(newValue,flag){
    return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name:"getUserIntroduction",
            data:{
                newValue,
                flag //true时修改个性签名,false时仅获取
            }
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}