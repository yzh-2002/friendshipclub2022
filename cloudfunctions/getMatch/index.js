const cloud = require("wx-server-sdk");

cloud.init({
    // env:"cloud1-8gc4g06jbe3d0c1f"
    env:cloud.DYNAMIC_CURRENT_ENV
});


exports.main = async (event,context)=>{
    // let { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
    const db = cloud.database();
    const _ = db.command;

    let {openId,_id} = event;
    //openId是需要push进的playground的对象
    //_id是用户的id,需要被存进playground对象里
    const user = await db.collection('user').doc(_id).get()

    if (user.data){
        await db.collection('playground').doc(openId).update({
            data: {
                person:_.push(_id)
            }
        })

        return {status:200,msg:'success'}
    }

}