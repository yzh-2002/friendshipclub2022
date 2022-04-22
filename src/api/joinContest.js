// 学生预约或加入比赛
export function joinContest(_id){
    return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name:"getMatch",
            data:{
                _id,
            }
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}