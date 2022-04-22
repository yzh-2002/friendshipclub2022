// 设置用户分数
export function setCreditScore(score,flag){
    return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name:"setCreditScore",
            data:{
                flag, //指示添加或者删除
                score //添加或删除的分值
            }
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}