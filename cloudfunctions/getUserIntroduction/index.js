// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID;
  const {newValue,flag} =event;
  const db =cloud.database();
  const user =db.collection("user")
  // 获取用户信息
  if (flag){
    //修改个性签名
    const result =await user.where({openid:openid}).update({data:{introduction:newValue}})
    //返回数据
    return result
  }else{
    // 仅获取
    const result =await user.where({openid:openid}).get()
    return result;
  }
}