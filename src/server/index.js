/**其他页面要使用API
 *  import {accountApi,callApi,custom} from "@server/swagger"
 */
const XFieldApi = require("x_field_api");
/*---------------------API--------------------------------------------- */
//ddApi
var ddApiInstance = new XFieldApi.DingApi();

//进货、销货、库存
var dformApiInstance = new XFieldApi.DformApi();

//custom visitation
var customerApiInstance = new XFieldApi.CustomerApi();

/*-----swagger api sdk--------------------------------------------- */
//请求后的回调
const callback = (resolve, reject) => {
  return function(error, data, response) {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  };
};

//所有customer里面的api方法
export const customerApi = {
  createCustomerData: params => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      customerApiInstance.createCustomerData(body, callback(resolve, reject));
    });
  },

  createvisitationData: params => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      customerApiInstance.createvisitationData(body, callback(resolve, reject));
    });
  },

  delFollower: (customerId, userId) => {
    return new Promise((resolve, reject) => {
      customerApiInstance.delFollower(
        customerId,
        userId,
        callback(resolve, reject)
      );
    });
  },

  delMajorFollower: customerId => {
    return new Promise((resolve, reject) => {
      customerApiInstance.delMajorFollower(
        customerId,
        callback(resolve, reject)
      );
    });
  },

  editCustomerData: (id, params) => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      customerApiInstance.editCustomerData(id, body, callback(resolve, reject));
    });
  },

  getCustomer: id => {
    return new Promise((resolve, reject) => {
      customerApiInstance.getCustomer(id, callback(resolve, reject));
    });
  },

  /**
   * var opts = {
      'pageSize': 56, // Number | 显示条数
      'pageSign': "pageSign_example", // String | 起点标记
      'longitude': "longitude_example", // String | 经度
      'latitude': "latitude_example" // String | 纬度
    };
   */
  getCustomers: opts => {
    return new Promise((resolve, reject) => {
      customerApiInstance.getCustomers(opts, callback(resolve, reject));
    });
  },

  getVisitationSchema: mode => {
    return new Promise((resolve, reject) => {
      customerApiInstance.getVisitationSchema(mode, callback(resolve, reject));
    });
  },

  getCustomerSchema: () => {
    return new Promise((resolve, reject) => {
      customerApiInstance.getCustomerSchema(callback(resolve, reject));
    });
  }
};

//所有钉钉里面的api方法
export const ddApi = {
  createMicroapp: params => {
    let body = new XFieldApi.DingAppRequest.constructFromObject(params);
    return new Promise((resolve, reject) => {
      ddApiInstance.createMicroapp(body, callback(resolve, reject));
    });
  },
  dingConfig: url => {
    return new Promise((resolve, reject) => {
      ddApiInstance.dingConfig(url, callback(resolve, reject));
    });
  },
  dingGetuserinfo: params => {
    let body = new XFieldApi.DingSsoRequest.constructFromObject(params);
    return new Promise((resolve, reject) => {
      ddApiInstance.createMicroapp(body, callback(resolve, reject));
    });
  }
};

//所有dform里面的api方法
export const dformApi = {
  createFormdata: params => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      dformApiInstance.createFormdata(body, callback(resolve, reject));
    });
  },
  editFormdata: (id, params) => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      dformApiInstance.editFormdata(id, body, callback(resolve, reject));
    });
  },
  getSchema: id => {
    return new Promise((resolve, reject) => {
      dformApiInstance.getSchema(id, callback(resolve, reject));
    });
  }
};

/*---------------------Func--------------------------------------------- */
export const custom = {
  //设置请求头
  setAuth: key => {
    var defaultClient = XFieldApi.ApiClient.instance;
    var auth = defaultClient.authentications["ApiKeyAuth"];
    auth.apiKey = key;
  },
  //错误码
  errorCode: XFieldApi.Error.CodeEnum
};
