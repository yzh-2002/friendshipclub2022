// 获取用户收藏的场地信息
export function getStar(){
    return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name:"getStar"
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}