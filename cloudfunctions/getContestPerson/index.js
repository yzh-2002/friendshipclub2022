// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {id} =event; //拿到球场id
  // 从球场id获取用户列表
  const db =cloud.database()
  const playground =db.collection("playground")
  const user =db.collection("user")

  const $ =db.command

  const result =await playground.where({_id:id}).get()
  //从结果中得到用户id
  const personList =result.data[0].person
  const personInfoList =[]
  await Promise.all(personList.map(async item=>{
    let info =await user.where({openid:item}).get()
    personInfoList.push(info.data[0])
  }))
  return personInfoList
}