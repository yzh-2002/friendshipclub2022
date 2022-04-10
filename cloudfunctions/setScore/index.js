// 云函数入口文件
const cloud = require("wx-server-sdk");

// 初始化云空间（每个云函数都要初始化）
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext(); //在云函数中获取微信调用上下文
  const db = cloud.database();

  const user = db.collection("user");
  const playground = db.collection("playground");

  const { openid, _id, score } = event;

  const result = await user.where({ openid }).get();
  if (result.data.length) {
    const res = await playground.doc(_id).update({
      data: {
        score,
      },
    });
    if (res.stats.updated === 0) {
      return { status: "400", msg: "打分成功!" };
    } else {
      return { status: "400", msg: "打分失败!" };
    }
  } else {
    return { status: "400", msg: "打分失败!" };
  }
};
