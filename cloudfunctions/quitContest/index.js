// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID;
  // 退出比赛
  const {id} =event;
  // 从该场地中删除用户
  const db =cloud.database()
  const playground =db.collection("playground")
  const result =await playground.where({_id:id}).get()
  // 从数组中删除指定元素
  let person =result.data[0].person;
  // 获取下标
  const pos = person.indexOf(openid);
  person.splice(pos,1)
  // 更新数据库
  const res =await playground.where({_id:id}).update({
    data:{
      person:person
    }
  })
  return res
}