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
    pandianriqi:{
      type:'number',
      ui:{
        label:'盘点日期',
        readonly:'dx:{{$const.mode}}=="view"',
        widget:'mm-date-picker',
        widgetConfig:{
          type:'date',
        }
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    chanpin:{
      type:'array',
      items:{
        type:'object',
        properties:{
          chanpingming:{
            type:'string',
            ui:{
              label:'产品名',
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
          count:{
            type:'number',
            ui:{
                label:'数量',
                readonly:'dx:{{$const.mode}}=="view"',
                widget:'mm-number',
                widgetConfig:{
                step:1,
                min:Number.NEGATIVE_INFINITY
                }
            },
            rules: {
                required:true,
            }
          },
          danwei:{
            type:'string',
            ui:{
              label:'单位',
              readonly:'dx: {{$const.mode}}=="view"',
              widget:'mm-select',
              widgetConfig:{
                filterable:true,
                filterLocal:true,
                itemValueField: 'key',
                itemLabelField: 'value',
                enumSourceRemote: {
                  remoteUrl: 'http://rap2api.taobao.org/app/mock/105585/options',
                  paramName: 'keyword',
                  resField: 'options',
                  otherParams:{unit:'dx:{{$root.gonghuodanwei}}'},//TODO:dx表达式
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
          shengchanriqi:{
            type:'number',
            ui:{
                label:'生产日期',
                readonly:'dx:{{$const.mode}}=="view"',
                widget:'mm-date-picker',
                widgetConfig:{
                type:'date',
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
        label:'产品',
        legend:'产品表',
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
  },
  globalConfig:{
    constants:{
      mode:'edit'
    }
  }
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