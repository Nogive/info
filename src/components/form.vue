<template>
  <div class="input-box">
    <ncform v-if="isSchemaChanging" :form-schema="formSchema" form-name="formSchema" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
    <van-button size="small" @click="setValue()">setValue</van-button>
  </div>
</template>
<script>
import "@/mmform/index";
import {callApi} from "@/server/axios"
const formSchema={
  type: 'object',
  properties: {
    name:{
      type:'string',
      ui:{
        label:'售点名称',
        readonly:"dx: {{$const.mode}}=='view'",
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
        readonly:"dx: {{$const.mode}}=='view'",
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
        readonly:"dx: {{$const.mode}}=='view'",
        widget:'mm-location',
        widgetConfig:{
          drag:"dx: {{$const.mode}}=='edit'"
        }
      }
    },
    sellingPointType:{
      type:'string',
      value:"B",
      ui:{
        label:'售点类型',
        readonly:"dx: {{$const.mode}}=='view'",
        widget:'mm-select',
        widgetConfig:{
          enumSource:[
            {
              value:"B",
              label:"B"
            },
            {
              value:"C",
              label:"C"
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
        readonly:"dx: {{$const.mode}}=='view'",
        widget:'mm-select',
        widgetConfig:{
          enumSource:[
            {
              value:"directly",
              label:"直营售点"
            },
            {
              value:"dealer",
              label:"经销商下线"
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
        readonly:"dx: {{$const.mode}}=='view'",
        widget:'mm-select',
        widgetConfig:{
          filterLocal:'false',
          itemValueField: "key",
          itemLabelField: "value",
          enumSourceRemote: {
            remoteUrl: "http://rap2api.taobao.org/app/mock/105585/options",
            paramName: "keyword",
            resField: "options",
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
      type:'string',
      ui:{
        label:'售点品项',
        readonly:"dx: {{$const.mode}}=='view'",
        widget:'mm-select',
        widgetConfig:{
          enumSource:[
            {
              value:"1",
              label:"日加满"
            },
            {
              value:"2",
              label:"魅力厨房"
            },
            {
              value:"3",
              label:"东珍"
            },
            {
              value:"4",
              label:"朝天香"
            },
            {
              value:"5",
              label:"金咯勒"
            },
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
    cooperation:{
      type:'boolean',
      value:true,
      ui:{
        label:'合作状态',
        readonly:"dx: {{$const.mode}}=='view'",
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
        readonly:"dx: {{$const.mode}}=='view'",
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
    //this.formSchema=formSchema;
    //this.isSchemaChanging=true;
    this.getSchema();
  },
  mounted(){
    this.$nextTick(function () {
      // this.formSchema=formSchema;
      // this.isSchemaChanging=true;
    })
  },
  methods: {
    getSchema(){
      let _this=this;
      callApi({
        that:_this,
        type:"get",
        url:'http://x.waiqin.co/api/schema?id=9&mode=edit',
        headers:{
          Authorization:'a3ULGGVU05pQ4Rnj'
        },
        success:function(data){
          _this.systemSchemaId=data.systemSchemaId;
          _this.systemSchemaVersion=data.systemSchemaVersion;
          _this.formSchema=JSON.parse(data.schema);
          _this.isSchemaChanging=true;
        },
        error:function(err){
          console.log('error',err);
        }
      })
    },
    submit () {
      this.$ncformValidate('formSchema').then(data => {
        if (data.result) {
          console.log(this.$data.formSchema.value);
          /*
          let params={
            systemSchemaId:1,
            systemSchemaVersion:1,
            systemCreatorUserId:1,
            formData:this.$data.formSchema.value
          };
          console.log(params)
          */
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