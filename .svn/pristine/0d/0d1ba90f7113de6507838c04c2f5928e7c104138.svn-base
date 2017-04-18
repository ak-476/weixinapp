<template style="min-height: 100%">
  <div class="growBackground">
    <div class="growLife" style="min-height: 100%;">
      <div class="growLifeImg">
        <img v-if="user.headImgUrl" :src="user.headImgUrl" alt="">
        <img v-else src="../../../../assets/images/userDefault.jpg" alt="">
        <p>{{user.uname}}</p>
        <p>{{((user.userDetail && user.userDetail.createTime) || '') | dateFormat('yyyy-MM-dd')}} 至今</p>
        <ul>
          <li class="rztimes">
            <span class="rzTime"></span>
            <p>关注时长</p>
            <span>{{ result.gjDay>365? Math.floor(result.gjDay/365)+"年" : (result.gjDay || 0)+"天" || 0}}</span>
          </li>
          <li class="fftimes">
            <span class="ffTime"></span>
            <p>付费时长</p>
            <span>{{ result.feeDay>365? Math.floor(result.feeDay/365)+"年" : (result.feeDay || 0)+"天" || 0}} </span>
          </li>
        </ul>
      </div>

      <div class="growInfo">
        <span class="tip">
        </span>
        <div class="growStyle">
          <ul>
            <li class="clickNum">
              功能使用次数 <br><span style="color: red; font-size: 16px;"> {{totalCount || 0}} </span> 次
            </li>

            <li style="height: 158px;">
              <span :style="{background : styleColor.sosoBgColor}" style="margin-top: 100px;"></span><br>
              <span>万能搜搜</span><br>
              <span>{{result.soso || 0}}次</span>
            </li>

            <li style="height: 158px;">
              <span :style="{background : styleColor.dianluziliaoBgColor}" style="margin-top: 100px;"></span><br>
              <span>电路资料</span><br>
              <span>{{result.dianluziliao || 0}}次</span>
            </li>


            <!--饼状统计图-->
            <li class="chartArc">
              <div style="position: absolute;left: 0;top: 0;z-index: 1000;width: 100%;height: 100%;"></div>
              <doughnut-plotly v-if="doughnut.length"
                               :data="doughnut"
                               :labels="labels"></doughnut-plotly>
            </li>


            <li>
              <span :style="{background : styleColor.guzhangmaBgColor}"></span><br>
              <span>故障代码</span><br>
              <span>{{result.guzhangma || 0}}次</span>
            </li>

            <li>
              <span :style="{background : styleColor.xitongbujianBgColor}"></span><br>
              <span>系统部件</span><br>
              <span>{{result.xitongbujian || 0}}次</span>
            </li>

            <li>
              <span :style="{background : styleColor.ceshishujuBgColor}"></span><br>
              <span>测试数据</span><br>
              <span>{{result.ceshishuju || 0}}次</span>
            </li>

            <li>
              <span :style="{background : styleColor.zaixianwendaBgColor}"></span><br>
              <span>在线问答</span><br>
              <span>{{result.zaixianwenda || 0}}次</span>
            </li>



            <li>
              <span :style="{background : styleColor.guzhangpaichaBgColor}"></span><br>
              <span>故障排查</span><br>
              <span>{{result.guzhangpaicha || 0}}次</span>
            </li>
          </ul>
        </div>
        <div class="tile is-parent is-4">
          <article class="tile is-child box">

          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import DoughnutPlotly from '../../../../components/chart/DoughnutPlotly'

  export default{
    prop :{
      Num:{
        default(){
          return 20;
        }
      }
    },
    data(){
      return {
        user: {} ,
        result : {} ,
        doughnut: [],
        labels: ['万能搜搜', '电路资料', '故障代码', '系统部件', '测试数据', '在线问答', '故障排查'],
        styleColor:{
          sosoBgColor:'#4bbba7',
          dianluziliaoBgColor:'#a6232d',
          guzhangmaBgColor:'#c4e0fc',
          xitongbujianBgColor:'#1b5186',
          ceshishujuBgColor:'#042546',
          zaixianwendaBgColor:'#34802c',
          guzhangpaichaBgColor:'#c45f05'

        },
        totalCount: 0
      }
    },
    mounted() {
      let that = this;
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_USE_COUNT, {}, (data) => {
        that.result = data ;
        that.doughnut.push(that.result.soso);
        that.doughnut.push(that.result.dianluziliao);
        that.doughnut.push(that.result.guzhangma);
        that.doughnut.push(that.result.xitongbujian);
        that.doughnut.push(that.result.ceshishuju);
        that.doughnut.push(that.result.zaixianwenda);
        that.doughnut.push(that.result.guzhangpaicha);

        for (let count of that.doughnut) {
          that.totalCount += count;
        }

      }, () => {

      }, that);
      this.getUserInfo()
    },
    methods:{
      getUserInfo() {
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_INFO, {}, (data) => {
          that.user = data;
        }, () => {

        }, that);
      }
    },
    computed: {

    },
    components: {
      DoughnutPlotly
    }
  }
</script>
<style>
  .growBackground .growLife{
    background: -webkit-linear-gradient(left, #1766b3 ,#5aa3ec, #1766b3);
    background: -o-linear-gradient( left, #1766b3 ,#5aa3ec, #1766b3);
    background: -moz-linear-gradient( left, #1766b3 ,#5aa3ec, #1766b3);
    background: linear-gradient(to right, #1766b3 ,#5aa3ec, #1766b3);
    min-height: 100%;
    padding-bottom: 20px;
  }
</style>
