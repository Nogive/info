import Utils from "@/utils";
/**
 * 获取ding code
 * @example corpId=ding7bc2e52b22faf4b2
 * @return code
 */
export function requestAuthCode() {
  return new Promise((resolve, reject) => {
    dd.runtime.permission.requestAuthCode({
      corpId: Utils.getParameterByName("corpId"),
      onSuccess: function(result) {
        resolve(result.code);
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 拍照上传
 * @example watermark:{
 *      time: "08:35",
        dateWeather: "2016.05.06 周六·晴转多云 16℃",
        username: "王晓",
        address: "西湖·杭州"
 * }
 * @return getFullUrl() //x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2
 */
export function uploadImageFromCamera(watermark) {
  return new Promise((resolve, reject) => {
    dd.biz.util.uploadImageFromCamera({
      compression: true, //(是否压缩，默认为true压缩)
      quality: 50, // 图片压缩质量,
      resize: 50, // 图片缩放率
      stickers: watermark,
      onSuccess: function(result) {
        resolve(result);
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 连续获取一组位置，返回精度最低的
 * @return result {}
 * @example result:{
      longitude : Number,  经度
      latitude : Number,  纬度
      accuracy : Number, 实际定位经度半径
      address : String, 格式化地址
      province : String, 省
      city : String, 市
      district : String, 区
      road : String, 街道
      netType : String, 当前设备类型
      operatorType : String, 当前设备使用的移动运营商
      errorMessage : String, 对错误码的描述
      errorCode : Number, 错误码  
      isWifiEnabled : Boolean, android wifi是否开启
      isGpsEnabled : Boolean, android gps是否开启
      isFromMock : Boolean, 
      provider : wifi|lbs|gps,
      accuracy : Number,
      isMobileEnabled : Boolean,
      sceneId:string 定位场景ID
    }
 */
export function onLocation() {
  var sceneId = "ding";
  var results = [];
  return new Promise((resolve, reject) => {
    dd.device.geolocation.start({
      targetAccuracy: 100, // 期望精确度
      iOSDistanceFilter: 100, // 变更感知精度(iOS端参数)
      useCache: true, // 是否使用缓存(Android端参数)
      withReGeocode: true, // 是否返回逆地理信息,默认否
      callBackInterval: 200, //回传时间间隔，ms
      sceneId: sceneId, // 定位场景id,
      onSuccess: function(result) {
        if (results.length < 5) {
          results.push(result);
        } else {
          stopLocate(result.sceneId);
          results.sort((a, b) => {
            return a - b;
          });
          resolve(results[0]);
        }
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}
function stopLocate(sceneId) {
  dd.device.geolocation.stop({
    sceneId: sceneId, // 需要停止定位场景id
    onSuccess: function(result) {
      //console.log("stop locate:", result); // 停止的定位场景id，当该场景没有开始定位时，返回null
    },
    onFail: function(err) {}
  });
}

/**
 * 获取当前位置信息  获取一次
 * 
 * @return result {}
 * @example result:{
      longitude : Number,
      latitude : Number,
      accuracy : Number,
      address : String,
      province : String,
      city : String,
      district : String,
      road : String,
      netType : String,
      operatorType : String,
      errorMessage : String,
      errorCode : Number,
      isWifiEnabled : Boolean,
      isGpsEnabled : Boolean,
      isFromMock : Boolean,
      provider : wifi|lbs|gps,
      accuracy : Number,
      isMobileEnabled : Boolean
    }
 */
export function getLocation() {
  return new Promise((resolve, reject) => {
    dd.device.geolocation.get({
      targetAccuracy: 100, //精度
      coordinate: 1, //高德坐标
      withReGeocode: false, //是否带有逆地理编码信息
      useCache: true, //是否缓存地理位置信息 默认是true，如果需要频繁获取地理位置，请设置false
      onSuccess: function(result) {
        resolve(result);
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}
