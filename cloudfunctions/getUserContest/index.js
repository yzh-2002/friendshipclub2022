// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID
  const db =cloud.database()
  const playground =db.collection('playground')

  // 获取所有场地，筛选出其person中寻找包含openid的
  const result =await playground.where({
    person:openid
  }).get()
  return result
}