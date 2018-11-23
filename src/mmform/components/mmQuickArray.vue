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
      <van-tabs v-model="active">
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
                  <van-icon v-if="!test" name="add-o" @click="createSchema(label)"></van-icon>
                  <van-icon v-else name="passed" :class="{checked:label.checked}" @click="label.checked=!label.checked"></van-icon>
                </div>
              </div>
              <div class="content-form">
                <!-- <ncform 
                  :form-schema="schemaMap[label.id]" 
                  :form-name="`schema${label.id}`" 
                  v-model="schemaMap[label.id].value">
                </ncform> -->
                <ncform 
                  :form-schema="schema" 
                  :form-name="`schema${label.id}`" 
                  v-model="label.value">
                </ncform>
              </div>
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
          showLegend:false,
          readonly:'dx: {{$const.mode}}=="view"',
          widget:'mm-array',
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
  const schema2={
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
          widget:'mm-array',
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
      name:'牛奶',
      checked:true,
      schema:schema,
      value:{
        example:[
          {
            shuliang:0,
            jiage:0
          },
          {
            shuliang:1,
            jiage:1
          }
        ]
      }
    },
    {
      id:2,
      name:'啤酒',
      checked:false,
      schema:schema2,
      value:{
        example:[
          {
            shuliang:2,
            jiage:2
          },
          {
            shuliang:3,
            jiage:3
          }
        ]
      }
    },
    // {
    //   id:3,
    //   name:'果汁'
    // },
    // {
    //   id:4,
    //   name:'可乐'
    // },
    // {
    //   id:5,
    //   name:'椰子汁'
    // }
  ];
 
  const schemaMap={
    1:schema,
    2:schema2
  };
  import ncformCommon from '@ncform/ncform-common';
  export default {
    mixins: [ncformCommon.mixins.vue.controlMixin],
    data(){
      return {
        test:false,
        openPopup:true,//是否打开弹框
        tabs:tabs,//目录数组
        skus:skus,//标签数据
        active:1,//当前显示哪一个标签页
        checked:false,//是否勾选
        searchText:"",//搜索框内容
        schemaMap:schemaMap,
        schema:schema,
        defaultConfig:{
          legend:'quick array',
          title:'sku'
        }
      }
    },
    created(){
      console.log(this.config.schema.value);
      // this.modelVal={
      //   id:1
      // };
      //console.log('readonly:',this.hiddenBtn);
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
      createSchema(sku){
        console.log(sku);
      }
    }
  }
</script>
