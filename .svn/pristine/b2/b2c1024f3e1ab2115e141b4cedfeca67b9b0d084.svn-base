<template>
  <div>
    <div class="renewal">
      <div class="renewal_img">
        <img src="../../../../assets/images/20161103004.png">
        <p>会员续费</p>
      </div>
      <div class="uerTime"  @click="_comeIn()">
        <span class="uerYear" >{{memScope.styleList}}</span>
        <span class="uerYearTime">{{memScope.styleList == '年费会员' ? memScope.numList+'年' : memScope.numList+'月' }}</span>
      </div>
      <div v-if="display" @click="closeSelect"  style="position: fixed;width: 100%;height: 100%;z-index:888;left: 0;top: 0;background:#000000;opacity: 0.4 "></div>
      <div class="uregTime" v-if="display">
        <button class="cancel" @click="_cancel()">取消</button>
        <span>请选择</span>
        <button class="ensure" @click="_ensure()">确认</button>
        <div style="position: absolute;left: 0;top: 0;background: #eee;z-index: -20;height: 50px;width: 100%;"></div>
        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
      </div>
      <p>您需要支付：<span>￥</span><span>{{memScope.styleList == '年费会员' ? memScope.numList*300+'.00' : memScope.numList*40+'.00'}}</span></p>
      <div class="renwval_btn">
        <button @click="renewPy()">支付</button>
      </div>
    </div>
   </div>

</template>
<script type="text/babel">
  //  import VueArea from '../../../../components/vue-area/vue-area.vue'
  const address = {
    '年费会员': ['1年', '2年', '3年'],
    '月费会员': ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月'],

  };
  export default{
    data(){
      return {
        display: false,
        mdseId:1,
        quantity:1,
        memScope: {
          styleList: '年费会员',
          numList: '1'
        },
        addressSlots: [
          {
            flex: 1,
            values: Object.keys(address),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['1年', '2年', '3年'],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        result:{}

      }
    },
    mounted() {
      //this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom;

    },
    methods: {
      onYearChange(picker, values) {
        this.year = values[0];
      },
      onDateChange(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
        this.dateStart = values[0];
        this.dateEnd = values[1];
      },
      onAddressChange(picker, values) {
        let that = this;
        picker.setSlotValues(1, address[values[0]]);
        that.addressProvince = values[0];
        setTimeout(function(){
          that.memScope = {
            styleList: values[0],
            numList: values[1].replace(/[^0-9]/ig,"")
          };
          that.quantity = that.memScope.numList;
        },300)

      },
      _comeIn(){
        this.display = true ;

      },
      _cancel(){
        let that =  this;
        that.display = false ;
        that.memScope = {
          styleList: '年费会员',
          numList: 1
        };
      },
      _ensure(){
        this.display = false ;
      },
      renewPy(){
        let  that = this ;
        console.log();
        if(that.memScope.styleList == '年费会员'){
          that.mdseId = 1;
        }
        else{
          that.mdseId = 2;
        }
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_GET_JS_PARAMETER,{mdseId:that.mdseId,quantity:that.quantity},(data) => {
          WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(data.jsApiParameters), function(res) {
            WeixinJSBridge.log(res.err_msg);

          });
        },() =>{

        },that, true)
      },
      closeSelect(){
        this.display = false ;
      }


    },
    watch: {

    },
    components: {
    }
  }
</script>
