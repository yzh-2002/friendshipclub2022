// // 调用微信云函数
export const test =wx.cloud.callFunction({
    name:"main",
})

// // 也可以在小程序端直接操作数据库（但是有权限限制）
// const db =wx.cloud.database()
// export const test =async ()=>{
//     const user =db.collection("user")
//     const result = await user.add({
//         data:{
//             test:"test"
//         }
//     }).then(res=>{return res})
//     return result
// }