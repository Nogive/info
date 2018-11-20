<template>
  <div class="input-box">
    <ncform v-if="isSchemaChanging" :form-schema="kucunSchema" form-name="kucunSchema" v-model="kucunSchema.value"></ncform>
    <div class="btns">
      <van-button size="large" type="primary" @click="submit()">Submit</van-button>
      <van-button size="large" type="primary" @click="setValue()">setValue</van-button>
    </div>
  </div>
</template>
<script>
import "@/mmform/index";
import { custom,callApi } from "@/server/swagger";
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
          resField: 'data',
          otherParams:{id:'dx:{{$root.shoudianmingchen.id}}'},
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
    chanpins:{
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
          shuliang:{
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
              customRule:[
                {
                  script:'dx:{{$root.chanpins[i].shuliang}}!=0',
                  errMsg:'数量不能为0'
                }
              ]
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
                itemValueField: 'id',
                itemLabelField: 'name',
                enumSourceRemote: {
                  remoteUrl: 'http://x.waiqin.co/api/sku',
                  paramName: 'keyword',
                  resField: 'formdata.units',
                  otherParams:{id:'dx:{{$root.chanpins[i].chanpingming}}'},
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
          label:'产品'
        }
      },
      ui:{
        label:'',
        legend:'产品',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-array',
        widgetConfig:{
          collapsed:false
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

var data={
  shoudianmingchen:{
    id:1,
    name:'ceshi'
  },
  pandianriqi:1542607907000,
  chanpins:[
    {
      chanpingming:'1',
      shuliang:2,
      danwei:'1',
      shengchanriqi:1542607907000,
    }
  ]
};

export default {
  data () {
    return {
      isSchemaChanging:false,
      kucunSchema: {},
      systemSchemaId:1,
      systemSchemaVersion:0
    }
  },
  created(){
    this.Utils.Local.set('token','a3ULGGVU05pQ4Rnj');
    this.kucunSchema=formSchema;
    this.kucunSchema.value=data;
    this.isSchemaChanging=true;
    //custom.setAuth(this.Utils.Local.get('token'));
    //this.getSchema();
  },
  methods: {
    getSchema(){
      let _this=this;
      var opts={
        id:103,
        mode:'edit'
      }
      callApi(dformApi,'getSchema',opts).then(res=>{
        console.log(res.schema);
        _this.systemSchemaId=res.systemSchemaId;
        _this.systemSchemaVersion=res.systemSchemaVersion;
        _this.kucunSchema=res.schema;
        _this.kucunSchema.value=data;
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
      this.$ncformValidate('kucunSchema').then(data => {
        if (data.result) {
          let formdata=this.$data.formSchema.value;
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
      this.kucunSchema.value=data;
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