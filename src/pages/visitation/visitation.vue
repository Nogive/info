<template>
  <div class="input-box">
    <ncform v-if="isSchemaChanging" :form-schema="formSchema" form-name="formSchema" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
    <van-button size="small" @click="setValue()">setValue</van-button>
  </div>
</template>
<script>
import "@/mmform/index";
//import { dformApi,custom,callApi } from "@/server/swagger";
const formSchema={
  type: 'object',
  properties: {
    shoudian:{
      type:'Object',
      value:{
        id:1,
        name:'ceshi'
      },
      ui:{
        label:'售点名称',
        readonly:true,
        widget:'mm-foreign-object',
        widgetConfig:{
          itemLabelField:'value',
          remoteUrl: 'http://rap2api.taobao.org/app/mock/105585/options',//远程请求的地址
          paramName: 'keyword',
          resField: 'options',
          otherParams:{id:'dx:{{$root.name.id}}'},
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
            itemLabelField: 'name',
            enumSourceRemote: {
                remoteUrl: 'http://x.waiqin.co/api/dongke/pinxiang',
                paramName: 'keyword',
                resField: 'data',
                otherParams:{},
                selectFirstitem: true,//是否选中第一项
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
    cooperation:{
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
    message:{
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
  name:'cdcd',
  address:'110101',
  detailAddress:'xx街道',
  telphone:'13465237192',
  location:{
    lng:121.406051,
    lat:31.179695,
    address:'钦汇园'
  },
  sellingPointType:"B",
  sellingPointOwner:"dealer",
  upstreamUnit:'1',
  sellingItem:'2',
  cooperation:true,
  authentication:true
};
export default {
  data () {
    return {
      isSchemaChanging:false,
      formSchema: {},
      systemSchemaId:1,
      systemSchemaVersion:0
    }
  },
  created(){
    this.Utils.Local.set('token','a3ULGGVU05pQ4Rnj');
    this.formSchema=formSchema;
    this.isSchemaChanging=true;
    //custom.setAuth(this.Utils.Local.get('token'));
    //this.getSchema();
  },
  methods: {
    getSchema(){
      let _this=this;
      var opts={
        id:1,
        mode:'edit'
      }
      callApi(dformApi,'getSchema',opts).then(res=>{
        console.log(res.schema);
        _this.systemSchemaId=res.systemSchemaId;
        _this.systemSchemaVersion=res.systemSchemaVersion;
        _this.formSchema=res.schema;
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
      this.$ncformValidate('formSchema').then(data => {
        if (data.result) {
          let formdata=this.$data.formSchema.value;
          formdata.location={
            lat:0,
            lng:0,
            address:''
          };
          let params={
            systemSchemaId:_this.systemSchemaId,
            systemSchemaVersion:_this.systemSchemaVersion,
            systemCreatorUserId:"210000",
            formData:formdata
          };
          callApi(dformApi,'createFormdata',params).then(res=>{
            _this.$toast("提交成功");
            _this.$router.back();
          },err=>{
            if(err.body){
              console.log("errorBody:",err.body);
            }else{
              tools.dealError(_this,err);
            }
          })
        }
      })
    },
    setValue(){
      this.formSchema.value=data;
    }
  }
}
</script>
<style scoped lang="stylus">
.input-box
  box-sizing border-box
  width 100%
  padding .5rem
</style>