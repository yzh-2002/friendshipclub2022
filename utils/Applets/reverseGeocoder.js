// 负责获取位置坐标（gps二元组）以及封装gps坐标转换成真实坐标

// 腾讯地图接口
var QQMapWX =require("../qqMap/qqmap-wx-jssdk.min.js")
var qqmapsdk =new QQMapWX({
    key:"RIDBZ-YN3KK-SBAJM-ADSAV-2U427-ZJBCM"
});


// 将地址坐标转换为实际地址
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