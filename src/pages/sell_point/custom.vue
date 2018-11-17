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
    name:{
      type:'string',
      ui:{
        label:'售点名称',
        readonly:'dx: {{$const.mode}}=="view"',
        widget: 'mm-input',
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    address: {
      type: 'string',
      ui: {
        label:'地址信息',
        readonly:'dx: {{$const.mode}}=="view"',
        widget: 'mm-area',
        widgetConfig:{
          clearable:true
        }
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    detailAddress:{
      type:'string',
      ui:{
        label:'详细地址',
        readonly:'dx: {{$const.mode}}=="view"',
        placeholder:'请输入详细地址，如门牌号，街道等',
        widget:'mm-textarea',
        widgetConfig:{
          rows:1,
          autosize:true
        }
      }
    },
    telphone:{
      type:'string',
      ui:{
        label:'联系电话',
        readonly:'dx: {{$const.mode}}=="view"',
        widget: 'mm-input',
        widgetConfig:{
          type:'tel'
        }
      },
      rules:{
        tel:{
          value:true,
          errMsg:'电话号码格式不合法'
        }
      }
    },
    location:{
      type:'Object',
      ui:{
        label:'位置信息',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-location',
        widgetConfig:{
          drag:'dx: {{$const.mode}}=="edit"',
        }
      }
    },
    sellingPointType:{
      type:'string',
      ui:{
        label:'售点类型',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-select',
        widgetConfig:{
          enumSource:[
            {
              value:'BC',
              label:'BC'
            }
          ]
        }
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    sellingPointOwner:{
      type:'string',
      ui:{
        label:'售点归属',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-select',
        widgetConfig:{
          enumSource:[
            {
              value:'directly',
              label:'直营售点'
            },
            {
              value:'dealer',
              label:'dealer'
            }
          ]
        }
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    upstreamUnit:{
      type:'string',
      ui:{
        label:'上游单位',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-select',
        widgetConfig:{
          filterLocal:'false',
          itemValueField: 'id',
          itemLabelField: 'name',
          enumSourceRemote: {
            remoteUrl: 'http://x.waiqin.co/api/dongke/filterUpstreamUnit',
            paramName: 'keyword',
            resField: 'data',
            otherParams:{sellingPointOwner:'dx:{{$root.sellingPointOwner}}'},
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
    sellingItem:{
      type:'array',
      items:{
        type:'object',
        properties:{
          pingxiang:{
            type:'string',
            ui:{
              label:'品项选择',
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
        },
        ui:{
          label:'品项'
        }
      },
      ui:{
        label:'售点品项',
        legend:'售点品项表',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-array',
        widgetConfig:{
          collapsed:false
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
    authentication:{
      type:'boolean',
      value:false,
      ui:{
        label:'验证标记',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-radio',
        widgetConfig:{
          size:'30px'
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