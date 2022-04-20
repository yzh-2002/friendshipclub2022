//云函数入口文件
const cloud = require("wx-server-sdk");

//初始化云空间（每个云函数都要初始化）
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

//云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const playground = db.collection("playground");

  const { _id } = event;

  const result = await playground.where({ _id }).get();

  return result;
};
