<template>
  <div class="regeditPay" style="height: 100%;">
    <div style="min-height: 100%;background: #EDEDED">
      <div class="regeditOrder">
        <p class="regeditOrderL">
          <span>订单号</span>
          <span>{{$route.query.orderNum}}</span>
        </p>
        <p class="regeditOrderR">
          待支付
        </p>
      </div>

      <p v-if="$route.query.userStatus == 'true'" class="orderCost">
        <span>共轨之家年费会员：</span>
        <span>300元</span>

      <p class="orderCost">
        <span>会场费用：</span>
        <span>100元/天*2天=200元</span>
      </p>
      <p v-if="$route.query.stay == 'true'" class="orderCost">
        <span>住宿预定费用：</span>
        <span>100元</span>
      </p>
      <div class="orderPrice">
        <span>￥</span><span>
        {{$route.query.userStatus == 'true' ? (500 + ($route.query.stay == 'true' ? 100 : 0)) : (($route.query.stay == 'true' ? 100 : 0) + 200)}}.00
      </span>
      </div>

      <button @click="pay()" class="wxPay" style="background: #d41116">微信支付</button>
    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return {
        paramsData: this._Util.getLocalStorage(this._Api.POST_URL_PARAMS_CURR_ORDER),
        userStatus: false
      }
    },
    methods: {
      pay() {
        let that = this;
        that._Util.post(that._Api.POST_WXAUTH_PAY, {
          orderId: that.$route.query.orderId,
          description: that.$route.query.description,
          attach: that.$route.query.signId
        }, function (data) {
//          that.$router.replace({
//            name: 'memberRenewSuccess',
//            query: {
//              name: 'memberMyOrder',
//              operType: 1
//            }
//          });
//
//          return;
          WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(data.jsApiParameters), function(res) {
            WeixinJSBridge.log(res.err_msg);
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              //that._Util.showToast('支付完成');
              that.$router.replace({
                name: 'memberRenewSuccess',
                query: {
                  name: 'memberMyOrder',
                  operType: 3
                }
              });

              //that.$router.replace({name: 'memberMyOrder', query: {}});
            } else {
              //原先做订单删除动作，这样可能会导致微信通知找不到订单的状况，现在做删除
            }
          });
        }, function () {

        }, that, true);
      }
    },
    components: {}
  }
</script>
