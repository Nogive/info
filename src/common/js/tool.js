const tools = {
  /**
   * 格式化距离  大于1公里的以公里为单位  否则以米为单位   1000米=1公里
   * @param [1-7]
   * @returns string
   */
  reducedDistanceUnit: val => {
    return val;
  },
  apiCode: {
    ok: 200,
    noAuth: 401,
    noPermission: 403,
    error: 400,
    notFound: 404,
    internalError: 500,
    serverError: 502
  },
  /**
   * 接口错误弹窗  仅针对vant
   * @param  that 调用方的this对象 必填
   * @param  error 接口错误信息 选填
   */
  dealError: function(that, error) {
    if (that) {
      if (error.status == tools.apiCode.noAuth) {
        that.$toast("身份验证已经失效，请重新登录！错误码:" + error.status);
      } else if (error.status == tools.apiCode.noPermission) {
        that.$toast(
          "抱歉！您没有权限访问，请联系管理员。错误码:" + error.status
        );
      } else if (error.status == tools.apiCode.internalError) {
        that.$toast("服务器发生错误，请联系管理员。错误码:" + error.status);
      } else {
        console.log("errorBody:", error.response.body);
        that.$toast("请求发生错误.错误码:" + error.status);
      }
    } else {
      throw new Error("that 为必填参数");
    }
  }
};
export default tools;
