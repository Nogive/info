<template>
  <div class="input-box">
    <ncform v-if="isSchemaChanging" :form-schema="xiaohuoSchema" form-name="xiaohuoSchema" v-model="xiaohuoSchema.value"></ncform>
    <div class="btns">
      <van-button size="large" type="primary" @click="submit()">Submit</van-button>
      <van-button size="large" type="primary" @click="setValue()">setValue</van-button>
    </div>
  </div>
</template>
<script>
import "@/mmform/index";
import {dformApi,custom}from "@/server";
import tool from "@/common/js/tool";
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
          itemLabelField:'formdata.shoudianmingchen',
          remoteUrl: 'http://x.waiqin.co/api/customer',
          paramName: 'keyword',
          resField: '',
          otherParams:{id:'dx:{{$root.shoudianmingchen.id}}'},
          withAuthorization:true,
        }
      }
    },
    kaishiriqi:{
      type:'number',
      ui:{
        label:'开始日期',
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
        },
        customRule:[
          {
            script:'dx:!{{$root.end}} || {{$root.jieshuriqi}} >= {{$root.kaishiriqi}}',
            errMsg:'开始日期必须小于等于结束日期',
            linkItems:[
              {
                fieldPath:'jieshuriqi',
                customRuleIdx:0
              }
            ]
          }
        ]
      }
    },
    jieshuriqi:{
      type:'number',
      ui:{
        label:'结束日期',
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
        },
        customRule:[
          {
            script:'dx:!{{$root.kaishiriqi}} || {{$root.jieshuriqi}} >= {{$root.kaishiriqi}}',
            errMsg:'结束日期必须大于等于开始日期',
            linkItems:[
              {
                fieldPath:'kaishiriqi',
                customRuleIdx:0
              }
            ]
          }
        ]
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
                itemLabelField: 'formdata.SystemName',
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
                itemValueField: 'id',
                itemLabelField: 'name',
                enumSourceRemote: {
                  remoteUrl: 'http://x.waiqin.co/api/sku',
                  paramName: 'keyword',
                  resField: 'formdata.SystemSpecification',
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
  }
};
export default {
  data () {
    return {
      isSchemaChanging:false,
      xiaohuoSchema: {},
      systemSchemaId:1,
      systemSchemaVersion:0
    }
  },
  created(){
    this.Utils.Local.set('token','a3ULGGVU05pQ4Rnj');
    this.xiaohuoSchema=formSchema;
    this.xiaohuoSchema.value=data;
    this.isSchemaChanging=true;
    //custom.setAuth(this.Utils.Local.get('token'));
    //this.getSchema();
  },
  methods: {
    init(){
      let _this=this;
      this.Utils.loading(_this,true);
      dformApi.getSchema(102).then(data=>{
        _this.systemSchemaId=data.systemSchemaId;
        _this.systemSchemaVersion=data.systemSchemaVersion;
        _this.xiaohuoSchema=data.editSchema;
        //for dongke
        this.setValue();
        _this.isSchemaChanging=true;
        this.Utils.loading(_this,false);
      },error=>{
        this.Utils.loading(_this,false);
        tool.dealError(_this,error);
      })
    },
    submit () {
      let _this=this;
      this.$ncformValidate('xiaohuoSchema').then(data => {
        if (data.result) {
          let formdata=this.$data.xiaohuoSchema.value;
          let params={
            systemSchemaId:_this.systemSchemaId,
            systemSchemaVersion:_this.systemSchemaVersion,
            systemCreatorUserId:"210000",
            formData:formdata
          };
          this.Utils.loading(_this,true);
          dformApi.createFormdata(params).then(data=>{
            this.Utils.loading(_this,false);
            _this.$toast("提交成功");
            _this.$router.back();
          },error=>{
            this.Utils.loading(_this,false);
            tool.dealError(_this,error);
          });
        }
      })
    },
    setValue(){
      this.xiaohuoSchema.value=data;
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