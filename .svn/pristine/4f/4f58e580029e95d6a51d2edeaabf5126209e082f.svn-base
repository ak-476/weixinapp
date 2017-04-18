<template>
  <div>
    <div class="becomeMember">
      <div id="fufeiMember" class="bMember current">
        <p>请留下您的联系方式</p>
        <div class="fufeiForm">
          <ul>
            <li class="li2">
              <div>
                <input type="text" v-model="uname" name="" placeholder="请输入您的真实姓名">
              </div>
            </li>
          </ul>
          <ul>
            <li class="li2">
              <div>
                <input type="tel" v-model="phone" placeholder="请输入手机号码">
              </div>
            </li>
          </ul>
          <ul>
            <li class="li2">
              <div class="yzm">
                <input v-model="smsYzm" :maxlength="6" type="tel" placeholder="请输六位验证码">
              </div>
              <div class="yzmBtn">
                <button @click="sendSms()" :disabled="disableIn" :style="{background:styleColor.smsColor}">
                  {{buttonValue}}
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div class="fufeiTime">

        </div>

        <div class="fufeiPrice">
          <button @click="save()" class="wxPay">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import DialogComponent from '../../components/DialogComponent.vue';

  export default{
    data(){
      return {
        userInfo: {},
        phone: '',
        phoneExp: /^1[34578]\d{9}$/,
        disableIn: false,
        timeOut: 60,
        buttonValue: '发送验证码',
        styleColor: {
          smsColor: '#d41116'

        },
        smsYzm: '',
        uname: ''
      }
    },
    methods: {
      save() {
        let msg = '';
        let that = this;
        if (that.uname == '') {
          msg = '您的姓名不能为空';
          that._Util.showMsgBox(msg);
          return;
        }

        console.log(that.phone);
        if (!that.phoneExp.test(that.phone.trim())) {
          msg = '电话号码格式不正确或者为空';
          that._Util.showMsgBox(msg);
          return;
        }

        if (!that.smsYzm) {
          msg = '请请输六位验证码';
          that._Util.showMsgBox(msg);
          return;
        }

        that._Util.post(that._Api.POST_MEMBER_PERSONAL_CHECK_CODE, {inputCode: that.smsYzm}, function (data) {
          that._Util.post(that._Api.POST_MEMBER_PERSONAL_INFO, {}, (data) => {
            let params = {
              nickname: data.nickname,
              sex: data.sex,
              province: data.province,
              city: data.city,
              country: data.country,
              headImgUrl: data.headImgUrl,
              uprovince: data.uprovince,
              ucity: data.ucity,
              udist: data.udist,
              uaddress: data.uaddress,
              ucompany: data.ucompany,
              uname: that.uname,
              uemail: data.uemail,
              uphone: that.phone,
              inputCode: that.smsYzm,
              openId: data.openId,
              userType: data.userType
            };

            that._Util.post(that._Api.POST_MEMBER_PERSONAL_SAVE, params, function (data) {
              that._Util.post(that._Api.POST_MEMBER_PERSONAL_SAVE_WXAUTH, params, function (data) {
                //that._Util.showToast('认证成功');
                that.$router.replace({path: that.$route.query.fullPath});
              }, () => {

              }, that)
            }, () => {

            }, that);

          }, () => {

          }, that);
        }, function (data) {

        }, that);
      },
      sendSms(){
        let that = this;
        let msg = '';
        if (!that.phoneExp.test(that.phone)) {
          msg = '手机号码格式不正确或不能为空';
        }
        if (msg) {
          that._Util.showMsgBox(msg);
          return;
        }
        that.disableIn = true;

        that._Util.post(that._Api.POST_WXAUTH_PHONE_NOTE, {phone: that.phone}, function (data) {
          that.styleColor.smsColor = '#999999';
          let time = setInterval(function () {
            if (that.timeOut == 0) {
              that.disableIn = false;
              that.buttonValue = '发送验证码';
              that.styleColor.smsColor = '#ff0000';
              that.timeOut = 60;
              clearInterval(time);
              return;

            }
            that.buttonValue = that.timeOut-- + 's后重新发送';
          }, 1000)
        }, function () {

        }, that);
      }

    },
    components: {}
  }
</script>
