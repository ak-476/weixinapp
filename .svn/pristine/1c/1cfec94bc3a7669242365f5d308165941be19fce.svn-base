<template>
  <div @click="toQa()" :class="clineName" class="onlinetf">
    <span>在线问答</span>
  </div>
</template>

<script type="text/babel">
  export default{
    props: {
      clineName: {
        type: String,
        default() {
          return ''
        }
      },
      type: {
      	type: Number,
        default() {
      		return 0
        }
      },
      question: {
      	type: String,
        default() {
      		return ''
        }
      }
    },

    data(){
      return {}
    },

    mounted() {

    },

    methods: {
      toQa() {
        let that = this;
        that._Util.getUserStatus(that, () => {
            window.location.href = this._Api.HOSTOLD + 'wxauth/askQuestion.htm' + (that.question ? that.question + '&': that.question + '?') + 'burSource=2';
          }, () => {

          }, {
            name: that.$route.name,
            fullPath: that.$route.fullPath
          },
          that._Enums.ENUMS_USER_STATUS.VIP
        );
      }
    },

    components: {

    }
  }
</script>
