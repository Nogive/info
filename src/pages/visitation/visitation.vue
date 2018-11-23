<template>
  <div class="input-box">
    <ncform v-if="isSchemaChanging" :form-schema="visitationSchema" form-name="visitationSchema" v-model="visitationSchema.value"></ncform>
    <div class="btns">
      <van-button size="large" type="primary" @click="submit()">Submit</van-button>
      <van-button size="large" type="primary" @click="setValue()">setValue</van-button>
    </div>
  </div>
</template>
<script>
//import { customApi,custom,callApi } from "@/server/swagger";
import "@/mmform/index";
import baseSchemaEditPage from "@/components/base/baseSchemaEditPage";

const formSchema={
  type: 'object',
  properties: {
    shoudianmingchen:{
      type:'Object',
      ui:{
        label:'售点名称',
        readonly:true,
        widget:'mm-foreign-object',
        widgetConfig:{
          itemLabelField:'name',
          remoteUrl: 'http://x.waiqin.co/api/custom/search',//远程请求的地址
          paramName: 'keyword',
          resField: '',
          otherParams:{id:'dx:{{$root.shoudianmingchen.id}}'},
          withAuthorization:true,
        }
      }
    },
    qiandao:{
      type:'Object',
      ui:{
        label:'签到',
        readonly:'dx:{{$const.mode}}=="view"',
        widget:'mm-location',
        widgetConfig:{
          drag:'dx:{{$const.mode}}=="edit"',
        }
      }
    },
    zhaopian: {
      type:'array',
      ui:{
        label:'photo 拍照',
        readonly:false,
        widget:'mm-photo',
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    pingxiang:{
      type:'string',
      ui:{
        label:'售点品项',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-select',
        widgetConfig:{
          filterable:true,
          filterLocal:true,
          itemValueField: 'id',
          itemLabelField: 'formdata.name',
          enumSourceRemote: {
            remoteUrl: 'http://x.waiqin.co/api/sku/list',
            paramName: 'keyword',
            resField: '',
            otherParams:{},
            selectFirstitem: true,
            withAuthorization:true,
          }
        }
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    hezuozhuangtai:{
      type:'boolean',
      value:true,
      ui:{
        label:'合作状态',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-radio',
        widgetConfig:{
          size:'30px'
        }
      }
    },
    hezuoqingkuangzongshu:{
      type:'string',
      ui:{
        label:'合作情况综述',
        readonly:'dx:{{$const.mode}}=="view"',
        placeholder:'在这里输入备注',
        widget:'mm-textarea',
        widgetConfig:{
          rows:1,
          autosize:true
        }
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      } 
    }
  },
  globalConfig:{
    constants:{
      mode:'edit'
    }
  }
};
var data={
  shoudianmingchen:{
    id:4,
    name:'ceshi'
  },
  // qiandao:{
  //   lat:0,
  //   lng:0,
  //   address:''
  // },
  // zhaopian:[],
  // pinxiang:'1',
  // hezuozhuangtai:false,
  // hezuoqingkuangzongshu:'geiheieh'
};
export default {
  extends:baseSchemaEditPage,
  name:'visitation',
  data () {
    return {
      isSchemaChanging:false,
      visitationSchema: {},
      systemSchemaId:1,
      systemSchemaVersion:0
    }
  },
  created(){
    this.Utils.Local.set('token','a3ULGGVU05pQ4Rnj');
    custom.setAuth(this.Utils.Local.get('token'));
  },
  methods: {
    init(){
      let _this=this;
      callApi(customApi,'getVisitationSchema',{mode:'edit'}).then(res=>{
        console.log(res.schema);
        _this.systemSchemaId=res.systemSchemaId;
        _this.systemSchemaVersion=res.systemSchemaVersion;
        _this.visitationSchema=res.schema;
        _this.visitationSchema=data;
        _this.isSchemaChanging=true;
      },err=>{
        if(err.body){
          console.log("errorBody:",err.body);
        }else{
          tools.dealError(_this,err);
        }
      })
    },
    submit () {
      let _this=this;
      this.$ncformValidate('visitationSchema').then(data => {
        if (data.result) {
          let formdata=this.$data.visitationSchema.value;
          let params={
            systemSchemaId:_this.systemSchemaId,
            systemSchemaVersion:_this.systemSchemaVersion,
            systemCreatorUserId:"210000",
            formData:formdata
          };
          console.log(formdata);
        }
      })
    },
    setValue(){
      this.visitationSchema.value=data;
    }
  }
}
</script>
<style scoped lang="stylus">
.input-box
  box-sizing border-box
  width 100%
  padding .5rem
  .btns
    margin-top 1rem
    .van-button
      margin-bottom 0.8rem
</style>