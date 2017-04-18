<template>
  <div style="min-height: 100%;">
    <div class="becomeMember" style="min-height: 100%;background: #EDEDED">
      <div class="MemberNav" v-if="getTheStatus">
        <ul>
          <li :class="checkedF" @click="becomeFufei()">成为付费会员</li>
          <li :class="checkedR" @click="becomeRenzheng()">成为认证会员</li>
        </ul>
      </div>

      <div class="bMember" style="overflow: hidden">
        <div>
          <div class="fufeiImg">
            <img src="../../assets/images/20161103004.png">
            <p v-if="fufeiDisplay">{{ paidChange }}</p>
            <p v-if="renzhengDisplay">成为认证会员</p>
            <!--<a v-if="fufeiDisplay" class="chakanhuiyuanquanxian" @click="getMemberShip()" style="color: #0b4377;display: block;text-decoration: underline;margin-top: 10px;">付费说明</a>-->
          </div>
        </div>

        <div v-if="renzhengDisplay  || getTheStatus" class="fufeiForm">
          <ul>
            <li class="li1">姓名</li>
            <li class="li2">
              <div>
                <input v-model="newEntity.uname" type="text" name="" :attr="{ maxlength: 10 }"
                       placeholder="请输入您的真实姓名">
              </div>
            </li>
          </ul>
          <ul>
            <li class="li1">手机号码</li>
            <li class="li2">
              <div>
                <input v-model="newEntity.uphone" type="tel" name="" placeholder="请输入您的手机号">
              </div>
            </li>
          </ul>
          <ul>
            <li class="li1">验证码</li>
            <li class="li2">
              <div class="yzm">
                <input v-model="newEntity.inputCode" type="tel" name="" placeholder="请输6位验证码">
              </div>
              <div class="yzmBtn">
                <button id="newEntity" @click="getCode()" style="width: 100%;height: 100%;color: white"
                        :disabled="smsFlag">{{newEntityText}}
                </button>
              </div>
            </li>
          </ul>
        </div>
        <!--付费会员时间选择-->
        <div v-if="fufeiDisplay">
          <div class="renewal" style="background: white;margin-top: 10px;">
            <div class="uerTime" @click="_comeIn()">
              <span class="uerYear">{{scrollIn.styleList}}</span>
              <span
                class="uerYearTime">{{scrollIn.styleList == '年费会员' ? scrollIn.numList + '年' : scrollIn.numList + '个月' }}</span>
            </div>
          </div>
          <div v-if="display" @click="closeSelect" @touchmove="_stopDef" @mousewheel="_stopDef"
               style="position: absolute;z-index:200;left: 0;top: 0;bottom:0;right:0;background:#000000;opacity: 0.7 "></div>
          <div class="uregTime" v-if="display" style="right: 0;left: 0;bottom: 0;">
            <button class="cancel" @click="_cancel()">取消</button>
            <span>请选择</span>
            <button class="ensure" @click="_ensure()">确认</button>
            <div
              style="position: absolute;left: 0;top: 0;background: #eee;z-index: -20;height: 50px;width: 100%;"></div>
            <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
          </div>
        </div>


        <!--付费支付按钮-->
        <div v-if="fufeiDisplay" class="fufeiPrice" style="height: 120px;background:#EDEDED ">
          <p>您需要支付：<span>￥</span><span>{{scrollIn.styleList == '年费会员' ? (scrollIn.numList*300 - (lotteryRecord.amount || 0)) +'.00' : scrollIn.numList*40+'.00'}}</span>
          </p>
          <p v-if="lotteryId && scrollIn.styleList == '年费会员'">
            {{lotteryRecord.couponName}}（{{lotteryRecord.amount}}元）：-￥{{lotteryRecord.amount}}.00 </p>
          <button class="wxPay" @click="renewPy()"
                  style="height: 50px;width: 96%;margin-left: 2%;margin-top: 20px;">{{payFor}}
          </button>
        </div>


        <!--认证提交按钮-->
        <div v-if="renzhengDisplay" class="fufeiPrice" style="margin: 50px 2% 30px;width: 96%">
          <button class="wxPay" @click="save()" :disabled="disabledBtn" :style="{background : disableBg}"
                  style="width: 100%">
            {{renZheng}}
          </button>
        </div>

      </div>

      <a v-if="fufeiDisplay" class="chakanhuiyuanquanxian" @click="getMemberShip()"
         style="color: #0b4377;display: block;text-decoration: underline;margin-top: 10px;text-align: center">付费说明</a>
    </div>

    <Member-ship v-if="memberShip && fufeiDisplay"></Member-ship>
  </div>
</template>
<script type="text/babel">
  import DialogComponent from '../../components/DialogComponent.vue';
  import MemberShip from '../../components/common/MemberShip.vue'
  const address = {
    '年费会员': ['1年', '2年', '3年'],
    '月费会员': ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月'],

  };
  export default{
    data(){
      return {
        renzhengDisplay: false,
        fufeiDisplay: true,
        checkedF: 'active',
        tijiaorenzheng: '提交认证',
        checkedR: '',
        display: false,
        disabledBtn: false,
        mdseId: 2,
        getTheStatus: false,
        timeOut: 60,
        disableBg: '#ff0000',
        quantity: 1,
        phoneExp: /^1[34578]\d{9}$/,
        emailExp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        entity: true,
        newEntityText: '发送验证码',
        memScope: {
          styleList: '年费会员',
          numList: '1'
        },
        scrollIn: {
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
        result: {},
        newEntity: {},
        smsFlag: false,
        payFor: '支付',
        renZheng: '认证',
        userInfo: {},
        paidChange: '成为付费会员',
        memberShip: false,
        collection: false,
        lotteryId: 0,
        lotteryRecord: {}

      }
    },
    beforeMount() {

    },
    mounted(){
      let that = this;
      that._Util.post(that._Api.POST_USER_STATUS, {}, (data) => {
        that.userStatus = data;
        if (that.userStatus.userStatus == 1 || that.userStatus.userStatus == 2) {
          that.getTheStatus = false;
          that.renZheng = '修改认证';
        } else {
          that.getTheStatus = false;
          that.renZheng = '认证';
        }
        if (that.userStatus.userStatus == 1) {
          that.paidChange = '成为付费会员';
        }
        if (that.userStatus.userStatus == 2) {
          that.payFor = '续费';
          that.paidChange = '会员续费';
        } else if (that.userStatus.userStatus == 0 || that.userStatus.userStatus == 1) {
          that.payFor = '支付'

        }
        if (that.userStatus.userStatus == 0) {
          that.getTheStatus = true;
          that.paidChange = '成为付费会员';
        }
      }, () => {

      }, that, false);

      that._Util.post(that._Api.POST_MEMBER_PERSONAL_INFO, {}, (data) => {
        that.userInfo = data;
        if (that.userInfo.uname != '' || that.userInfo.uname != null) {
          that.newEntity.uname = that.userInfo.uname;
        } else {
          that.newEntity.uname = '';
        }
        if (that.userInfo.uphone != '' || that.userInfo.uphone != null) {
          that.newEntity.uphone = that.userInfo.uphone;
        } else {
          that.newEntity.uphone = '';
        }
      }, () => {

      }, that)

//      console.log(that.mdseId)
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_GET_JS_LOTTERY, {mdseId: that.mdseId}, (data) => {
        if (data.length > 0) {
          that.lotteryId = data[0].lotteryId || '';
          that.lotteryRecord = data[0];
        } else {
          that.lotteryId = '';
          that.lotteryRecord = '';
        }

      }, () => {

      }, that)

      that.$on('memberClose', () => {
        that.memberShip = false;
      })

    }
    ,
    methods: {
      becomeFufei(){
        let that = this;
        that.checkedF = 'active';
        that.checkedR = '';
        that.fufeiDisplay = true;
        that.renzhengDisplay = false;


      },
      becomeRenzheng(){
        let that = this;
        that.checkedF = '';
        that.checkedR = 'active';
        that.renzhengDisplay = true;
        that.fufeiDisplay = false;
      },
      onAddressChange(picker, values) {
        let that = this;
        picker.setSlotValues(1, address[values[0] || '年费会员']);
        that.addressProvince = values[0];
        setTimeout(function () {
          that.memScope = {
            styleList: values[0] || '年费会员',
            numList: values[1].replace(/[^0-9]/ig, "")
          };
          that.quantity = that.memScope.numList;
        }, 300)

      },
      _comeIn(){
        let that = this;
        that.display = true;
        that.memScope = {
          styleList: '年费会员',
          numList: '1'
        }
      },
      _stopDef(e){
        e.preventDefault()
      },
      _cancel(){
        let that = this;
        that.display = false;
        that.memScope = {
          styleList: that.memScope.styleList,
          numList: that.memScope.numList
        };
      },
      _ensure(){
        let that = this;
        that.display = false;
        that.scrollIn = {
          styleList: that.memScope.styleList,
          numList: that.memScope.numList
        };
        that._Util.log(that.memScope);
      },
      renewPy(){
        let that = this;
        let msg = '';
        if (that.userStatus.userStatus == 0) {
          if (that.newEntity.uname == null) {
            msg = '姓名不能为空';
            that._Util.showMsgBox(msg);
            return;
          }
          else if (that.newEntity.uphone == null) {
            msg = '手机号码不能为空';
            that._Util.showMsgBox(msg);
            return;
          }
          else if (that.newEntity.inputCode == null) {
            msg = '验证码不能为空';
            that._Util.showMsgBox(msg);
            return;
          }
          that.checkCode(() => {
            that.attestation(() => {
              if (that.memScope.styleList == '年费会员') {
                that.mdseId = 2;
              } else {
                that.mdseId = 1;
              }
              that._Util.post(that._Api.POST_MEMBER_PERSONAL_GET_JS_PARAMETER, {
                mdseId: that.mdseId,
                quantity: that.quantity,
                lotteryId: that.lotteryId
              }, (data) => {
                WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(data.jsApiParameters), function (res) {
                  WeixinJSBridge.log(res.err_msg);
                  if (res.err_msg == "get_brand_wcpay_request:ok") {

                    that.$router.replace({
                      name: 'memberRenewSuccess',
                      query: {
                        type: that.$route.query.type,
                        fullPath: that.$route.query.fullPath,
                        external: that.$route.query.external,
                        name: that.$route.query.name,
                        operType: 1
                      }
                    });

//                    if (that.$route.query.type || !that.$route.query.fullPath) {
//                      that.$router.replace({name: 'memberCenter'});
//                    } else {
//                      that.$router.replace({path: that.$route.query.fullPath})
//                    }
                  } else {
                    //原先做订单删除动作，这样可能会导致微信通知找不到订单的状况，现在做删除
                  }
                });
              }, () => {
                that._Util.showMsgBox('付费失败');
              }, that, true)
            }, that)
          })
        } else {

//          that.$router.replace({
//            name: 'memberRenewSuccess',
//            query: {
//              type: that.$route.query.type,
//              fullPath: that.$route.query.fullPath,
//              external: that.$route.query.external,
//              name: that.$route.query.name,
//              operType: 1
//            }
//          });
//          return;
          if (that.memScope.styleList == '年费会员') {
            that.mdseId = 2;
          } else {
            that.mdseId = 1;
          }

          that._Util.post(that._Api.POST_MEMBER_PERSONAL_GET_JS_PARAMETER, {
            mdseId: that.mdseId,
            quantity: that.quantity,
            lotteryId: that.lotteryId

          }, (data) => {
            WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(data.jsApiParameters), function (res) {
              WeixinJSBridge.log(res.err_msg);
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                that.$router.replace({
                  name: 'memberRenewSuccess',
                  query: {
                    type: that.$route.query.type,
                    fullPath: that.$route.query.fullPath,
                    external: that.$route.query.external,
                    name: that.$route.query.name,
                    operType: 1
                  }
                });

//                if (that.$route.query.type || !that.$route.query.fullPath) {
//                  that.$router.replace({name: 'memberCenter'});
//                } else {
//                  that.$router.replace({name: that.$route.query.name, path: that.$route.query.fullPath});
//                }
              } else {
                //原先做订单删除动作，这样可能会导致微信通知找不到订单的状况，现在做删除
              }
            });
          }, () => {

          }, that, true)
        }


      },
      closeSelect(){
        this.display = false;
      },
      attestation(callback, self){
        let that = this;
        that.result = that.newEntity;
        that.dialogShow = false;
        let params = {
          nickname: that.result.nickname,
          sex: that.result.sex,
          province: that.result.province,
          city: that.result.city,
          country: that.result.country,
          headImgUrl: that.result.headImgUrl,
          uprovince: that.result.uprovince,
          ucity: that.result.ucity,
          udist: that.result.udist,
          uaddress: that.result.uaddress,
          ucompany: that.result.ucompany,
          uname: that.result.uname,
          uemail: that.result.uemail,
          uphone: that.result.uphone,
          inputCode: that.result.inputCode,
          openId: that.result.openId,
          userType: that.result.userType
        };


        that._Util.post(that._Api.POST_MEMBER_PERSONAL_SAVE, params, function (data) {
          that._Util.post(that._Api.POST_MEMBER_PERSONAL_SAVE_WXAUTH, params, function (data) {
            callback && callback()
          }, () => {

          }, that)
        }, () => {

        }, that);
      },

      save() {
        let that = this;
        let msg = '';
        if (that.newEntity.uname == null) {
          msg = '姓名不能为空';
          that._Util.showMsgBox(msg);
          return;
        }
        else if (that.newEntity.uphone == null) {
          msg = '手机号码不能为空';
          that._Util.showMsgBox(msg);
          return;
        }
        else if (that.newEntity.inputCode == null) {
          msg = '验证码不能为空';
          that._Util.showMsgBox(msg);
          return;
        }
        that.checkCode(() => {
          that.attestation(() => {
            that.$router.replace({
              name: 'memberRenewSuccess',
              query: {
                type: that.$route.query.type,
                fullPath: that.$route.query.fullPath,
                external: that.$route.query.external,
                name: that.$route.query.name,
                operType: 2
              }
            });

//            if (that.$route.query.type || !that.$route.query.fullPath) {
//              that.$router.replace({name: 'memberCenter'});
//            } else {
//              if (that.$route.query.external && that.$route.query.fullPath) {
//                window.location.href = that.$route.query.fullPath;
//              } else {
//                that.$router.replace({name: that.$route.query.name, path: that.$route.query.fullPath});
//              }
//            }

          }, that)
        });
      },
      getCode() {
        let msg = '';
        let that = this;
        msg = that.newEntity.uphone ? '' : '电话号码不能为空 ';
        if (!that.phoneExp.test(that.newEntity.uphone)) {
          msg = '手机号码格式不正确';
        }
        if (msg) {
          that._Util.showMsgBox(msg);
          return;
        }

        that.entity = false;
        that._Util.post(that._Api.POST_WXAUTH_PHONE_NOTE, {phone: that.newEntity.uphone}, (data) => {
          that.smsFlag = true;

          let time = setInterval(function () {
            if (that.timeOut == 1) {
              that.newEntityText = '发送验证码';
              that.timeOut = 60;
              that.smsFlag = false;
              clearInterval(time);
            } else {
              that.newEntityText = (that.timeOut--) + 's后重新发送';
            }

          }, 1000)
        }, function () {

        }, that);
      },
      checkCode(callback, errorback) {
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_CHECK_CODE, {inputCode: that.newEntity.inputCode}, (data) => {
          callback && callback();
        }, function () {
          errorback && errorback();
        }, that);
      },
      getMemberShip(){
        this.memberShip = true;
      }

    }
    ,
    components: {
      MemberShip
    }
  }
</script>
