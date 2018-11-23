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
  id:{
    type:'string',
    ui:{
      label:'id',
      readonly:'dx:{{$const.mode}}=="view"',
      hidden:true,
      widget:'mm-input',
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
const schema={
  type:'object',
  properties:{
    example:{
      type:'array',
      items:{
        type:'object',
        properties:items
      },
      ui:{
        label:'label',
        legend:'legend',
        showLegend:true,
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-quick-array',
        widgetConfig:{
          collapsed:false
        }
      }
    }
  },
  globalConfig:{
    constants:{
      mode:'edit'
    }
  }
}

var data={
  example:[
    {
      id:'demo1',
      jiage:2,
      shuliang:2
    },
    {
      id:'demo2',
      jiage:3,
      shuliang:3
    }
  ]
}

export default {
  data () {
    return {
      isSchemaChanging:true,
      formSchema: schema,
    }
  },
  created(){
    //this.formSchema.value=data;
  },
  methods: {
    submit () {
      let _this=this;
      this.$ncformValidate('formSchema').then(data => {
        console.log(data);
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