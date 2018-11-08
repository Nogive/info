<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { requestAuthCode } from "@/common/js/ding";
import {XFieldApi,ddApi,formatParameter,setAuth,callApi} from "@/server/swagger";
console.log(XFieldApi);
export default {
  name: 'App',
  created(){
    this.Utils.openVconsole();
    this._initEnvironment();
  },
  methods:{
    _initEnvironment(){
      this._initDingTalk();
      this._dingError();
    },
    _initDingTalk(){
      let _this=this;
      dd.ready(function() {
        requestAuthCode().then(res=>{
          console.log("dd ready");
          console.log(res);
          _this.login(res);
        }).catch(err=>{
          console.log(err)
        })
      });
    },
    _dingError(){
      dd.error(function(error) {
        console.log("dd error: " + JSON.stringify(error));
      });
    },
    login(code){
      let _this=this;
      let maskBody={corpId: _this.Utils.getParameterByName("corpId"),code:code};
      let body=formatParameter("DingSsoRequest",maskBody);
      //console.log(body);
      callApi(ddApi,"sso",body).then(res=>{
        console.log(res);
        //_this.questJsApiConfigAndSet();
      },err=>{
        console.log(err);
      })
    },
    questJsApiConfigAndSet(){
      let _this=this;
      let url=this.Utils.getFullUrl();
      ddApi.config(url,(error,data,response)=>{
        if(error){
          console.log(error)
        }else{
          console.log(data);
          console.log(res);
          // let config = data;
          // config.jsApiList = ["biz.util.uploadImageFromCamera","device.geolocation.get"];
          // dd.config(config);
        }
      })
    }
  }
}
</script>

<style>
</style>
