<template>
  <div>
    <div class="scoopDetail">
      <div class="DetailCaption">
        <div class="captionImg">
          <img :src="result.hotelImgUrl">
        </div>
        <div class="captionMation">
          <p class="p1">线下培训交流会__{{result.province}} {{result.city}}站</p>
          <p class="p2">{{result.startTime | dateFormat('MM月dd日')}}~{{result.endTime | dateFormat('MM月dd日')}}</p>
          <div class="div1" style="height: 30px">
            <p style="height: 30px;line-height: 20px;">{{result.hotelName}}</p>
            <button @click="openMap()" type="danger" class="apply">查看地图</button>
          </div>
          <div class="div2">
            <a :href="'tel:' + result.contactPhone">
              咨询电话：<span class="tel">{{result.contactPhone}}</span>(<span>{{result.contactName}}</span>)
              <img src="../../../assets/images/phone.png">
            </a>
          </div>
        </div>
      </div>

      <div class="DetailIntroduce">
        <div class="introduceItem">
          <!--<p>活动安排：</p>-->
          <!--<div class="item">-->
            <!--<p>第一天上午</p>-->
            <!--<p>博世后处理原理和数据流讲解，尿素泵和喷嘴原理及维修</p>-->
          <!--</div>-->
          <div class="item">
            <p v-html="rewriteHtml(result.activityProcess)"></p>
          </div>
        </div>

        <!--<div class="introduceItem">-->
          <!--<p>报名规则</p>-->
          <!--<div class="item">-->
            <!--<p>1、年费会员免费参加，未付费会员需先缴纳年费方可参加；</p>-->
            <!--<p>2、每期交流会收取场地费200元；</p>-->
            <!--<p>3、代订酒店需缴纳100元定金，可抵充房费。</p>-->
          <!--</div>-->
        <!--</div>-->
      </div>

      <div class="DetailIntroduce" >
        <div class="introduceItem">
          <!--<p>注意事项</p>-->
          <div class="item">
            <p v-html="rewriteHtml(result.notice)"></p>
          </div>
        </div>
      </div>
      <div style="height: 60px;"></div>



      <!--<mt-button @click.native="openMap()" type="danger" class="apply">打开地图</mt-button>-->

      <!--<Dialog-component v-if="dialogShow" type="confirm" title="弹窗标题"
                        confirm-button="确定" cancel-button="取消">
        <input />
        <br>
        ...
      </Dialog-component>-->
    </div>
    <div style="position: fixed;left: 0;bottom: 0;width: 100%;height: 60px;z-index: 1000;background: white">
      <mt-button type="danger" :disabled="enterFlag" @click.native="enterFor()" class="apply" style="margin:10px 10px 30px;width: 96%;margin-left: 2%;line-height: 30px;font-size: 16px;background: #d41116;">
        {{enterFlag ? '已报名' : '去报名'}}
      </mt-button>
    </div>
  </div>
</template>
<script type="text/babel">
  import { Button } from 'mint-ui';
  import wx from 'weixin-js-sdk'

  export default{
    data(){
      return {
        result: {},
        enterFlag: true
      }
    },
    mounted() {
      let that = this;
      that._Util.post(that._Api.POST_LECTURE_ROOM_DETAIL, {addressId: that.$route.query.id}, function (data) {
        that.result = data;
      }, function () {

      }, that);

      that._Util.post(that._Api.POST_LECTURE_ROOM_CHECK_SHARE, {addressId: that.$route.query.id}, function (data) {
        that.enterFlag = data.verifyStatus;
      }, function () {

      }, that);
    },
    methods: {
      enterFor() {
        let that = this;
        that._Util.getUserStatus(that, (data) => {
          that.$router.push({name: 'currentPeriodCost', query: {id: that.result.id, userStatus: data.userStatus}});
        }, () => {

        }, {
          name: that.$route.name,
          fullPath: '/v2/lectureRoom/current/cost?id=' + that.result.id + '&userStatus=1'
        }, that._Enums.AUTH);
      },
      openMap() {
        let that = this;
        that._Util.post(that._Api.POST_COMMON_WXSDK_CONFIG, {url: location.href}, function (data) {
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['openLocation']
          });

          wx.ready(function () {
            if (that.result.hotelCoordinate) {
              wx.openLocation({
                latitude: parseFloat(that.result.hotelCoordinate.split(',')[0]),
                longitude: parseFloat(that.result.hotelCoordinate.split(',')[1]),
                name: that.result.hotelName,
                address: that.result.province + that.result.city + that.result.hotelAddress,
                scale: 14,
                infoUrl: 'http://weixin.qq.com'
              });
            } else {
              that._Util.showMsgBox('经纬度错误!');
            }
          });

        }, function () {

        }, that);
      },

      rewriteHtml(str) {
      	if (!str) {
      		return '';
        }

        let aa = this._Util.copyObject(str);
      	console.log(aa.replace(/\n/g, '<br>'));


        return (str.replace(/\n/g, '<br>')).replace(/\s/g, '&nbsp;');
      }
    },
    components: {
    }
  }
</script>

