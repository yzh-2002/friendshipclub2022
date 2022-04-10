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
  //从event中获取参数 
  const {nickName,avatarUrl,gender,location} =event
  const credit =100 //未注册用户默认100
  const star =[] //未注册用户默认未空
  console.log(nickName)
  const result =await user.where({openid:$.eq(openid)}).get()
  if (result.data.length){
    // data不为空，说明该用户已经注册过了
    return result.data[0]
  }else{
    // data未查到，则首次登录需要插入数据
    const isAdded =await user.add({
      // 测试，还需要获取地理位置信息和收藏列表信息
      data:{
        openid:openid,
        nickName:nickName,
        avatarUrl:avatarUrl,
        gender:gender,
        credit:credit,
        star:star,
        location:location
      }
    })
    return{openid:openid}
  }
}