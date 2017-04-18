<style>
  .ProvCityBoxBg {
    background: rgba(0, 0, 0, .7);
    z-index: 200;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .ProvCityBox {
    position: fixed;
    z-index: 300;
    background: #fff;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .ProvCityHeader {
    background-color: #eee;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    text-align: center;
    font-size: 16px !important;
  }

  .ProvCityHeaderCancle {
    float: left;
    padding: 0 20px;
    color: #ff5657;
    font-size: 16px !important;
  }

  .ProvCityHeaderConfirm {
    float: right;
    padding: 0 20px;
    color: #ff5657;
    font-size: 16px !important;
  }

  .ProvCityContent {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    height: 245px;
    overflow: hidden;
  }

  .ProvCityContentList {
    float: left;
    width: 33.333333%;
    text-align: center;
  }

  .ProvCityContentList ul {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }

  .ProvCityContentList ul.province_dragging,
  .ProvCityContentList ul.city_dragging,
  .ProvCityContentList ul.area_dragging {
    -webkit-transition: none;
    transition: none;
  }

  .ProvCityContentList li {
    line-height: 35px;
    height: 35px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px !important;
  }

  .ProvCityContentList li.current {
    font-size: 16px !important;
    font-weight: bold;
  }

  .ProvCityContentList li.node1 {
    font-size: 15px !important;
    opacity: .7;
  }

  .ProvCityContentList li.node2 {
    font-size: 14px !important;
    opacity: .5;
  }

  .ProvCityContentList li.node3 {
    font-size: 12px !important;
    opacity: .3;
  }

  .ProvCitySelectedTop {
    width: 100%;
    border: none;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 105px;
    margin: 0;
    height: 0;
  }

  .ProvCitySelectedBottom {
    width: 100%;
    border: none;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 140px;
    margin: 0;
    height: 0;
  }

  .expand-select-enter-active, .expand-select-leave-active {
    transition: all .4s ease;
    bottom: 0px;
  }

  .expand-select-enter, .expand-select-leave-active {
    transform: translate(0, 289px);
  }
</style>
<template>
  <div class="ProvCityBoxWarp">
    <div class="ProvCityBoxBg" v-show="show" @click="cityCancel()" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
    <transition name="expand-select">
      <div class="ProvCityBox" v-show="show" @mousewheel="_stopDef">
        <div class="ProvCityHeader">
          <div class="ProvCityHeaderCancle" @click="cityCancel()">{{cancel}}</div>
          {{title}}
          <div class="ProvCityHeaderConfirm" @click="submit()">{{confirm}}</div>
        </div>
        <div class="ProvCityContent">
          <div class="ProvCityContentList">
            <ul ref="provinceList"
                :class="{'province_dragging': provinceState.dragging}"
                @touchstart="_onTouchStart('province', $event)"
                @mousedown="_onTouchStart('province', $event)"
                :style="{'transform' : 'translate3d(0,' + provinceState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li v-for="(item, index) in provinceState.data"

                  :class="{
                                    'current': item.code === provinceState.selectedId,
                                    'node1':  Math.abs(index - provinceState.index) == 1,
                                    'node2':  Math.abs(index - provinceState.index) == 2,
                                    'node3':  Math.abs(index - provinceState.index) >= 3
                                }"
              >{{item.p}}
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="ProvCityContentList">
            <ul
              ref="cityList"
              :class="{'city_dragging': cityState.dragging}"
              @touchstart="_onTouchStart('city', $event)"
              @mousedown="_onTouchStart('city', $event)"
              :style="{'transform' : 'translate3d(0,' + cityState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li v-for="(item, index) in cityState.data"

                  :class="{
                                    'current': item.code === cityState.selectedId,
                                    'node1':  Math.abs(index - cityState.index) == 1,
                                    'node2':  Math.abs(index - cityState.index) == 2,
                                    'node3':  Math.abs(index - cityState.index) >= 3
                            }"
              >{{item.n}}
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="ProvCityContentList">
            <ul
              ref="areaList"
              :class="{'area_dragging': areaState.dragging}"
              @touchstart="_onTouchStart('area', $event)"
              @mousedown="_onTouchStart('area', $event)"
              :style="{'transform' : 'translate3d(0,' + areaState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li v-for="(item, index) in areaState.data"

                  :class="{
                            'current': item.code === areaState.selectedId,
                            'node1':  Math.abs(index - areaState.index) == 1,
                            'node2':  Math.abs(index - areaState.index) == 2,
                            'node3':  Math.abs(index - areaState.index) >= 3
                        }"
              >{{item.s}}
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <hr class="ProvCitySelectedTop">
        <hr class="ProvCitySelectedBottom">
      </div>
    </transition>

  </div>
</template>
<script type="text/babel">
  import addressData from './city.json';

  export default {
    props: {
      'result': {
        type: Object,
        default: null
      },
      'show': Boolean,
      'title': {
        type: String,
        default: '请选择'
      },
      'confirm': {
        type: String,
        default: '确定'
      },
      'cancel': {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        target: '',
        provinceState: {
          data: null,
          selectedId: null,
          index: 0,
          startPos: null,
          translateY: 0,
          startTranslateY: 0,
          dragging: false
        },
        cityState: {
          data: null,
          selectedId: null,
          index: 0,
          startPos: null,
          translateY: 0,
          startTranslateY: 0,
          dragging: false
        },
        areaState: {
          data: null,
          selectedId: null,
          index: 0,
          startPos: null,
          translateY: 0,
          startTranslateY: 0,
          dragging: false
        },
        delta: 0,
        slideEls: null,

        p: '',
        c: '',
        a: '',
        provinces: addressData.citylist,
        areas: '',
        cities: '',
      }
    },
    mounted() {
      let that = this;
      that.beforeCreate();
      that._onTouchMove = that._onTouchMove.bind(that);
      that._onTouchEnd = that._onTouchEnd.bind(that);
    },
    methods: {
      beforeCreate(){

        this.setProvince('北京');
        this.setCity('东城区');

        this.provinceState.data = this.provinces;
        this.provinceState.selectedId = 110000; //北京市  省
        this.cityState.selectedId = 110100;     //市辖区  市
        this.areaState.selectedId = 110101;     //东城区  区
      },

      setProvince(p){
        this.p = p;
        this.c = '';
        this.a = '';
        this.areas = [];
        // 根据选中的 p(省份) 值更新 cities(城市列表)
        var result = this.provinces.filter(function (v) {
          return v.p === p;
        });
        this.cityState.data = result[0].c || [];

        this.cityState.translateY = 0;
        this.cityState.index = 0;
      },
      setCity(c){
        this.c = c;
        this.a = '';

        var result = this.cityState.data.filter(function (v) {
          return v.n === c;
        });

        if (result.length) {
          this.areaState.data = result[0].a || [];
        } else {
          this.areaState.data = [];
        }

        this.areaState.translateY = 0;
        this.areaState.index = 0;

      },
      setArea(a){
        this.a = a;
      },


      submit(){
        let obj = {
          'province': this.provinceState.data[this.provinceState.index].p,
          'city': this.cityState.data.length ? this.cityState.data[this.cityState.index].n : '',
          'area': this.areaState.data.length ? this.areaState.data[this.areaState.index].s : ''
        };

        this.$parent.$emit('checkedCity', obj);
      },

      getSelectedData(index){
        let target = this.target;
        let thisData = this[target + 'State'];
        thisData.selectedId = thisData.data[index].code;
        if (target === 'province') {
          this.setProvince(thisData.data[index].p);
          if (thisData.data[index].c) {
            this.setCity(thisData.data[index].c[0].n);
          } else {
            this.setCity();
          }
        }
        if (target === 'city') {
          this.setCity(thisData.data[index].n);
        }
      },

      setPage() {
        let target = this.target;
        let thisData = this[target + 'State'];

        if (!thisData.data.length) {
        	return;
        }

        let clientHeight = this.slideEls[0]['clientHeight'];
        let total = thisData.data.length;
        let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1));
        if (goPage > 0) {
          goPage = 0;
        }
        goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1);
        let index = Math.abs(goPage);
        thisData.index = index;
        this.getSelectedData(index);
        thisData.translateY = goPage * clientHeight;
      },
      cityCancel() {
        this.$parent.$emit('areaCancel');
      },
      _getTouchPos(e) {
        return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY'];
      },
      _getElem(e){
        return Array.from(e.currentTarget.children).slice(3, -3);
      },
      _onTouchStart(target, e){
        let thisData = this[target + 'State'];
        this.target = target;
        this.slideEls = this._getElem(e);
        this.delta = 0;
        thisData.startPos = this._getTouchPos(e);
        thisData.startTranslateY = thisData.translateY;
        thisData.dragging = true;
        document.addEventListener('touchmove', this._onTouchMove, false);
        document.addEventListener('touchend', this._onTouchEnd, false);
        document.addEventListener('mousemove', this._onTouchMove, false);
        document.addEventListener('mouseup', this._onTouchEnd, false);
      },
      _onTouchMove(e) {
        let target = this.target;
        let thisData = this[target + 'State'];
        e.delta = this._getTouchPos(e) - thisData.startPos;
        thisData.translateY = thisData.startTranslateY + e.delta;
        if (Math.abs(e.delta) > 0) {
          e.preventDefault();
        }
      },
      _onTouchEnd(e) {
        let target = this.target;
        let thisData = this[target + 'State'];
        thisData.dragging = false;
        this.setPage();
        document.removeEventListener('touchmove', this._onTouchMove);
        document.removeEventListener('touchend', this._onTouchEnd);
        document.removeEventListener('mousemove', this._onTouchMove);
        document.removeEventListener('mouseup', this._onTouchEnd);
      },
      _stopDef(e){
        e.preventDefault()
      },
      getCode(itemList, str, parentId) {
        for (let i = 0; i < itemList.length; i++) {
          if (!parentId && itemList[i].name == str) {

          }
        }
      }
    }
  }
</script>
