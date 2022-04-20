
// 获取用户参与的比赛列表
export function getUserContest(){
   return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name:"getUserContest"
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
   })
}