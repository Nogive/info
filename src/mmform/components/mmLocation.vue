<template>
  <div class="location">
    <van-cell-group v-show="!hidden">
      <van-field 
        v-model="address" 
        placeholder="点击右侧定位图标进行定位" 
        type="textarea"
        rows="1"
        autosize
        readonly
        @click="showMapContent">
        <div slot="icon" class="icon-wrapper">
          <van-icon v-if="locateBtn" name="location" @click.stop="onLocation"></van-icon>
          <van-icon v-if="clearable" name="clear" @click.stop="clearLocation"></van-icon>
        </div>
      </van-field >
    </van-cell-group>

    <van-popup v-model="showMap" class="addr-box">
      <div class="addr-text">
        <van-row gutter=5>
          <van-col :span="21" class="search-box">
            <input class="text" type="text" v-model="address" id="address" :readonly="!drag">
            <ul class="tip" v-show="startSearch">
              <li class="tip-item" v-for="(item,index) in tipRes" :key="index" @click.stop.prevent="selectRes(item)">{{item.name}}</li>
            </ul>
          </van-col>
          <van-col :span="3">
            <div class="icon-btns">
              <van-icon v-if="drag" class="icon" name="search" @click="onSearch"></van-icon>
              <van-icon v-else class="icon" name="location" @click="onLocation"></van-icon>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="map-content">
        <div class="drag-map">
          <div id="mapContainer" class="mapmap"></div>
          <van-icon v-if="drag" name="location" class="location-btn" @click.stop="onLocation"></van-icon>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import ncformCommon from '@ncform/ncform-common'
import {onLocationByDing,onLocationByCordova} from "./utils"
import AMap from 'AMap'
import AMapUI from 'AMapUI'
var map;
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],
  data () {
    let _this=this;
    return {
      isLocate:false,
      clearable:false,//清除按钮
      locateBtn:true,//定位按钮
      showMap:false,//显示地图
      startSearch:false,//开始搜索
      address:'',//地址
      center:[],
      lat:0,//纬度
      lng:0,//精度
      tipRes:[],
      defaultConfig:{
        drag:false,
      }
    }
  },
  mounted(){
    this._initMap();
  },
  watch:{
    value(){
      if(this.value){
        this.address=this.value.address;
        this.lng=this.value.lng;
        this.lat=this.value.lat;
        map.setCenter([this.lng,this.lat]);
      }
    },
    address(){
      if(this.address&&this.address!=""){
        this.clearable=true;
      }else{
        this.clearable=false;
      }
    }
  },
  computed:{
    drag(){
      return this._analyzeVal(this.config.drag);
    }
  },
  methods: {
     _processModelVal (modelVal) {
      return modelVal;
    },
    _initMap(){
      let _this=this;
      map = new AMap.Map('mapContainer', {
        center: [this.lng,this.lat],
        zoom: 15,
        dragEnable:this.drag
      });
      //定位插件
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          showButton:false,//是否显示定位按钮
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        _this.geolocation=geolocation;
      });
    },
    onLocation(){
      this.locateBtn=false;
      this.$toast('开始定位...');
      this.isLocate=true;
      let _this=this;
      if(window.dd &&(window.dd.android||window.dd.ios)){
        onLocationByDing(40).then(res=>{
          console.log('endsuccess:',res);
          _this.modelVal={
            address:res.address,
            lng:res.longitude,
            lat:res.latitude
          };
          _this.locateBtn=true;
          _this.isLocate=false;
        },err=>{
          if(err.err){
            console.log('endErr:',err);
          }
           _this.$toast(err.message+'错误码：'+err.code);
           _this.locateBtn=true;
           _this.isLocate=false;
        })
      } else if(window.device){
        onLocationByCordova().then(res=>{
          _this.modelVal={
            address:res.address,
            lng:res.longitude,
            lat:res.latitude
          };
          _this.locateBtn=true;
          _this.isLocate=false;
        },err=>{
          console.log(err);
        })
      }else{
        this.onLocationByGaode();
      }
    },
    onLocationByGaode(){
      var _this=this;
      this.geolocation.getCurrentPosition(function(status,result){
        _this.locateBtn=true;
        _this.isLocate=false;
        if(status=='complete'){
          _this.modelVal={
            address:result.formattedAddress,
            lng:result.position.lng,
            lat:result.position.lat
          };
        }else{
          _this.$toast('定位失败，请检查GPS是否打开，或到空旷的地方重新定位 错误码：3')
        }
      });
    },
    onDrag(){
      let _this=this;
      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        var positionPicker = new PositionPicker({
          mode: 'dragMap',//拖拽地图模式
          map: map
        });
        positionPicker.on('success', function(positionResult) {
          _this.modelVal={
            address:positionResult.address,
            lng:positionResult.position.lng,
            lat:positionResult.position.lat
          }
        });
        positionPicker.on('fail', function(positionResult) {
          console.log('拖拽出现问题，请保证网络环境，稍后重试~');
        });
        positionPicker.start();
      });
    },
    showMapContent(){
      if(this.isLocate){
        this.$toast('系统正在进行定位，请稍候再试~');
      }else{
        this.showMap=true;
        if(this.address==""){
          this.$nextTick(()=>{
            this._initMap();
            this.onLocation();
            this.onDrag();
          })
        }else{
          this.$nextTick(()=>{
            this._initMap();
            this.onDrag();
          })
        }
        // this.showMap=true;
        // this.$nextTick(()=>{
        //   this._initMap();
        //   this.onDrag();
        // })
      }
    },
    onSearch(){
      let _this=this;
      let key=this.address;
       AMap.plugin('AMap.PlaceSearch', function(){
        var autoOptions = {
          city: '全国'
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(key, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if(result.info=="OK"){
            _this.tipRes=result.poiList.pois;
            _this.startSearch=true;
          }else{
            Toast('查询无结果');
          }
        })
      })
    },
    selectRes(item){
      this.modelVal={
        address:item.name,
        lng:item.location.lng,
        lat:item.location.lat
      };
      this.startSearch=false;
      this._initMap();
      this.onDrag();
    },
    clearLocation(){
      this.modelVal={
        address:'',
        lng:0,
        lat:0
      };
    }
  }
}
</script>
<style scoped lang="stylus">
.location
  padding 10px 0
  .van-field
    padding 10px 0 10px 15px
    .icon-wrapper
      width 65px
      .van-icon
        display inline-block
        width 24px
        font-size 24px
        float right
        &:first-child
          margin-left 10px
  .addr-box
    width 100%
    padding 10px 0
    .addr-text
      padding-left 8px
      .search-box
        position relative
        .text
          width 100%
          height 35px
          border 1px solid rgba(7,17,27,.3)
          border-radius 3px
          padding 0 8px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          font-size 12px
        .tip
          width calc(100% - 5px)
          min-height 310px
          overflow-y auto
          position absolute
          z-index 2
          border 1px solid rgba(7,17,27,.3)
          background #ffffff
          .tip-item
            border-bottom 1px solid rgba(7,17,27,.3)
            padding 6px 8px
            font-size 12px
            &.tip-item:last-child
              border-bottom none
      .icon-btns
        width 100%
        height 35px
        position relative
        .icon
          font-size 24px
          position absolute
          right 8px
          top 5px
    .map-content
      margin-top 10px
      height 300px
      .map-box,.drag-map
        width 100%
        height 100%
      .map-box
        .m-img
          width 100%
          height 100%
      .drag-map
        position relative
        .mapmap
          width 100%
          height 100%
        .location-btn
          position absolute
          font-size 30px
          color rgb(0,160,220)
          right 10px
          bottom 10px  
</style>
