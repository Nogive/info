/**
 * 解析url参数
 * @example ？id=2345&a:b
 * @return getParameterByName(id) //2345
 */
export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * 返回完整的URL
 * @example x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2#/
 * @return getFullUrl() //x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2
 */
export function getFullUrl() {
  return (
    window.location.origin + window.location.pathname + window.location.search
  );
}
