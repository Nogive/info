/**
 * //swagger API SDK
 */
import Utils from "@/utils";
const apiCode = {
  ok: 200,
  noAuth: 401,
  noPermission: 403,
  error: 400,
  notFound: 404,
  internalError: 500,
  serverError: 502
};
export var XFieldApi = require("x_field_api");
/*---------------------API--------------------------------------------- */
//钉钉
//export var ddApi = new XFieldApi.DingApi();

//错误码
export var errorCode = XFieldApi.Error.CodeEnum;

/*---------------------auth--------------------------------------------- */
//设置auth;
export function setAuth(key) {
  var defaultClient = XFieldApi.ApiClient.instance;
  var auth = defaultClient.authentications["ApiKeyAuth"];
  auth.apiKey = key;
}
//获取格式化参数
export function formatParameter(func, body) {
  return new XFieldApi[func].constructFromObject(body);
}
//调API的方法封装
export function callApi(instance, api, param) {
  return new Promise((resolve, reject) => {
    instance[api](param, (error, data, res) => {
      if (error) {
        let err;
        if (error.status == apiCode.noAuth) {
          let err = new Error("身份验证已经失效，请重新登录！");
          err.code = error.status;
        } else if (error.status == apiCode.noPermission) {
          let err = new Error("抱歉！您没有权限访问，请联系管理员。");
          err.code = error.status;
        } else if (error.status == apiCode.internalError) {
          let err = new Error("服务器发生错误，请联系管理员。");
          err.code = error.status;
        } else {
          let err = new Error("发生错误。");
          err.code = error.status;
          err.info = error.response.body;
        }
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
