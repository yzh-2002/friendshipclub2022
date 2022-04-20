// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID; //获取用户标识

  const db =cloud.database()
  const user =db.collection("user")
  const $ =db.command

  const result =await user.where({openid:$.eq(openid)}).get()
  if (result.data.length){
    // 用户已经登录
    return 200;
  }else{
    return 400; //用户未登录
  }
}