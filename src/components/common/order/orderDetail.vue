<template>
  <ul>
    <div v-if="order.orderType == 'buying'" style="margin-left: 10px;height: 30px;line-height: 30px"><span>物流单号：</span>{{order.price}}</div>
    <li>
      <div>
        <img :src="order.mdsePicUrl" alt="">
      </div>
      <div style="width: 58%;">
        <p style="width: 100%">{{order.mdseName}}</p>
        <p v-if="showTime">x<span>{{order.quantity}}</span></p>
        <p v-if="showTime" class="times">下单时间：
          <span>{{order.submitDate | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
        </p>
      </div>
      <div v-if="showTime" class="priceOdd">
        ￥<span>{{order.price}}</span>
      </div>
      <div v-if="expressNo">
        ￥<span>{{order.price}}</span><br><br>
        x<span>{{order.quantity}}</span>
      </div>
    </li>
  </ul>
</template>
<script>
  export default{
    props: {
      order: {
        type: Object,
        default() {
          return {}
        }
      },
      showTime: {
        type: Boolean,
        default() {
          return true;
        }
      },
      expressNo: {
        type:Boolean,
        default(){
          return false;
        }
      }
    },
    data(){
      return {

      }
    },
    components: {}
  }
</script>
