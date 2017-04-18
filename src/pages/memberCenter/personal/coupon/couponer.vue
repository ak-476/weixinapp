<template>
  <div class="couponIndex" style="overflow-y: scroll">
    <Nav-menu-component :nav-menus="navMenus" :checkIndex="checkIndex" :class="className"
                        :showNumber="showNumber"></Nav-menu-component>

    <div class="couponB" v-if="conponResults.broadCoupon && couponNumber" @click="toBenben()">
      <img src="../../../../assets/images/youhuiquan2.png" alt="">
      <div class="couponBleft">
        <div>
          <p>免费收看犇犇课堂任一课程</p>
          <p>适用范围：犇犇课堂</p>
          <p>有效期：永久</p>
        </div>
      </div>
      <div class="couponBright">
        <p>听课券</p>
        <p style="margin-left: 45px">x{{ couponNumber }}</p>
      </div>
    </div>
    <div class="couponCash" v-if="conponResults.cashCoupon" v-for="h in conponResults.cashCoupon" @click="toShopping(h)">
      <div class="couponB">
        <img src="../../../../assets/images/youhuiquan1.png" alt="">
        <div class="couponBleft">
          <div>
            <p>{{h.couponName}}</p>
            <p>有效期：{{ h.effectTime | dateFormat('yyyy.MM.dd') }}-{{ h.outTime | dateFormat('yyyy.MM.dd') }}</p>

            <p class="nosouce" v-if="h.couponRemark">*{{h.couponRemark}}</p>
          </div>
        </div>
        <div class="couponBright">
          <p style="font-size: 20px;">￥{{ h.amount }}</p>
        </div>
      </div>
    </div>
    <!--<div @click="moreRecord()">-->
    <!--加载更多-->
    <!--</div>-->
  </div>
</template>
<script type="text/babel">
  import NavMenuComponent from '../../../../components/common/navMenuComponent.vue'

  export default{
    data(){
      return {
        checkIndex: 0,
        navMenus: [
          {
            title: '未使用',
            url: '',
            type: 2,
            className: '',
            navNumber: 0,
            active: true
          }, {
            title: '已使用',
            url: '',
            type: 3,
            className: '',
            navNumber: 0,
            active: false
          }, {
            title: '已过期',
            url: '',
            type: 4,
            className: '',
            navNumber: 0,
            active: false,
          }
        ],
        couponNumber: 0,
        className: 'tabnav tabnav2 coupontab',
        items: [
          {title: '优惠券1'},
          {title: '优惠券2'},
          {title: '优惠券3'},
          {title: '优惠券4'},
          {title: '优惠券5'},
        ],
        showNumber: 'false',
        conponResults: {
          broadCoupon: {},
          cashCoupon: []
        },
        cashLength: 0,
        cardNumList: {
          broadCoupon: {},
          cashCoupon: []
        }
      }
    },

    mounted() {

      let that = this;
      that.$on('checkMenu', (obj) => {
        that.checkIndex = obj;
        that.getConpon();
      });
      that.cardNumGet();

    },

    methods: {
      moreRecord() {
        let that = this;
        let arrIndex = that.items.length;
        for (let i = 0, len = 5; i < len; i++) {
          that.items.push({title: '优惠券' + (i + arrIndex + 1)});
        }
      },
      getConpon(){
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_COUPON, {type: that.navMenus[that.checkIndex].type}, (data) => {
          that.conponResults = data;
          if( that.checkIndex  == 0 ){
            that.couponNumber = that.conponResults.broadCoupon.cardNumLeft;
          } else if( that.checkIndex  == 1 ){
            that.couponNumber = that.conponResults.broadCoupon.cardUsed;
          } else if( that.checkIndex  == 2 ){
            that.couponNumber = 0;
          }

        }, () => {

        }, that)
      },
      cardNumGet(){
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_COUPON, {type: 2}, (data) => {
          that.conponResults = data;
          if(that.conponResults.cashCoupon){
            that.cashLength = that.conponResults.cashCoupon.length;
          } else {
            that.cashLength = 0;
          }
          that.navMenus[0].navNumber = that.conponResults.broadCoupon.cardNumLeft + that.cashLength;
          that.couponNumber = that.conponResults.broadCoupon.cardNumLeft;

        }, () => {

        }, that)
      },
      toBenben(){
        window.location.href = this._Api.HOSTOLD + 'wxauth/broadcast/index.htm?winzoom=1'
      },
      toShopping(obj){
        let that = this;
        if(obj.couponClass != 4){
          window.location.href = that._Api.HOSTOLD + 'wxauth/wxpay/userBuying.htm'
        } else {
          window.location.href = '/v2/business/pay/certificationRenewal';
        }

      }
    },

    components: {
      NavMenuComponent
    }
  }
</script>
