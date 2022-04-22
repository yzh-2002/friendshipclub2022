// 获取某比赛参与的人的信息
export function getContestUser(id){
    return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name:"getContestPerson",
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