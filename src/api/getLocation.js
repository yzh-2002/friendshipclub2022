// 获取用户地理位置信息

export function getLocation(){
    var QQMapWX =require("../../utils/qqMap/qqmap-wx-jssdk.min.js")
    var qqmapsdk =new QQMapWX({
        key:"RIDBZ-YN3KK-SBAJM-ADSAV-2U427-ZJBCM"
    });
    uni.getSetting({
        success:(res)=>{
            console.log(res)
            if (res.authSetting['scope.userLocation']){
                uni.authorize({
                    scope:"scope.userLocation",
                    success:()=>{
                        uni.getLocation({
                            type:'wgs84',
                            geocode:true,
                            success:(res)=>{
                                // 拿到gps坐标
                                // 调用腾讯地图接口逆解析地址信息
                                // 需要注意此时获取位置信息是为了计算场地距自己有多远，而不是为了打卡
                                qqmapsdk.reverseGeocoder({
                                    location:{
                                        latitude:res.latitude,
                                        longitude:res.longitude
                                    },
                                    success:(result)=>{
                                        console.log(result);
                                    },
                                    fail:(err)=>{
                                        console.log(err);
                                    },
                                    complete:(data)=>{
                                        console.log(data);
                                    }
                                })
                            }
                        })
                    },
                    fail:()=>{
                        console.log("拒绝")
                    }
                })
            }else{
                console.log("未授权")
            }
        }
    })
}