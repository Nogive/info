<template>
  <div class="sell-point">
    <van-tabs v-model="active">
      <van-tab title="我的售点">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="sell-wrapper">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="loadMore"
          >
            <ul class="sell-list">
              <li class="sell-item" v-for="(item,index) in list" :key="index" @click="goCustom">
                <div class="content">
                  <p class="name">{{item.name}}-{{index}}</p>
                  <p class="desc">{{item.describe}} <span class="fr dis">{{item | computeDix}}</span></p>
                </div>
              </li>
            </ul>
          </van-list>
        </div>
      </van-tab>
    <van-tab title="我能看到的售点">
       <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      我能看到的售点
    </van-tab>
  </van-tabs>
  </div>
</template>
<style lang="stylus" scoped>
@import "../../common/css/mixin.styl"
.sell-point
  .sell-wrapper
    padding 0.5rem
    .sell-list
      .sell-item
        padding 0.5rem 0 .3rem
        border-1px(rgba(7,17,27,.1))
        .content
          .name
            font-size .6rem
          .desc
            font-size .5rem
            color rgb(147,153,159)
            .dis
              color #38f
</style>
<script>
export default {
  name:'sell-point',
  data(){
    return {
      active:0,
      loading:false,
      finished:true,
      value:'',
      list:[
        {
          id:1,
          name:'xx商超',
          describe:'create by hehe',
          lat:'0',
          lng:'0'
        },
        {
          id:1,
          name:'xx商超',
          describe:'create by haha',
          lat:'0',
          lng:'0',
        },
        {
          id:1,
          name:'xx商超',
          describe:'create by xixi',
          lat:'0',
          lng:'0',
        },
        {
          id:1,
          name:'xx商超',
          describe:'create by haha',
          lat:'0',
          lng:'0',
        },
        {
          id:1,
          name:'xx商超',
          describe:'create by xixi',
          lat:'0',
          lng:'0',
        }
      ]
    }
  },
  filters:{
    computeDix:function(value){
      //console.log(value);
      return "100m";
    }
  },
  created(){
    console.log(this.$route.params.mode);
  },
  methods:{
    loadMore(){
      console.log("加载更多");
    },
    onSearch(){
      console.log('搜索');
    },
    goCustom(){
      this.$router.push('/custom')
    }
  }
}
</script>

