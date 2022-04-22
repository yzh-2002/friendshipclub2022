// 退出比赛
export function quitContest(id){
    return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name:"quitContest",
            data:{
                id
            }
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}