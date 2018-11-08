<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { requestAuthCode } from "@/common/js/ding";
import {callApi} from "@/server/axios";
export default {
  name: 'App',
  created(){
    this._initEnvironment();
  },
  methods:{
    _initEnvironment(){
      //判断当前处于什么环境
      this._initDingTalk();//钉钉
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
      callApi({
        that:this,
        url:"/api/ding/sso",
        data:{corpId: _this.Utils.getParameterByName("corpId"),code:code},
        success:function(data){
          console.log("login");
          console.log(data);
          _this.questJsApiConfigAndSet();
          //token存入session
        }
      });
    },
    questJsApiConfigAndSet(){
      let _this=this;
      this.axios
      .get("/api/ding/config", { params: { url: _this.Utils.getFullUrl() } })
      .then(function(response) {
        console.log("config");
        console.log(response);
        let config = response.data;
        config.jsApiList = ["biz.util.uploadImageFromCamera","device.geolocation.get"];
        dd.config(config);
      })
      .catch(function(error) {
        console.error(error);
      });
    },
    
  }
}
</script>

<style>
</style>
