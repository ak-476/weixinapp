<template>
  <div  class="personalIndex" style="min-height:100%;">
    <div style="min-height: 100%;background: #EDEDED;overflow-y: scroll;"  v-if="!listOrder">
      <div class="myOrder">

        <!-- 未付款商品 -->
        <div v-for="v in resultList" @click="toDetail(v)" class="orderList notpay">
          <!--<router-link :to="{name: 'memberOrderDetail', params: {id: v.orderId}}">-->
          <div class="orderId">
            <p v-if="v.orderType == 'BUYING'">物流单号：<span>{{v.expressNo}}</span></p>
            <p>{{_Enums.ENUMS_ORDER_STATUS[v.orderStatus]}}</p>
          </div>

          <div class="orderNum">
            <Order-detail v-for="(o, index) in v.itemBeanList" v-if="!index"
                          :order="o" :show-time="true"></Order-detail>
            <p v-if="v.itemBeanList && v.itemBeanList.length > 1" class="lookAll">
              <!--<router-link :to="{name: 'memberOrderDetail', params: {id: v.orderId}}">-->
              查看全部{{v.itemBeanList.length}}件商品
              <!--</router-link>-->
            </p>
            <div v-for="x in v.itemBeanList" v-if="v.itemBeanList &&　v.itemBeanList.length > 0" style="text-align: right;margin: 0 10px;border-top:none;height: auto;line-height: 25px">
              <p v-if="x.couponPrice != 0">
                {{x.mdseName}}<span v-if="x.couponPrice != 0">：￥</span>
                <span class="priceAll"  v-if="x.couponPrice != 0">-{{x.couponPrice | numberToFixed(2)}}</span>
              </p>

            </div>
            <!--<p class="getAllPrice">精修大师现金券：<span>￥</span><span class="priceAll">{{v.totalAmount}}</span></p>-- >
            <!--<p class="getAllPrice">示波器现金券：<span>￥</span><span class="priceAll">{{v.totalAmount}}</span></p>-->
            <p class="getAllPrice">合计：<span>￥</span><span class="priceAll">{{ (v.totalAmount - (v.couponPrice || 0)) | numberToFixed(2)}}</span></p>
            <div v-if="v.orderStatus == 1">
              <button @click.stop="cancel(v)" class="order_cancel">取消</button>
              <button @click.stop= "pay(v)" class="order_ensure">付款</button>
            </div>
          </div>
          <!--</router-link>-->
        </div>
      </div>
    </div>
    <div v-if="listOrder" style="height: 100%;" class="dingdandiv">
      <p style="text-align: center;font-size: 18px;">您还没有下过任何订单哦~</p>
    </div>

  </div>
</template>
<script type="text/babel">
  import OrderDetail from '../../../../components/common/order/orderDetail.vue'

  export default{
    data(){
      return {
        resultList: [],
        listOrder: false,
      }
    },
    mounted() {
      let that = this;
      that._fetchData(that);
    },
    methods: {
      cancel(o) {
        let that = this;
        that._Util.showMsgBoxConfirm('确认取消订单吗？', action => {
          if (action) {
            that._Util.post(that._Api.POST_MEMBER_PERSONAL_CANCEL_ORDER, {id : o.orderId}, (data) => {
              that._Util.showToast('取消成功');
              that._fetchData();
            }, () => {

            }, that);
          }
        });
      },
      toDetail(o) {
        window.location.href = '/v2/business/pay/peyOrder?id=' + o.orderId;
        //this.$router.push({name: 'memberOrderDetail', query: {id: o.orderId}})
      },
      _fetchData(self) {
        let that = this;

        that._Util.post(that._Api.POST_MEMBER_PERSONAL_ORDER_LIST, {}, (data) => {
          that.resultList = data;
          if(that.resultList.length){
            that.listOrder = false;
          }else{
            that.listOrder = true;
          }
          that._Util.log(data)
        }, () => {

        }, that);
      },
      pay(v) {
        let that = this;
        that._Util.post(that._Api.POST_WXAUTH_PAY, {
          orderId: v.orderId,
          attach: v.attach
          //description: description
        }, (data) => {
          WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(data.jsApiParameters), (res)=> {
            WeixinJSBridge.log(res.err_msg);
            if (res.err_msg == "get_brand_wcpay_request:ok") {

              window.location.reload();
            } else {
              //原先做订单删除动作，这样可能会导致微信通知找不到订单的状况，现在做删除
            }
          });


        }, () => {

        }, that, true);
      },
    },
    components: {
      OrderDetail
    }
  }
</script>
