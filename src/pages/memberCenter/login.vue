<template>
  <div style="min-height: 100%;">
    <div class="loginIndex">
      <img src="../../assets/images/crsLogo.png" alt="">
      <div class="loginPhone">
        <input v-model="phoneNumber" type="tel" maxlength="11" placeholder="请填写手机号码">
      </div>
      <div class="loginCode">
        <input v-model="codePass" type="tel" maxlength="6" placeholder="请输入验证码">
        <button @click="getCode()" :disabled="noClick">{{ codeNeed }}</button>
      </div>
      <div class="loginBtn">
        <button @click="login()">登录</button>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default{
    data(){
      return {
        phoneNumber: '',
        codePass: '',
        noClick: false,
        codeNeed: '点击发送验证码',
        phoneTest: /^1[34578]\d{9}$/,
      }
    },

    mounted() {
      let that = this;
      that.phoneNumber = that._Util.getLocalStorage('phoneNum') || '';
    },

    methods: {
      getCode() {
        let that =  this;
//                发送短信验证码
        if(!that.phoneTest.test(that.phoneNumber)){
          that._Util.showMsgBox('手机号码格式不正确，请重新输入')
          return;
        }
        that._Util.post('http://192.168.11.9/commonrail/app/sendMsgForApp.json', {phone: that.phoneNumber}, (data)=> {
          that._Util.setLocalStorage('phoneNum',that.phoneNumber)
          that.noClick = true;
          let timeDown = 59;
          that.codeNeed = '60秒后可重新发送'
          let times = setInterval(function(){
            that.codeNeed = timeDown + '秒后可重新发送'
            timeDown--;
            if(timeDown == 0){
              clearInterval(times)
              that.noClick = false;
              that.codeNeed = '点击发送验证码'
            }
          }, 1000)
        }, ()=> {

        }, that)
      },
      login() {
        let that = this;
        that._Util.post('http://192.168.11.9/commonrail/app/checkLoginForApp.json', {phone: that.phoneNumber, inputCode: that.codePass}, (data)=>{
          that._Util.setLocalStorage('sessionId', data.sessionId);
          api.sendEvent({
            name: 'isLogin',
            extra: {
              status: true
            }
          });

          if (that.$route.query.fullPath) {

            alert(that.$route.query.fullPath);
            window.location.href = that.$route.query.fullPath;
          } else {
            that.$router.push({ name : 'memberCenter'})
          }
        }, () => {

        }, that);
        //that.$router.push({ name : 'memberCenter'});
      }

    },

    components: {}
  }
</script>
