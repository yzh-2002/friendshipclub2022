// 云函数入口文件
const cloud = require("wx-server-sdk");

// 初始化云空间（每个云函数都要初始化）
cloud.init({
  // env:"cloud1-8gc4g06jbe3d0c1f"
  env: cloud.DYNAMIC_CURRENT_ENV,
});
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database({});
  return await db
    .collection("user")
    .add({
      data: {
        test2: "test2",
      },
    })
    .then((res) => {
      console.log("数据库新增记录", res);
    });
};
