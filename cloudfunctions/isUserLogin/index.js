// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 调用该云函数说明用户已经登录了

  const openid =wxContext.OPENID;
  const db =cloud.database()
  const user =db.collection("user")
  const $ =db.command

  // 从user数据表里获取location字段
  const result =await user.where({openid:$.eq(openid)}).get()
  const location =result.data[0].location;
  if (location){
    // 已经获取了地址信息
    return 201;
  }else{
    return 401;
  }

  
}