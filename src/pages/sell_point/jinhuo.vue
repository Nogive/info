<template>
  <div class="input-box">
    <ncform v-if="isSchemaChanging" :form-schema="jinhuoSchema" form-name="jinhuoSchema" v-model="jinhuoSchema.value"></ncform>
    <div class="btns">
      <van-button size="large" type="primary" @click="submit()">提交</van-button>
      <!-- <van-button size="large" type="primary" @click="setValue()">setValue</van-button> -->
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
    jinhuoriqi:{
      type:'number',
      ui:{
        label:'进货日期',
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
    gonghuodanwei:{
      type:'string',
      ui:{
        label:'供货单位',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-select',
        widgetConfig:{
          itemValueField: 'id',
          itemLabelField: 'name',
          enumSourceRemote: {
            remoteUrl: 'http://x.waiqin.co/api/dongke/shangyoudanwei',
            paramName: 'keyword',
            resField: '',
            otherParams:{},
            selectFirstitem: 'dx: {{$const.mode}}=="edit"',
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
    id:'4',
    name:'ceshi'
  },
  // jinhuoriqi:1542607907000,
  //gonghuodanwei:'c:5',
  // chanpins:[
  //   {
  //     chanpingming:'1',
  //     shuliang:2,
  //     danwei:'1'
  //   }
  // ]
};

export default {
  extends:baseSchemaEditPage,
  name:'jinhuo',
  data () {
    return {
      isSchemaChanging:false,
      jinhuoSchema: {},
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
      this.Utils.loading(_this,true);
      dformApi.getSchema('101').then(data=>{
        _this.systemSchemaId=data.systemSchemaId;
        _this.systemSchemaVersion=data.systemSchemaVersion;
        _this.jinhuoSchema=data.editSchema;
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
      this.$ncformValidate('jinhuoSchema').then(data => {
        if (data.result) {
          let formdata=this.$data.jinhuoSchema.value;
          let params={
            systemSchemaId:_this.systemSchemaId,
            systemSchemaVersion:_this.systemSchemaVersion,
            systemCreatorUserId:"210000",
            formdata:formdata
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
      this.jinhuoSchema.value=data;
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