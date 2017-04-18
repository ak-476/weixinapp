<template>
  <div style="background: #ededed;overflow: scroll;min-height: 100%;">
    <div style="background: #ededed;min-height: 100%;">
      <ul class="list_style2 nopadding">
        <li v-for="o in result">
          <a @click="location(o)">{{ o.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        index: this.$route.query.index,
        result: {}
      }
    },
    mounted(){
      let that = this ;
      that._Util.post(that._Api.POST_LECTURE_ROOM_COURSEWARE,{index : that.index}, (data) => {
        that.result = data.soureUrl ;
      }, () => {

      }, that)

    },
    methods:{
      location(o){
        let that = this;
        that._Util.post(that._Api.POST_LECTURE_ROOM_COURSESTATU,{},(data) => {
          if(data.verifyStatus == true){
            window.location.href = o.url;
            return ;
          }
          that._Util.showMsgBox('您好您尚未报名成功或者尚未签到参加交流会~');
        },() => {

        },that)
      }
    },
    components: {}
  }
</script>
