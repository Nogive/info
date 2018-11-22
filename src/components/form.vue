<template>
  <div class="input-box">
    <ncform  v-if="isSchemaChanging" :form-schema="formSchema" form-name="formSchema" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
    <van-button size="small" @click="setValue()">setValue</van-button>
  </div>
</template>
<script>
import "@/mmform/index";
const items={
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
    }
  },
  jiage:{
    type:'number',
    ui:{
      label:'价格',
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
};
const formSchema={
  type: 'object',
  properties: {
    quickarray:{
      type:'object',
      ui:{
        label:'quickarray demo',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-quick-array',
        widgetConfig:{
          legend:'quickarray lengend',//表头名称
          title:'这里是标题', //sku描述标题
          schema:items,
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

export default {
  data () {
    return {
      isSchemaChanging:true,
      formSchema: formSchema,
    }
  },
  created(){
    
  },
  methods: {
    submit () {
      let _this=this;
      this.$ncformValidate('formSchema').then(data => {
        if (data.result) {
          let formdata=this.$data.formSchema.value;
          console.log(formdata);
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