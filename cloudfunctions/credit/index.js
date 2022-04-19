// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 获取打卡场地的坐标
  const db =cloud.database()
  const playground =db.collection("playground")
  const $ =db.command
  const result =await playground.where({_id:$.eq("78d8343762528bfb0003c2f92f09dbb6")}).get()
  const location =result.data[0].location
  return {
   location
  }
}