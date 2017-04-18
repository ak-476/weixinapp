<template>
  <div style="background: #ededed;overflow: hidden;min-height: 100%;">
    <div style="background: #ededed;min-height: 100%;">
      <ul class="list_style2 nopadding">
        <li v-for="(v , index) in result">
          <a @click="location(index)">{{ v.name }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>
<style>
</style>
<script type="text/babel">
  export default{
    data(){
      return {
        result: []
      }
    },
    mounted(){
      let that = this;
      that._Util.post(that._Api.POST_LECTURE_ROOM_COURSEWARE, {}, (data) => {
        that.result = data;
      }, () => {

      }, that)
    },
    methods: {
      location(o){
        let that = this;
//        window.location.href = that._Api.HOSTOLDWX + '/wxauth/trainingSourceDetail.htm?sourceId=' + o.id;
//        that._Util.post(that._Api.POST_LECTURE_ROOM_COURSESTATU,{},(data) => {
//          return;
//          if(data.verifyStatus == true){
//            window.location.href = that._Api.HOSTOLDWX + '/wxauth/trainingSourceDetail.htm?sourceId=' + o.id;
//            return ;
//          }
//          that._Util.showMsgBox('您好您尚未报名成功或者尚未签到参加交流会~');
//
//
//        },() => {
//
//        },that)

        that.$router.push({name: 'courseWareList', query: {index: o}});
      }
    },
    components: {}
  }
</script>
