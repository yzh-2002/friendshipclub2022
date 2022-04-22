// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID; //用户ID

  const { _id,f} = event; //获取场地id

  // 凡需要用户登录才能进行的操作，均需要检查数据库信息
  const db = cloud.database();
  const user = db.collection("user");
  const _ = db.command;

  const result = await user.where({ openid }).get();
  const star = result.data[0].star;
  const flag = star.some((item) => item === _id); //判断数组中是否有相同元素

  if (result.data.length) {
    // 已登录（开始收藏）
    if (f){
      // true标识要田间
        //判断数组中没有相同元素后再添加，防止重复添加
        if (!flag) {
          const res = await user.where({ openid }).update({
            data: {
              star: _.push(_id),
            },
          });
          if (res.stats.updated === 1) {
            return { status: "200", msg: "收藏成功!" };
          } else {
            return { status: "400", msg: "收藏失败!" };
          }
        } else {
          return { status: "402", msg: "已收藏过!" };
        }
    }else{
      // 标识要取消收藏
      const res = await user.where({ openid }).get()
      const newValue =res.data[0].star
      const pos =newValue.indexOf(_id)
      newValue.splice(pos,1)
      const s =await user.where({openid}).update({
        data:{
          star:newValue
        }
      })
      return {status:"200",msg:"取消收藏成功！"}
    }
  } else {
    return { status: "401", msg: "未登录!" };
  }
};
