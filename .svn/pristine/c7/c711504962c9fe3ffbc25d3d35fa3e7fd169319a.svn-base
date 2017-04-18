<template>
  <div style="min-height: 100%;">
    <div style="background: #EDEDED;min-height: 100%;">
      <div class="regeditMy">
        <div v-if="showMember" class="roomCost">
          <p>共轨之家年费会员：300元</p>
          <p class="cost">￥300.00</p>

        </div>
        <div class="roomCost">
          <p>会场费用：100元/天*2天=200元</p>
          <p class="cost">￥200.00</p>
        </div>
        <div @click="selectCost()" class="stayCost">
          <p>住宿预定费用：100元</p>
          <p class="cost">￥100.00</p>
          <span :class="{'active': stay}"></span>
          <input type="checkbox">
        </div>
      </div>

      <div class="regeditCost">
        <p>共计：<span>￥</span>
          <span>
          {{showMember ? (500 + (stay ? 100 : 0)) : ((stay ? 100 : 0) + 200)}}.00
        </span>
        </p>
        <a href="javascript: void(0);" @click="save()" style="background: #d41116">下一步</a>
      </div>
    </div>

  </div>
</template>
<script type="text/babel">
  export default{
    data(){
      return {
        userStatus: '',
        stay: true,
        showMember: false
      }
    },
    mounted() {
      this.userStatus = this.$route.query.userStatus;

      let that = this;
      that._Util.post(that._Api.POST_MEMBER_SCOPE, {addressId: that.$route.query.id}, (data) => {
        that.showMember = data.verifyStatus;
      }, () => {

      }, that)

    },
    methods: {
      selectCost() {
        this.stay = !this.stay;
      },
      save() {
        let that = this;
        let merchandise = '';

        if (that.showMember) {
          merchandise += '2,';
        }

        if (that.stay) {
          merchandise += '4,'
        }

        merchandise += '3';

        that._Util.post(that._Api.POST_LECTURE_ROOM_CREATE_ORDER, {
          addressId: that.$route.query.id,
          merchandise: merchandise
        }, (data) => {
          //that._Util.setLocalStorage(that._Api.POST_URL_PARAMS_CURR_ORDER, data);
//          that.$router.replace({
//            name: 'currentPeriodPay', query: {
//              orderId: data.order.id,
//              orderNum: data.order.orderNum,
//              description: data.order.description,
//              orderPrice: data.order.orderPrice,
//              signId: data.signId,
//              stay: that.stay,
//              userStatus: that.showMember
//            }
//          });

          window.location.href = '/v2/business/pay/cost?orderId=' + data.order.id
            + '&orderNum=' + data.order.orderNum
            + '&description=' + data.order.description
            + '&orderPrice=' + data.order.orderPrice
            + '&signId=' + data.signId
            + '&stay=' + that.stay
            + '&userStatus=' + that.showMember
        }, () => {

        }, that);
      }
    },
    components: {}
  }
</script>

