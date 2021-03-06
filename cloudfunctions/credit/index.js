// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("credit")
  const wxContext = cloud.getWXContext()

  const {id} =event;
  // 获取打卡场地的坐标
  const db =cloud.database()
  const playground =db.collection("playground")
  const $ =db.command
  const result =await playground.where({_id:$.eq(id)}).get()
  const location =result.data[0].location
  return {
   location
  }
}