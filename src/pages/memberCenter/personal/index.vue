<template>
  <div class="personalIndex" style="min-height: 100%;">
    <div style="min-height: 100%;background: #EDEDED;overflow-y: scroll">
      <!--<router-link :to="{name: 'certificationRenewal'}" style="overflow: hidden;display: block">
      -->
      <div @click="toPay()" class="pIndex_part">
        <div>
          <img v-if="user.headImgUrl" :src="user.headImgUrl" alt="">
          <img v-else src="../../../assets/images/userDefault.jpg" alt=""></div>
        <div>
          <span>{{user.uname}}</span>
          <p>
            {{ !user.userStatus ? '未认证会员' : (user.userStatus == 1 ? '认证会员' : '付费会员') }}
            <span class="jifen" @click.stop="toIntegral()">积分:{{countData.userPoint}}</span>
          </p>
        </div>
      </div>
      <!--</router-link>
      -->
      <div class="pIndex_part">

        <ul class="jlsc changs">
          <li class="myCollecter">
            <span>
              <router-link :to="{name: 'memberCollecter'}">
                我的收藏
              </router-link>
            </span>
          </li>
          <li class="myHistory">
            <span>
              <router-link :to="{name: 'memberStore'}">
                门店信息
              </router-link>
            </span>
          </li>
          <li class="myHistory">
            <span>
              <a @click="signIn()">
                {{repeatFlag}}
              </a>
            </span>
          </li>
        </ul>

        <ul @click="toPay(true)">
          <!--<router-link :to="{name: 'certificationRenewal'}">
          -->
          <li class="vipXufei">
            <span></span>
            <span>
              {{ !user.userStatus ? '去认证/付费' : (user.userStatus == 1 ? '成为付费用户' : '会员续费') }}
            </span>
            <p v-if="user.userStatus == 2">
              会员到期时间
              <span>{{user.userDetail.feeEndTime | dateFormat('yyyy.MM.dd')}}</span>
            </p>
          </li>
          <!--</router-link>-->
        </ul>

        <ul>
          <li class="myMation">
            <span></span>
            <span>
              <router-link :to="{name: 'memberPersonalInfo'}">个人信息</router-link>
            </span>
          </li>
          <!--<li class="myAddress">-->
          <!--<span></span>-->
          <!--<span>-->
          <!--<router-link :to="{name: 'memberStore'}">门店信息</router-link>-->
          <!--</span>-->
          <!--</li>-->
          <!-- <li class="myAddress">
            <span></span>
            <span>
              <router-link :to="{name: 'memberAddress'}">地址管理</router-link>
            </span>
          </li> -->
        </ul>
        <ul>
          <li @click="toOrder()" class="myOrder">
            <span></span>
            <span>
              <!--<router-link :to="{name: 'memberMyOrder'}">
              -->
              <a>
                我的订单
                <span v-if="countData.noOkOrderNum">{{countData.noOkOrderNum || 0}}</span>
              </a>
              <!--</router-link>--></span>
          </li>
          <li class="myGift">
            <span></span>
            <span>
              <router-link :to="{name: 'memberMyGift'}">
                我的礼品
                <span v-if="countData.noOkGiftNum">{{countData.noOkGiftNum || 0}}</span>
              </router-link>
            </span>
          </li>
          <li class="myCoupon">
            <span></span>
            <span>
              <router-link :to="{name: 'memberCoupon'}">
                我的优惠券
                <span v-if="countData.noOkCouponNum">{{countData.noOkCouponNum || 0}}</span>
              </router-link>
            </span>
          </li>
          <li class="myShoped">
            <span></span>
            <span>
              <a v-if="countData.viewerId" :href="_Api.HOSTOLD + 'wxauth/broadcast/myCourse/' + countData.viewerId + '.htm'">
                已购课程
                <!--<span v-if="countData.buycoruseNum">{{countData.buycoruseNum || 0}}</span>-->
              </a>
              <a v-else :href="_Api.HOSTOLD + 'wxauth/broadcast/index.htm?v=0'">
                已购课程
                <!--<span v-if="countData.buycoruseNum">{{countData.buycoruseNum || 0}}</span>-->
              </a>
            </span>
          </li>
        </ul>

        <ul>
          <li class="mygrow">
            <span></span>
            <span>
              <router-link :to="{name: 'memberGrowUp'}">成长经历</router-link>
            </span>
          </li>
          <li class="myTest">
            <span></span>
            <a :href="_Api.HOSTOLD + '/wxauth/skillAssess/start.htm'">
              技能测评
              <span style="color: #8f8f8f; margin-right: 10px !important;"
                    v-html="skillTestName"></span>
            </a>
            <p>

            </p>
          </li>
        </ul>

        <div v-if="JSON.parse(_Util.getLocalStorage('isApp'))" class="addBTn" style="position: absolute; width: 96%;left: 2%;margin: 0;text-align: center">
          <button @click="loginOut()" style="height: 50px;width: 100%;text-align: center">退出登录</button>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default{
    data(){
      return {
        countData: {},
        userDefault: '../../../userDefault.jpg',
        user: {
          userDetail: {}
        },
        skillTestName: '',
        repeatFlag: ''
      }
    },

    mounted() {
      this.getMsgCount();
      this.getUserInfo();
      this.getSkillsTest();
      this.checkSign();
    },

    methods: {
      getMsgCount() {
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_MSG_COUNT, {
          type: 0
        }, (data) => {
          that.countData = data;
        }, () => {

        }, that);
      },

      getUserInfo() {
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_INFO, {}, (data) => {
          that.user = data;

        }, () => {

        }, that);
      },

      toPay(flag) {
        if (flag) {
          window.location.href = '/v2/business/pay/certificationRenewal';
        } else {
          this.$router.push({name: 'memberPersonalInfo'});
        }
      },

      toOrder() {
        window.location.href = '/v2/business/pay/orderList';
      },

      toIntegral() {
        this.$router.push({name: 'memberIntegral'});
      },

      getSkillsTest() {
        let that = this;
        that._Util.post(that._Api.POST_SKILLS_TEST, {}, (data) => {
          if (!data) {
            that.skillTestName = '获取共轨之家认证技能证书'
          } else {
            that.skillTestName = '测试得分' + data.topScore + '分' + (data.designation ? '【' + data.designation + '】': '');
          }
        }, () => {

        }, that);
      },

      signIn() {
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_DAILY_SINGIN, {}, (data) => {
          if (data) {
          	if (data.repeatFlag) {
              that._Util.showToast('已签到，明天继续呗~');
            } else {
              that.repeatFlag = '已签到';
              that._Util.showMsgBox('连续签到' + data.days + '天', '获得' + data.point + '积分');
            }
          }
        }, () => {

        }, that, true);
      },

      loginOut() {
        let that = this;
        that._Util.showMsgBoxConfirm('确认退出登录吗?', action => {
          if (action) {

            that._Util.post('http://192.168.11.9/commonrail/api/app/logout.json', {}, () => {
              api.sendEvent({
                name: 'isLogin',
                extra: {
                  status: false
                }
              });
              that.$router.replace({name: 'login'});
            }, () => {}, that);
          }
        });
        return;
        api.sendEvent({
          name: 'loginOut',
          extra: {
            key1: 'value1',
            key2: 'value2'
          }
        });
      },

      checkSign() {
      	let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_DAILY_SINGIN_CHECK, {}, (data) => {
          that.repeatFlag = data.repeatFlag ? '已签到' : '每日签到';
        }, () => {

        }, that, true);
      }
    },

    components: {}
  }
</script>
