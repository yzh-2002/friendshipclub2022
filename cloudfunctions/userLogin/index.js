// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取用户信息
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID 
  // 首先查询数据库是否存有相关信息
  const db =cloud.database()
  const user =db.collection("user")
  const $ =db.command

  await user.where({openid:$.eq(openid)}).get().then(result=>{
    console.log(result)
    if (result.data){
      // data不为空
      console.log("数据库中查询到此人信息")
      return "并没有插入数据"
    }else{
      console.log("数据库中查询不到此人信息")
      // data为空
      const {nickName,gender,avatarUrl} =event;
      // 存入数据库
      user.add({
        data:{openid,avatarUrl,nickName,gender,location,star,credit}
      }).then(res=>{
        console.log("成功插入数据")
        return "成功插入数据"
      })
    }
  })

  return "test"
}