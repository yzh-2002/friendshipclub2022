// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid =wxContext.OPENID; //用户ID

  // 凡需要用户登录才能进行的操作，均需要检查数据库信息
  const db =cloud.database()
  const user =db.collection("user")
  const $ =db.command

  const result =await user.where({openid:$.eq(openid)}).get()
  if (result.data.length){
    // 已登录（开始收藏）
    const {_id} =event; //获取场地id
    user.add({
      data:{
        star:[_id]
      }
    }).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  }else{
    return 400 //未登录
  }
}