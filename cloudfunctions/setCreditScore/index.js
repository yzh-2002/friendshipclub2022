// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID
  const {flag,score} =event;

  const db =cloud.database();
  const user =db.collection("user");
  const $ =db.command

  const result =await user.where({openid:openid}).get()
  if (flag){
    // 添加分数
    // 检测如果满分就不再添加
    if (result.data[0].credit==100){
      return {status:200,msg:`您当前信誉分为${result.data[0].creidt}`}
    }else{
      // 加上之后也不能大于100
      if (result.data[0].credit+score>=100){
        // 直接更新为100即可
      }else{
        // 加上
      }
    }
  }else{
    // 删除分数
    // 不能删除到0
    const newValue =result.data[0].credit-score
    const res =await user.where({openid:openid}).update({
      data:{
        credit:newValue
      }
    })
    return res 
  }

}