<template>
  <div class="quickarray">
    <legend class="legend" v-if="mergeConfig.legend" @click="collapse()">
      {{mergeConfig.legend}}
      <i class="arrow" :class="{'pull-up': !mergeConfig.collapsed, 'pull-down': mergeConfig.collapsed}"></i>
    </legend>
    <div v-show="!mergeConfig.collapsed" class="list-item">
      <div class="list-item-label">
        <label class="title">{{mergeConfig.title}}</label>
        <van-icon v-if="!hiddenBtn" name="add-o" @click="openPopup=true" class="icon"></van-icon> 
      </div>
    </div>

    <!-- model -->
    <van-popup v-model="openPopup" class="model-wrapper" position="right" :overlay="false">
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="确定"
        left-arrow
        @click-left="openPopup=false"
        @click-right="openPopup=false"
      />
      <van-tabs>
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
            <div class="content" v-for="(label,index) in skus" :key="index">
              <div class="content-label">
                <label class="title">{{label.name}}</label>
                <div class="icons">
                  <van-icon v-if="!test" name="add-o" @click="addItem()"></van-icon>
                  <van-icon v-else-if="checked" name="checked" :class="{checked:checked}"></van-icon>
                  <van-icon v-else name="passed" :class="{checked:checked}"></van-icon>
                  <van-icon name="delete" @click="delAllItems"></van-icon>
                </div>
              </div>
              <!-- <div class="content-form" v-for="(dataItem, idx) in schema.value" :key="dataItem.__dataSchema.__id">
                <div class="header">
                  <van-icon name="close" @click="delItem(idx)"></van-icon> 
                </div>
                <template v-if="isNormalObjSchema(dataItem.__dataSchema)">
                  <ncform-object :schema="dataItem.__dataSchema" :form-data="formData" :idx-chain="(idxChain ? idxChain + ',' : '') + idx" :config="dataItem.__dataSchema.ui.widgetConfig" :show-legend="false">
                    <template v-for="(fieldSchema, fieldName) in (dataItem.__dataSchema.properties || {__notObjItem: dataItem.__dataSchema})" :slot="fieldName">
                      <slot :name="fieldName" :schema="fieldSchema" :idx="idx"></slot>
                    </template>
                  </ncform-object>
                </template>
              </div> -->
            </div>
          </div>
        </van-tab>
        <van-tab v-for="(item,index) in tabs" :title="item.name" :key="index">
          <div class="content-wrapper">
            类别ID: {{ item.id }}
          </div>
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>

</template>

<style lang="stylus">
  .quickarray
    padding 15px 0 10px
    .legend 
      width inherit
      border-left: 6px solid #878D99
      padding: 6px
      background-color: #d8dce5
      color: #5a5e66
      font-size: 14px
      margin-bottom: 0px
      border-radius: 4px 4px 0 0
      position relative
      .arrow
        display inline-block
        width 20px
        height 20px
        position absolute
        right 6px
        bottom 5px
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
              &:last-child
                margin-left 10px
              &.checked
                color #38f
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
  const skus=[
    {
      id:1,
      name:'牛奶'
    },
    {
      id:2,
      name:'啤酒'
    },
    {
      id:3,
      name:'果汁'
    },
    {
      id:4,
      name:'可乐'
    },
    {
      id:5,
      name:'椰子汁'
    }
  ];
  import ncformCommon from '@ncform/ncform-common';
  export default {
    mixins: [ncformCommon.mixins.vue.controlMixin],
    data(){
      return {
        test:false,
        openPopup:true,//是否打开model
        tabs:tabs,//目录数组
        skus:skus,//标签数据
        checked:true,//是否勾选
        searchText:"",//搜索框内容
        defaultConfig:{
          legend:'quick array',
          title:'sku'
        }
      }
    },
    created(){
      console.log(this.config);
      this.modelVal={
        id:1
      }
    },
    computed:{
      hiddenBtn(){
        return this._analyzeVal(this.readonly);//支持dx表达式
      }
    },
    methods:{
      // you can handle the modelVal before $emit it (before this.$emit('input'))
      _processModelVal (modelVal) {
        return modelVal
      },
    }
  }
</script>
