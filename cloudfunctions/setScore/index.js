// 云函数入口文件
const cloud = require("wx-server-sdk");

// 初始化云空间（每个云函数都要初始化）
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const user = db.collection("user");
  const playground = db.collection("playground");

  const { openid, _id, score } = event;

  const userResult = await user.where({ openid }).get();
  const playResult = await playground.where({ _id }).get();

  const playscore = playResult.data[0].scoreObj.score;
  const people = playResult.data[0].scoreObj.people;

  if (userResult.data.length) {
    const res = await playground.doc(_id).update({
      data: {
        scoreObj: {
          people: people + 1,
          score: playscore + score,
        },
      },
    });
    if (res.stats.updated === 1) {
      return { status: "200", msg: "打分成功!" };
    } else {
      return { status: "400", msg: "打分失败!" };
    }
  } else {
    return { status: "401", msg: "用户不存在!" };
  }
};
