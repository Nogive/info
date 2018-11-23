<template>
  <div class="input-box">
    <ncform  v-if="isSchemaChanging" :form-schema="formSchema" form-name="formSchema" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
    <van-button size="small" @click="addItem()">add</van-button>
  </div>
</template>
<script>
import "@/mmform/index";
const items={
  id:{
    type:'string',
    value:1,
    ui:{
      readonly:true,
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
        label:'',
        legend:'内部legend',
        readonly:'dx: {{$const.mode}}=="view"',
        widget:'mm-simple-array',
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

export default {
  data () {
    return {
      isSchemaChanging:true,
      formSchema: schema,
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
    addItem(){
      let obj={
        id:'qqq',
        shuliang:100,
        jiage:100,
      };
      let data={
        example:[obj,obj]
      }
      console.log(this.formSchema.value.example);
      //this.formSchema.value.example.push(obj);
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