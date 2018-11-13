<template>
  <div class="example">
    <van-button type="primary"  plain @click="takePhoto">测试拍照</van-button>
    <van-button type="primary"  plain @click="getGPS">测试GPS</van-button>
    <van-button @click="testAxios">testAxios</van-button>
    <van-button @click="computeDix">计算距离</van-button>
  </div>
</template>

<script>
import { uploadImageFromCamera,onLocation} from "@/common/js/ding";
import {callApi} from "@/server/axios";
import {account} from "@/server/api";
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  mounted(){
  },
  methods:{
    takePhoto(){
      let watermark={
        time: "08:35",
        dateWeather: "2016.05.06 周六·晴转多云 16℃",
        username: "王晓",
        address: "西湖·杭州"
      };
      uploadImageFromCamera(watermark).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    getGPS(){
      console.log('获取GPS');
      onLocation().then(res=>{
        console.log("测试返回结果:",res);
      },err=>{
        console.error(err);
      })
    },
    testAxios(){
      callApi({
        that:this,
        url:account.getCaptchaImage,
        type:"GET",
        success:function(data){
          console.log(data);
        }
      })
    },
    computeDix(){
      var distance = this.Utils.calculateDistance(121.662158,31.141832,121.809787,31.143007);
      console.log(distance);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.example
  padding 0.5rem 0;
  text-align center
</style>
