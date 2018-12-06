<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import tools from "@/common/js/tool"
import { requestAuthCode } from "@/common/js/ding";
import {ddApi,custom} from "@/server/swagger";
export default {
  name: 'App',
  created(){
    //供测试使用
    this.Utils.Local.set('token','a3ULGGVU05pQ4Rnj');
    
    //this.Utils.openVconsole();
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
      this.Utils.loading(_this,true);
      ddApi.dingGetuserinfo(params).then(data=>{
        console.log("dingGetuserinfo:",data);
        custom.setAuth(data.token);
        _this.Utils.Local.set('user',data.user);
        _this.Utils.Local.set('token',data.token);
        _this.questJsApiConfigAndSet();
        this.Utils.loading(_this,false);
      },error=>{
        this.Utils.loading(_this,false);
        tool.dealError(_this,error);
      });
    },
    questJsApiConfigAndSet(){
      let _this=this;
      let url=this.Utils.getFullUrl();
      _this.Utils.loading(_this,true);
      ddApi.dingConfig(url).then(data=>{
        console.log("dingConfig_res",data);
        let config = data;
        config.jsApiList = ["biz.util.uploadImageFromCamera","device.geolocation.start","device.geolocation.stop"];
        dd.config(config);
        _this.Utils.loading(_this,false);
      },error=>{
        _this.Utils.loading(_this,false);
        tool.dealError(_this,error);
      });
    }
  }
}
</script>

<style>
</style>
