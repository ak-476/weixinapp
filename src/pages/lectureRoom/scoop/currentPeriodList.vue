<template>
  <div>
    <div v-if="resultList.length > 0">
      <ul v-for="o in resultList" @click="toDetail(o)" class="scoopList">
        <li class="listCover">
          <img :src="o.hotelImgUrl">
        </li>
        <li class="listMes">
          <div class="listMesB">
            <p>线下培训交流会—{{o.province}} {{o.city}}站</p>
            <button @click="toDetail(o)" style="font-size: 12px;" :style="{ background : o.payStatus == 'Y' ? backGround : '' , opacity : o.payStatus == 'Y' ? toumingDU : '' }" >{{ o.payStatus == 'N' ? '点击报名' : '已报名'}}
            </button>
          </div>
          <div class="listMesT">
            <p>{{o.hotelAddress}}</p>
            <p class="Tright">{{o.startTime | dateFormat('MM月dd日')}}开始</p>
          </div>
        </li>
      </ul>

    </div>
    <div v-if="showEmpty" style="width: 100%;">
      <img src="../../../assets/images/trainNone2.png" style="width: 80%;position: absolute;left: 10%;top: 30%;">
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        resultList: [],
        backGround: '#d41116',
        toumingDU: 0.6,
        buttonText: '点击报名',
        showEmpty: false
      }
    },
    mounted() {
      let that = this;
      that._Util.post(that._Api.POST_LECTURE_ROOM_CURRENT, {}, function (data) {
        if (!data.length) {
          that.showEmpty = true;
        } else {
          that.showEmpty = false;
        }
        that.resultList = data;
      }, function () {

      }, that);
    },
    methods: {
      toDetail(o) {
      	window.location.href = '/v2/lectureRoom/current/detail?id=' + o.id;
        //this.$router.push({name: 'currentPeriodDetail', query: {id: o.id}});
      }
    },
    components: {}
  }
</script>
