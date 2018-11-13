<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import tools from "@/common/js/tool"
import { requestAuthCode } from "@/common/js/ding";
import {ddApi,callApi,custom} from "@/server/swagger";
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
          console.log("dd ready:",res);
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
      let params={corpId: _this.Utils.getParameterByName("corpId"),code:code};
      callApi(ddApi,"dingGetuserinfo",params).then(res=>{
        console.log("dingGetuserinfo:",res);
        custom.setAuth(res.token);
        _this.Utils.Local.set('user',res.user);
        _this.Utils.Local.set('token',res.token);
        _this.questJsApiConfigAndSet();
      },err=>{
        if(err.body){
          console.log("errorBody:",err.body);
        }else{
          tools.dealError(_this,err);
        }
      })
    },
    questJsApiConfigAndSet(){
      let _this=this;
      let url=this.Utils.getFullUrl();
      callApi(ddApi,'dingConfig',url).then(res=>{
        console.log("dingConfig_res",res);
        let config = res;
        config.jsApiList = ["biz.util.uploadImageFromCamera","device.geolocation.start","device.geolocation.stop"];
        dd.config(config);
      },err=>{
        if(err.body){
          console.log("errorBody:",err.body);
        }else{
          tools.dealError(_this,err);
        }
      })
    }
  }
}
</script>

<style>
</style>
