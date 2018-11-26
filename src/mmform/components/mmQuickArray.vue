<template>
  <div class="quickarray">
    <legend v-if="schema.ui.legend && schema.ui.showLegend">
      {{schema.ui.legend}}
      <span class="btns">
        <van-icon name="add-o" @click="openModel"></van-icon>
        <i class="arrow" :class="{'pull-up': !mergeConfig.collapsed, 'pull-down': mergeConfig.collapsed}" @click="collapse()"></i>
      </span>
    </legend>

    <div v-if="!showQuickArray" v-show="!mergeConfig.collapsed" v-for="(dataItem, idx) in schema.value" :key="dataItem.__dataSchema.__id" class="list-item">
      <div class="list-item-label">
        <label class="title">{{dataItem.__dataSchema.ui.label}} {{idx + 1}}</label>
        <van-icon v-if="!hiddenBtn" name="clear" @click="delItem(idx)" class="icon"></van-icon> 
      </div>

      <!-- array item 是 正常的 object 类型 -->
      <template v-if="isNormalObjSchema(dataItem.__dataSchema)">
        <ncform-object :schema="dataItem.__dataSchema" :form-data="formData" :idx-chain="(idxChain ? idxChain + ',' : '') + idx" :config="dataItem.__dataSchema.ui.widgetConfig" :show-legend="false">
          <template v-for="(fieldSchema, fieldName) in (dataItem.__dataSchema.properties || {__notObjItem: dataItem.__dataSchema})" :slot="fieldName">
            <slot :name="fieldName" :schema="fieldSchema" :idx="idx"></slot>
          </template>
        </ncform-object>
      </template>
      <!-- array item 是 非正常的 object 类型 以及 其它类型 -->
      <div v-else class="normal-item">
        <slot name="__notObjItem" :schema="dataItem.__dataSchema" :idx="idx"></slot>
      </div>
      <!-- <button @click="sendData">塞数据</button> -->

    </div>

    <div class="btn-group" v-if="deleteAll">
      <van-button @click="delAllItems()" v-if="schema.value.length>0" type="default" class="btn">
        <van-icon name=delete></van-icon>删除全部 
      </van-button>
    </div>

    <!-- model -->
    <van-popup v-model="openPopup" class="model-wrapper" position="right" :overlay="false">
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="确定"
        left-arrow
        @click-left="openPopup=false"
        @click-right="onModelSure"
      />
      <van-tabs v-model="active" @click="clickTab">
        <van-tab title="搜索">
          <div class="content-wrapper">
            <van-cell-group>
              <van-field
                v-model="searchText"
                center
                clearable
                left-icon="search"
                placeholder="请输入关键字进行搜索"
              >
                <van-button slot="button" size="small" type="primary">搜索</van-button>
              </van-field>
            </van-cell-group>
          </div>
        </van-tab>
        <van-tab title="所有">
          <div class="content-wrapper">
            <div class="content" v-for="(item,index) in skus" :key="index">
              <div class="content-label">
                <label class="title">{{item.name}}</label>
                <div class="icons">
                  <van-icon v-if="!test" name="add-o" @click="createSchema(item)"></van-icon>
                  <van-icon v-else name="passed" :class="{checked:item.checked}" @click="item.checked=!item.checked"></van-icon>
                  <van-icon name="delete" @click="deleteAllSchema(item)"></van-icon>
                  <i class="arrow" :class="{'pull-up': !expandItem, 'pull-down': expandItem}" @click="expandItem=!expandItem"></i>
                </div>
              </div>
              <div class="content-form" v-if="!test" v-show="expandItem">
                <ncform
                  :form-schema="simpleSchema" 
                  :form-name="`schema${item.id}`" 
                  v-model="item.value">
                </ncform>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab v-for="(tab,index) in groups" :title="tab.name" :key="index" :groupId="tab.id" :ref="`tab${index+2}`">
          <div class="content-wrapper">
            <div class="content" v-for="(item,index) in groupSkus" :key="index">
              <div class="content-label">
                <label class="title">{{item.name}}</label>
                <div class="icons">
                  <van-icon v-if="!test" name="add-o" @click="createSchema(item)"></van-icon>
                  <van-icon v-else name="passed" :class="{checked:item.checked}" @click="item.checked=!item.checked"></van-icon>
                  <van-icon name="delete"></van-icon>
                  <i class="arrow" :class="{'pull-up': !expandItem, 'pull-down': expandItem}" @click="expandItem=!expandItem"></i>
                </div>
              </div>
              <div class="content-form" v-if="!test" v-show="expandItem">
                <ncform
                  :form-schema="simpleSchema" 
                  :form-name="`groupSchema_${item.id}_${tab.id}`" 
                  v-model="item.value">
                </ncform>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>

</template>

<style lang="stylus">
  .quickarray 
    padding 15px 0 10px
    & > legend 
      width inherit
      border-left: 6px solid #878D99
      padding: 6px
      background-color: #d8dce5
      color: #5a5e66
      font-size: 14px
      margin-bottom: 0px
      border-radius: 4px 4px 0 0
      position relative
      .btns
        position absolute
        right 6px
        bottom 0px
        .van-icon
          font-size 20px
          margin-right 8px
        .arrow
          display inline-block
          width 20px
          height 20px
          &.pull-up
            background url('./imgs/pullup.png')  center center no-repeat
          &.pull-down
            background url('./imgs/pulldown.png')  center center no-repeat  
    .list-item 
      border: 1px solid #d8dce5
      margin: 0px 0px 8px
      padding 8px
      .list-item-label 
        border-bottom 1px solid rgb(147,153,159)
        padding-bottom 8px
        margin 8px 0
        .title 
          display inline-block
          margin-top 2px
          font-weight 600
        .icon
          float right
          font-size 20px
    .normal-item 
      padding: 4px 8px 8px 8px
    .btn-group
      text-align right
      margin-top 15px
      .btn
        height 35px
        line-height 35px
        &:first-child
          margin-right 10px
        .van-icon
          margin-right 5px
          vertical-align middle
    .model-wrapper
      height 100%
      width 100%
      padding 0.5rem
      .content-wrapper
        padding 0.5rem 0
        .van-field
          padding 5px 0
        .content
          border 1px solid rgba(0,0,0,.1)
          margin-bottom 10px
          border-radius 5px
          .content-label
            background rgb(240,239,244)
            padding 10px
            .icons
              float right
            .van-icon
              font-size 20px
              margin-right 8px
              &.checked
                color #38f
            .arrow
              display inline-block
              width 20px
              height 20px
              &.pull-up
                background url('./imgs/pullup.png')  center center no-repeat
              &.pull-down
                background url('./imgs/pulldown.png')  center center no-repeat 
          .content-form
            padding 10px
            border-bottom 1px solid rgba(0,0,0,.5)
            &:last-child
              border-bottom none
            .header
              text-align right
              .van-icon
                font-size 20px
</style>

<script>
import {data} from "./data/mock"
import {getAttrCount} from "./utils"

const tabs=[
  {
    id:1,//目录id
    name:'奶制品'
  },
  {
    id:2,
    name:'酒类'
  },
  {
    id:3,
    name:'果汁类'
  },
  {
    id:4,
    name:'水果'
  },
    {
    id:5,
    name:'其他'
  }
];

  var superagent = require('superagent');
  import _get from "lodash-es/get";
  import _cloneDeep from "lodash-es/cloneDeep";
  import ncformCommon from '@ncform/ncform-common';
  const layoutArrayMixin = ncformCommon.mixins.vue.layoutArrayMixin;

  var skuMap=[];
  var groupMap=[];
  export default {
    mixins: [layoutArrayMixin],
    data(){
      return {
        deleteAll:false,//删除全部按钮
        showQuickArray:false,//显示父级的schema

        modelItemNum:1,//model里面的schema properties的个数
        groups:[],//选项卡
        skus:[],//sku,
        groupSkus:[],//每个目录对应的skus

        expandItem:true,
        active:1,//tab显示第几项
        openPopup:true,//模态框是否显示
        searchText:'',//搜索关键字
      }
    },
    created(){
      this.modelItemNum=getAttrCount(this.schema.items.properties);
      this.initMap();
      this.setModelSchema(this.schema.items);
      //值的操作
      console.log('schemaValue:',this.schema.value);
      this.schema.value=[];
    },
    computed:{
      hiddenBtn(){
        return this._analyzeVal(this.schema.ui.readonly);//支持dx表达式
      }
    },
    methods:{
      //初始化modelschame
      setModelSchema(items){
        this.simpleSchema={
          type:'object',
          properties:{
            skuKey:{
              type:'array',
              items:items,
              ui:{
                label:'',
                legend:'legend',
                showLegend:false,
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
        };
      },
      //请求远程数据 并打开模态框
      openModel(){
        this.openPopup=true;

      },
      //远程请求
      remoteMethod(){
        var agent=superagent.agent();
        if(this.mergeConfig.withAuthorization){
          agent.set('Authorization',JSON.parse(window.localStorage.getItem('token')))
        }
        const options = {
          url: this.mergeConfig.enumSourceRemote.remoteUrl,
          params: JSON.parse(JSON.stringify(this.otherParams))
        };
        agent.get(options.url)
          .query(options.params)
          .then(res=>{
            console.log(res);
          });
      },
      //初始化map
      initMap(){
        data.forEach(item=>{
          let id=_get(item,this.mergeConfig.idField);
          let label=_get(item,this.mergeConfig.labelField);
          let value={
            skuKey:[{[this.mergeConfig.quickItemField]:id}]
          };
          let checked=this.modelItemNum>1?true:false;
          let group=_get(item,this.mergeConfig.groupField);
          skuMap[id]={
            id:id,
            name:label,
            value:value,
            checked:checked
          };
          let groupId=group.id;
          if(groupMap[groupId]){
            groupMap[groupId].name=group.name;
            groupMap[groupId].skuIds.push(id);
          }else{
            groupMap[groupId]={id:groupId,name:group.name,skuIds:[id]};
          }
        });
        skuMap.forEach(e=>{
          this.skus.push(e);
        });
        groupMap.forEach(e=>{
          this.groups.push(e);
        })
      },
      //点击tabs
      clickTab(index,title){
        if(index>1){
          this.groupSkus=[];
          let oTab=this.$refs[`tab${index}`];
          let groupId=oTab[0].$attrs.groupId;
          let skus=groupMap[groupId].skuIds;
          skus.forEach(id=>{
            this.groupSkus.push(skuMap[id]);
          });
        }  
      },
      //模态框里面 label上的增加
      createSchema(label){
        let template=label.value.skuKey;
        let arr=[];
        for(let i=0;i<template.length;i++){
          arr.push(template[i]);
        }
        arr.push({id:1});
        label.value={
          skuKey:arr
        }
      },
      //模态框里面 label上的删除
      deleteAllSchema(label){
        console.log(1);
        let arr=[];
        label.value={
          skuKey:arr
        }
      },
      //模态框确定
      onModelSure(){
        this.openPopup=false;
        this.schema.value=[];
        this.skus.forEach(e=>{
          let skuKeys=e.value.skuKey;
          skuKeys.forEach(s=>{
            this.setValue(s);
          });
        });
      },
      //将模态框的数据塞到外层里面
      sendData(){
        console.log('schemaValue:',this.schema.value);
        let obj={id:"xxx", shuliang:2, jiage:7};
        this.setValue(obj);
      },
      setValue(obj){
        this.schema.value.push(obj);
        let idx = this.schema.value.length - 1;

        if (!this.schema.value[idx].__dataSchema) {
          const __dataSchema = _cloneDeep(this.schema.items);
          ncformCommon.ncformUtils.setValueToSchema(
            this.schema.value[idx],
            __dataSchema,
            true
          );
          this.$set(this.schema.value, idx, { __dataSchema });
        }

        if (!this.schema.value[idx].__dataSchema.__id) {
          this.schema.value[idx].__dataSchema.__id = Math.random();
        }
      }
    }
  }
</script>
