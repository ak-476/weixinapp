<template>
  <div class="orderDetail" style="min-height: 100%;">
    <div style="min-height: 100%;background: #ededed;">
      <div v-if="result.orderStatus == 1" class="detailTimeto">
        <p class="p1">
          <img src="../../../../assets/images/20141110002.png" alt="">
        </p>
        <p class="p2">
          <span>等待买家付款</span><br>
          <span>{{countDown(result.submitTime, result.nowTime)}}</span>
        </p>
      </div>

      <div v-if="result.orderType == 'BUYING'" class="detailMation">
        <div>
          <p>收货人：<span>{{result.contactName}}</span></p>
          <p>{{result.contactInfo}}</p>
        </div>
        <p>
          <span>收货地址：</span>
          <span>{{result.province != '' ? result.province : '' + result.city != '' ? resule.city : '' + result.district != '' ? result.district : '' + result.address != '' ? result.address : ''}}</span>
        </p>
      </div>

      <div class="detailList" style="margin-bottom: 0">
        <div v-if="result.orderItems" class="lookAll" style="padding-top: 10px;">
          <Order-detail v-for="o in result.orderItems"
                        :order="o" :show-time="false" :express-no="true"></Order-detail>
        </div>

        <p class="danhao2">订单编号：<span>{{result.orderNum}}</span></p>
        <div v-if="result.orderType == 'BUYING'" class="mianfei">
          <p>免运费</p>
          <p>快递发货</p>
        </div>
      </div>

      <div class="detailsAllprice" v-if="result.couponPrice">
        <div v-for="o in result.orderItems">
            <ul v-for="i in o.couponList" v-if="o.couponList && o.couponList.length>0">
              <li v-if="i.couponPrice && i.couponPrice != 0">{{(i.couponName)}}：-￥<span>{{(i.couponPrice) | numberToFixed(2)}}</span></li>
            </ul>
        </div>
        <ul >
          <li></li>
          <li>合计：￥<span>{{(result.orderPrice - (result.couponPrice || 0)) | numberToFixed(2)}}</span></li>
        </ul>
      </div>

      <div class="detailsAllprice">
        <ul>
          <li>商品金额</li>
          <li>￥<span>{{(result.orderPrice - (result.couponPrice || 0)) | numberToFixed(2)}}</span></li>
        </ul>
        <ul v-if="result.orderType == 'BUYING'">
          <li>运费</li>
          <li>+￥<span>0.00</span></li>
        </ul>
      </div>
      <div style="height:60px "></div>
      <div class="allTopay">
        <p>共计：<span>￥</span><span>{{(result.orderPrice - (result.couponPrice || 0)).toFixed(2) }}</span></p>
        <button v-if="result.orderStatus == 1" @click="pay()">去支付</button>
      </div>
    </div>


  </div>
</template>
<script type="text/babel">
  import OrderDetail from '../../../../components/common/order/orderDetail.vue'
  export default{
    data(){
      return {
        result: {},
        collection: false
      }
    },
    mounted() {
      let that = this;
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_ORDER_DETAIL, {orderId: that.$route.query.id}, (data) => {
        that.result = data;
      }, () => {

      }, that);

    },
    methods: {
      pay() {
        let that = this;
        let description = '';
        for (let o of that.result.orderItems) {
          description += (o.mdseName + ',');
        }
        that._Util.post(that._Api.POST_WXAUTH_PAY, {
          orderId: that.result.id,
          attach: that.result.attach
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
      countDown(startTime, nowTime) {
        let sTime = new Date(startTime);
        let nTime = new Date(nowTime);
        let eTime = new Date(sTime);
        eTime.setDate(eTime.getDate() + 1);

        let cTime = eTime.getTime() - nTime.getTime();
//        console.log('start:' + this.dateToString(sTime, 'yyyy-MM-dd hh:mm:ss'))
//        console.log('nowTime:' + this.dateToString(nTime, 'yyyy-MM-dd hh:mm:ss'))
//        console.log('endTime:' + this.dateToString(eTime, 'yyyy-MM-dd hh:mm:ss'))

        console.log(cTime);
        if (cTime > 0) {
          return '请于' + this.MillisecondToDate(cTime) + '内付款，超时订单将自动取消';
        } else {
          return '订单超时';
        }
      },
      MillisecondToDate(msd) {
        let time = parseFloat(msd) / 1000;
        if (null != time && "" != time) {
          if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分" + parseInt((parseFloat(time / 60.0) -
                parseInt(time / 60.0)) * 60) + "秒";
          } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + "分" +
              parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
          } else {
            time = parseInt(time) + "秒";
          }
        }
        return time;
      },
      dateToString (timespan, format) {
        if (!timespan) return;

        let date = new Date(timespan);
        let o = {
          "M+": date.getMonth() + 1, //month
          "d+": date.getDate(), //day
          "h+": date.getHours(), //hour
          "m+": date.getMinutes(), //minute
          "s+": date.getSeconds(), //second
          "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
          "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format))
          format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

        for (let k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }

        return format;
      }
    },
    components: {
      OrderDetail
    }
  }
</script>
<style>
  html {
    background: #ededed;
  }
</style>
