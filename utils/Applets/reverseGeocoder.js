// 负责获取位置坐标（gps二元组）以及封装gps坐标转换成真实坐标

// 腾讯地图接口
var QQMapWX =require("../qqMap/qqmap-wx-jssdk.min.js")
var qqmapsdk =new QQMapWX({
    key:"RIDBZ-YN3KK-SBAJM-ADSAV-2U427-ZJBCM"
});

// 获取gps信息（弹窗申请等等）
function GetLocation(){
   return new Promise((resolve,reject)=>{
    uni.getSetting({
        success:(res)=>{
            if (res.authSetting['scope.userLocation']){
                uni.authorize({
                    scope:"scope.userLocation",
                    success:()=>{
                        uni.getLocation({
                            type:'wgs84',
                            success:(res)=>{
                                resolve(res)
                            }
                        })
                    },
                    fail:(err)=>{
                        reject(err)
                    }
                })
            }else{
                // 需要提示他一些功能无法使用
                console.log("未授权")
            }
        }
    })
   })
}

function ReverseGeocoder({latitude,longitude}){
    qqmapsdk.reverseGeocoder({
        location:{
            latitude,
            longitude
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

export {GetLocation,ReverseGeocoder}