const cloud = require("wx-server-sdk");

cloud.init({
    // env:"cloud1-8gc4g06jbe3d0c1f"
    env:cloud.DYNAMIC_CURRENT_ENV
});


exports.main = async (event,context)=>{
    const wxContext = cloud.getWXContext() 
    const openId =wxContext.OPENID;
    const db = cloud.database();
    const _ = db.command;//获取数据库操作方法

    let {_id} = event;
    // _id是球场id，需要把用户的openid传进去
    const playground = await db.collection('playground').doc(_id).get()

    if (playground.data){
        // 先查看该用户是否已经预约
        if (playground.data.person.indexOf(openId)!=-1){
            return {status:201,msg:'用户已经预约过比赛'}
        }else{
            await db.collection('playground').doc(_id).update({
                data: {
                    person:_.push(openId)
                }
            })
            return {status:200,msg:'success'}
        }
    }

}