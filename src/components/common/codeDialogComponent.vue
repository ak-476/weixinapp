<template>
  <div v-if="show" class="alert_add" id="alert_add">
    <div class="alert_bottom"></div>
    <div class="alert_brove">
      <p>请输入图中验证码</p>
      <div class="alert_get">
        <div class="alert_input">
          <input type="tel" v-model="verifyCode" :maxlength="4"/>
        </div>

        <div class="alert_img">
          <ul>
            <li>
              <img :src="_Api.POST_WXAUTH_VERIFY_CODE + '?' + random" @click="random = Math.random()"/>
            </li>
            <li>
              <a href="javascript:void(0);" @click="random = Math.random()">看不清楚换一张</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="alert_button">
        <input type="button" @click="save()" :disabled="!verifyCode" value="确认"/>
        <input type="button" @click="cancel()" class="alert_close" value="取消">
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default{
    name: 'CodeDialogComponent',
    props: {
      show: {
        default: false
      }
    },
    data(){
      return{
        random: Math.ceil(Math.random()*10000),
        verifyCode: ''
      }
    },
    mounted() {

    },
    watch: {
      show: function (val) {
        if (val) {

        }
      }
    },
    methods: {
      save() {
        let that = this;
        that._Util.post(that._Api.POST_WXAUTH_CHECK_VERITY_CODE, {code: that.verifyCode}, (data) => {
            if (!data.verifyStatus) {
              that._Util.showMsgBox('验证码校验失败');
            } else {
              this.$parent.$emit('verifyCodeCorrect')
            }
          }, function () {

        }, that);
      },

      cancel() {
        this.$parent.$emit('dialogCancel')
      }
    },
    components:{

    }
  }
</script>
