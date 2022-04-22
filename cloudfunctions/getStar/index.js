// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init(
  {env:cloud.DYNAMIC_CURRENT_ENV}
)

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID

  // 获取用户收藏列表
  const db =cloud.database()
  const user =db.collection("user")
  const playground =db.collection("playground")

  const result =await user.where({openid:openid}).get()
  const star =result.data[0].star

  const starList =[]
  await Promise.all(star.map(async item=>{
    let info =await playground.where({_id:item}).get()
    starList.push(info.data[0])
  }))
  return starList
}