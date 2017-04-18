<template>
  <div>
    <div id="payRules" style="height: 100%;width: 100%;position: fixed;left: 0;top: 0;background: #EDEDED;overflow-y: scroll">
      <div class="RZ1_mes hui borderb">
        <div><span></span><span>收费规则和会员礼遇</span></div>
        <ul>
          <li><span></span></li>
          <li>
            按月缴费，40元/月
          </li>
        </ul>
        <ul>
          <li><span></span></li>
          <li>
            按年缴费，300元/年
          </li>
        </ul>
        <ul>
          <li><span></span></li>
          <li>
            费用含共轨之家所有付费项目
          </li>
        </ul>
        <ul>
          <li><span></span></li>
          <li>
            现在缴费，可获赠共轨之家2017年度五重大礼<br>
            4月：SCR精品维修宝典；<br>
            6月：2017年原创技术特刊；<br>
            8月：整车起动电路图集；<br>
            10月：神秘礼物；<br>
            12月：2018年新年知识台历
          </li>
        </ul>
        <ul>
          <li><span></span></li>
          <li>
            所有年费会员可免学费参加小轨特训营技术交流活动
          </li>
        </ul>
      </div>

      <div class="RZ1_mes" style="margin-top:10px;">
        <div><span></span><span>其他付款方式</span></div>
        <p class="color000" style="color: #000;font-size: 14px;">如果您尚未开通微信支付，你也可以通过以下方式支付，成功以后请及时将转账凭证图片发到微信平台，我们的客服人员手动为您开通，谢谢。</p>
        <ul>
          <li><span></span></li>
          <li>
            支付宝<br>
            户名：邓于洋，账号：13817607016。
          </li>
        </ul>
        <ul>
          <li><span></span></li>
          <li>
            中国农业银行股份有限公司上海花木支行<br>
            户名：上海星融汽车科技有限公司<br>
            账号：03319900040020032<br>
          </li>
        </ul>

        <ul>
          <li><span></span></li>
          <li>
            中国邮政储蓄银行上海浦东新区浦东分行<br>
            户名：邓于洋<br>
            账号：6217992900002562911<br>
          </li>
        </ul>
      </div>

      <div class="payrole">
        <a href="javascript:void(0);" class="tobackpage" @click="closeMembership()">返回支付页面</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    methods:{
      closeMembership(){
        this.$parent.$emit('memberClose','close')
      }
    },
    components: {}
  }
</script>
<style>
  .RZ1_mes{
    padding: 10px;
    background: #e6e6e6;
  }
  .RZ1_mes>p{
    color: #d9585a;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .RZ1_mes>ul{
    overflow: hidden;
  }
  .RZ1_mes>ul>li{
    float: left;
  }
  .RZ1_mes>ul>li:nth-child(1){
    width: 6px;
    height: 6px;
  }
  .RZ1_mes>ul>li:nth-child(2){
    width: 92%;
    margin-left: 10px;
    color: #544B4B;
    font-size: 14px;
    line-height: 18px;
  }
  .RZ1_mes>ul>li:nth-child(1)>span{
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 3px;
    margin-top: 6px;
    background: #8f8f8f;
  }
  .RZ1_mes>ul>li:nth-child(2)>p{
    color: #8f8f8f;
    font-size: 14px;
  }
  .RZ1_mes>div{
    height: 30px;
    line-height: 25px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 10px;
  }
  .RZ1_mes>div>span:nth-child(1){
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #1766b3;
    margin-right: 10px;
  }.RZ1_mes>div>span{
     font-size: 16px;
   }
  .RZ1_mes.hui{
    background: #e6e6e6
  }
  .RZ1_mes.hui.borderb{
    border-bottom: 1px solid #cccccc;
  }
  .payrole{
    margin: 15px 0 20px;
  }
  .payrole>a{
    display: block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0 20px;
    background: #d41116;
    font-size: 18px;

    color: white;
    border-radius: 5px;
  }
</style>
