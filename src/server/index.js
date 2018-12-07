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
  //提交formdata
  createCustomerData: params => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      customerApiInstance.createCustomerData(body, callback(resolve, reject));
    });
  },
  //提交拜访formdata
  createvisitationData: params => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      customerApiInstance.createvisitationData(body, callback(resolve, reject));
    });
  },

  //删除跟进信息
  /**
   *var opts = {
      'userId': 789 // Number | 没有默认删除主跟进信息
    };
   */
  delFollower: (customerId, opts) => {
    return new Promise((resolve, reject) => {
      customerApiInstance.delFollower(
        customerId,
        opts,
        callback(resolve, reject)
      );
    });
  },

  //编辑formdata后提交
  editCustomerData: (id, params) => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      customerApiInstance.editCustomerData(id, body, callback(resolve, reject));
    });
  },
  editVisitation: (id, params) => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      customerApiInstance.editCustomerData(id, body, callback(resolve, reject));
    });
  },
  //通过id获取formdata
  /**
  var opts = {
    'id': 789 // Number | id
  };
   */
  getCustomer: opts => {
    return new Promise((resolve, reject) => {
      customerApiInstance.getCustomer(opts, callback(resolve, reject));
    });
  },

  //获取售点
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
  //获取拜访的schema
  getVisitationSchema: mode => {
    return new Promise((resolve, reject) => {
      customerApiInstance.getVisitationSchema(mode, callback(resolve, reject));
    });
  },
  //获取custom schema
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
  //获取钉钉激活认证信息
  dingConfig: url => {
    return new Promise((resolve, reject) => {
      ddApiInstance.dingConfig(url, callback(resolve, reject));
    });
  },
  //登录
  dingGetuserinfo: params => {
    let body = new XFieldApi.DingSsoRequest.constructFromObject(params);
    return new Promise((resolve, reject) => {
      ddApiInstance.createMicroapp(body, callback(resolve, reject));
    });
  }
};

//所有dform里面的api方法
export const dformApi = {
  //提交formdata
  createFormdata: params => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      dformApiInstance.createFormdata(body, callback(resolve, reject));
    });
  },
  //编辑formdata 然后提交
  editFormdata: (id, params) => {
    let body = new XFieldApi.Formdata.constructFromObject(params);
    return new Promise((resolve, reject) => {
      dformApiInstance.editFormdata(id, body, callback(resolve, reject));
    });
  },
  /**
  var opts = {
    'id': 789 // Number | 根据id获取formdata
  };
   */
  getFormdata: opts => {
    return new Promise((resolve, reject) => {
      dformApiInstance.getSchema(opts, callback(resolve, reject));
    });
  },
  //根据id获取schema
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
