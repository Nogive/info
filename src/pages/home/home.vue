<template>
  <div class="pos">
    <div class="pos-wrapper clearfix">
      <van-row class="mb10">
        <van-col span="6">
          <router-link :to="'/sell_point/'+mode.info">
            <i class="iconfont red">&#xe61b;</i>
            <h5 class="title">售点信息</h5>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/jinhuo">
            <i class="iconfont orange">&#xe649;</i>
            <h5 class="title">进货信息</h5>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/xiaohuo">
            <i class="iconfont green">&#xe656;</i>
            <h5 class="title">销货信息</h5>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/kucun">
            <i class="iconfont blue">&#xe616;</i>
            <h5 class="title">库存信息</h5>
          </router-link>
        </van-col>
      </van-row>
      <van-row class="mb10">
        <van-col span="6">
          <router-link to="/visitation">
            <i class="iconfont red">&#xe60a;</i>
            <h5 class="title">售点拜访</h5>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/">
            <i class="iconfont blue">&#xe616;</i>
            <h5 class="title">销货统计</h5>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="pos-wrapper clearfix">
      <van-row>
        <van-col span="6">
          <router-link to="/test">
            <i class="iconfont">&#xe68c;</i>
            <h5 class="title">测试</h5>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/form">
            <i class="iconfont">&#xe68c;</i>
            <h5 class="title">ncform</h5>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/other">
            <i class="iconfont">&#xe68c;</i>
            <h5 class="title">other</h5>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
@import "../../common/css/mixin.styl"
.pos
  padding .5rem
 .pos-wrapper
    padding-bottom 0.5rem
    text-align center
    border-1px(rgba(7,17,27,.1))
    &:last-child
      border-none()
    .mb10
      margin-bottom 0.5rem
    .iconfont
      font-size 1.5rem
      &.red
        color rgb(244,71,63)
      &.orange
        color rgb(251,128,68)
      &.blue
        color #38f
      &.green
        color rgb(0,175,136)
    .title
      font-size .5rem
</style>
<script>
import constants from "@/common/js/constant.js"
export default {
  name:'home',
  data(){
    return {

    }
  },
  created(){
    this.mode=constants.pages.mode;
  }
}
</script>


