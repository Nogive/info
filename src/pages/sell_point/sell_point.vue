<template>
  <div class="sell-point">
    <h1 class="title">{{$route.meta.title[$route.params.mode]}}列表</h1>
    <div class="sell-wrapper">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="loadMore"
      >
        <ul class="sell-list">
          <li class="sell-item" v-for="(item,index) in list" :key="index">
            <div class="content">
              <p class="name">{{item.name}}-{{index}}</p>
              <p class="desc">{{item.describe}} <span class="fr dis">{{item | computeDix}}</span></p>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
@import "../../common/css/mixin.styl"
.sell-point
  padding 0.5rem
  .title
    font-size .7rem
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
      loading:false,
      finished:true,
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
  methods:{
    loadMore(){
      console.log("加载更多");
    }
  }
}
</script>

