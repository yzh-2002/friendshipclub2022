// 计算距离
// 腾讯地图接口
var QQMapWX =require("../qqMap/qqmap-wx-jssdk.min.js")
var qqmapsdk =new QQMapWX({
    key:"RIDBZ-YN3KK-SBAJM-ADSAV-2U427-ZJBCM"
});

// distination表示打卡点的坐标
export function CalculateDistance(destination){
    return new Promise((resolve,reject)=>{
        qqmapsdk.calculateDistance({
            // from参数不指定则表示从当前位置开始计算距离
            from:'',
            to:destination,
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}