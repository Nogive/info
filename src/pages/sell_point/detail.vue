<template>
  <div class="detail">
    <div class="header">
      <h2>{{name}}</h2>
      <van-cell-group>
        <van-cell icon="location" :value="address" />
        <van-cell icon="phone" :value="telphone" />
      </van-cell-group>
    </div>
    <div class="content">
      <van-tabs>
        <!-- 后续可删除 -->
        <van-tab title="详情">
          <div class="tab-content">
            <ncform v-if="isSchemaChanging" 
              :form-schema="customSchema" 
              form-name="customSchema" 
              v-model="customSchema.value">
            </ncform>
          </div>
        </van-tab>
        <van-tab v-for="(item,index) in tabs" :title="item.name" :key="index">
          <div class="tab-content">
            {{index}}
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<style scoped>
.header{
  padding: 0.5rem 0;
}
.header h2 {
  padding: 0 0.5rem;
}
.content{
  padding: 0.5rem;
}
.tab-content{
  margin: 0.5rem 0;
}
</style>
<script>
import "@/mmform/index";
import {customerApi,custom}from "@/server";
import tool from "@/common/js/tool";
export default {
  name:'detail',
  data(){
    return {
      name:'测试售点',
      address:"钦汇园",
      telphone:'13465342345',
      tabs:[
        {
          id:2,
          name:'id=2'
        },
        {
          id:3,
          name:'id=3'
        },
        {
          id:4,
          name:'id=4'
        },
        {
          id:5,
          name:'id=5'
        },
      ],
      isSchemaChanging:false,
      customSchema:{},
    }
  },
  mounted(){
    //供本地测试使用
    custom.setAuth(this.Utils.Local.get('token'));
    //获取scheme
    this.$nextTick(()=>{
      this.getCustomerSchema();
      this.getCustomerData();
    })
  },
  methods:{
    getCustomerSchema(){
      let _this=this;
      customerApi.getCustomerSchema().then(data=>{
        console.log('schema:',data);
        _this.customSchema=data.viewSchema;
        _this.isSchemaChanging=true;
      },err=>{
        tool.dealError(_this,error);
      })
    },
    getCustomerData(){
      let _this=this;
      customerApi.getCustomer(1).then(data=>{
        console.log('data:',data);
        _this.customSchema.value=data.formData;
      },err=>{
        tool.dealError(_this,error);
      })
    }
  }
}
</script>

