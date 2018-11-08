const tools = {
  /**
   * 格式化距离  大于1公里的以公里为单位  否则以米为单位   1000米=1公里
   * @param [1-7]
   * @returns string
   */
  reducedDistanceUnit: val => {
    return val;
  },
  /**
   * 接口错误弹窗  仅针对vant
   * @param  that 调用方的this对象 必填
   * @param  error 接口错误信息 选填
   */
  dealError: function(that, error) {
    if (that) {
      var code = error.code ? " 错误码:" + error.code : "";
      that.$toast(error.message + code);
    } else {
      throw new Error("that 为必填参数");
    }
  }
};
export default tools;
