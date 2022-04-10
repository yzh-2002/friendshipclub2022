// 计算距离
// 腾讯地图接口
var QQMapWX =require("../qqMap/qqmap-wx-jssdk.min.js")
var qqmapsdk =new QQMapWX({
    key:"RIDBZ-YN3KK-SBAJM-ADSAV-2U427-ZJBCM"
});

function CalculateDistance(destination){
    qqmapsdk.calculateDistance({
        // from参数不指定则表示从当前位置开始计算距离
        from:'',
        to:destination,
        success:(res)=>{
            console.log("两地之间的距离：",res.result.elements[0].distance,"米");
        },
        fail:(err)=>{
            console.log(destination);
            console.log(err)
        }
    })
}
export {CalculateDistance}