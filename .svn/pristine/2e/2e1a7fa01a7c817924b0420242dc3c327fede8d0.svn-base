<template>
  <div class="h_gift">
    <div class="h_gift1">
      <ul>
        <!-- 顶部tab -->
        <li @click="checkIndex = 2">
          <a :class="{active: checkIndex == 2}" class="gift1_a2">
            <div>
              <span class="span1"></span><br>
              <span class="span2">未领取</span>
              <p v-if="wlqResult.length">{{wlqResult.length}}</p>
            </div>
          </a>
        </li>
        <li @click="checkIndex = 1">
          <a :class="{active: checkIndex == 1}" class="gift1_a1">
            <div>
              <span class="span1"></span><br>
              <span class="span2">已领取</span>
            </div>
          </a>
        </li>

      </ul>
    </div>




    <!-- 未领取 -->
    <div v-if="checkIndex == 2" class="h_gift2 getNot" hidden="" style="display: inline;">
      <div style="background: #EDEDED;overflow: hidden">
        <div class="giftmations" style="background: white">
          <p>2017会员礼品</p>
          <div style="margin: 10px">
            <p>4月：SCR精品维修宝典；</p>
            <p>6月：2017年原创特刊；</p>
            <p>8月：整车起动电路图集；</p>
            <p>10月：神秘礼物；</p>
            <p>12月：2018年新年知识台历</p>
          </div>

        </div>
        <div style="padding: 10px;background: white;">
          <span style="font-size: 14px;color: #000000">2016年付费会员礼品</span>
          <p style="font-size: 12px;">*派发完毕的礼品无法领取，请及时关注共轨之家</p>
        </div>
      </div>

      <ul v-for="(o, index) in wlqResult">
        <li class="li1">
          <img :src=" o.img">
        </li>
        <li class="li2">
          <span>{{o.name}}</span>
        </li>
        <li class="li3">
          <span>付费会员馈赠活动</span><br>
          <a :href="o.deleteFlag ? 'javascript:void(0);' : _Api.HOSTOLD + 'wxauth/memberGift/confirm.htm?giftId=' + o.id" :class="{active: o.deleteFlag}">{{o.deleteFlag ? '派发完毕' : '点击领取'}}</a>
        </li>
      </ul>
    </div>

    <!-- 已领取 -->
    <div v-if="checkIndex == 1" class="h_gift2 getYet" style="display: inline;">
      <ul v-for="(o, index) in ylqResult">
        <li class="li1">
          <img :src="o.giftImg">
        </li>
        <li class="li2">
          <span>{{o.giftName}}</span>
        </li>
        <li class="li3">
          <span>付费会员馈赠活动</span><br>
          <a @click="searchLogistics(o)" href="javascript: void(0);">查看物流</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">

  export default{
    data(){
      return {
        wlqResult: [],
        ylqResult: [],
        checkIndex: 2
      }
    },
    mounted() {
      this.getList(2);
    },
    methods: {
      getList(type) {
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_GET_GIFT, {
          type: type
        }, (data) => {
          if (type == 2) {
            data[0].deleteFlag = true;
            that.wlqResult = data;
          } else {
            that.ylqResult = data;
          }
        }, () => {

        }, that);
      },
      searchLogistics(o) {
        if (!o.expressNo) {
          that._Util.showMsgBox('包裹等待揽收,暂无物流信息。');
          return;
        }
        location.href = this._Api.HOSTOLD + 'wxauth/express.htm?type=' + o.expressChannel + '&no=' + o.expressNo;
      }
    },
    watch: {
      checkIndex: function (val, oldVal) {
        this.getList(val);
      }
    },
    components: {
    }
  }
</script>
