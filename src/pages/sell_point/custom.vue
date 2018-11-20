<template>
  <div class="input-box">
    <ncform v-if="isSchemaChanging" :form-schema="customSchema" form-name="customSchema" v-model="customSchema.value"></ncform>
    <div class="btns">
      <van-button size="large" type="primary" @click="submit()">Submit</van-button>
      <van-button size="large" type="primary" @click="setValue()">setValue</van-button>
    </div>
  </div>
</template>
<script>
import { customApi,custom,callApi } from "@/server/swagger";
import "@/mmform/index";

import baseSchemaEditPage from "@/components/base/baseSchemaEditPage";

const formSchema={
  type: 'object',
  properties: {
    shoudianmingchen:{
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
    dizhixinxi: {
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
    xiangxidizhi:{
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
    lianxidianhua:{
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
    weizhixinxi:{
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
    shoudianleixing:{
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
    shoudianguishu:{
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
              label:'经销商下线'
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
    shangyoudanwei:{
      type:'string',
      ui:{
        label:'上游单位',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-select',
        widgetConfig:{
          itemValueField: 'id',
          itemLabelField: 'name',
          enumSourceRemote: {
            remoteUrl: 'http://x.waiqin.co/api/dongke/shangyoudanwei',
            paramName: 'keyword',
            resField: '',
            otherParams:{shoudianguishu:'dx:{{$root.shoudianguishu}}'},
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
    pinxiangs:{
      type:'array',
      items:{
        type:'object',
        properties:{
          pinxiang:{
            type:'string',
            ui:{
              label:'品项选择',
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
        },
        ui:{
          label:'品项'
        }
      },
      ui:{
        label:'',
        legend:'售点品项',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-array',
        widgetConfig:{
          collapsed:false
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
    yanzhengbiaoji:{
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
  shoudianmingchen:'cdcd',
  dizhixinxi:'110101',
  xiangxidizhi:'xx街道',
  lianxidianhua:'13465237192',
  weizhixinxi:{
    lng:121.406051,
    lat:31.179695,
    address:'钦汇园'
  },
  shoudianleixing:"BC",
  shoudianguishu:"dealer",
  shangyoudanwei:'d:1',
  pinxiangs:[
    {
      pingxiang:1
    },
    {
      pingxiang:2
    }
  ],
  hezuozhuangtai:true,
  yanzhengbiaoji:true
};

export default {
  extends:baseSchemaEditPage,
  name:'custom',
  data () {
    return {
      isSchemaChanging:false,
      customSchema: {},
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
      callApi(customApi,'getCustomSchema',{mode:'edit'}).then(res=>{
        _this.systemSchemaId=res.systemSchemaId;
        _this.systemSchemaVersion=res.systemSchemaVersion;
        _this.customSchema=res.schema;
        _this.isSchemaChanging=true;
        this.Utils.loading(_this,false);
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
      this.$ncformValidate('customSchema').then(data => {
        if (data.result) {
          let formdata=this.$data.customSchema.value;
          console.log(formdata);
          let params={
            systemSchemaId:_this.systemSchemaId,
            systemSchemaVersion:_this.systemSchemaVersion,
            systemCreatorUserId:"210000",
            formData:formdata
          };
          console.log(params);
          callApi(customApi,'createCustomData',params).then(res=>{
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
      this.customSchema.value=data;
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