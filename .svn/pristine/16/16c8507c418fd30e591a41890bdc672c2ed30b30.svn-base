<template>
  <div style="background: #ededed;overflow: hidden;min-height: 100%;">
    <div style="background: #ededed;min-height: 100%;">
      <ul class="list_style2 nopadding">
        <li v-for="v in result" v-if="result.length">
          <a @click="location(v.addressId)">{{ v.trainAddress }}</a>
        </li>
      </ul>
      <div v-if="!result.length" style="text-align:center">
        你还未参加过任何培训
      </div>
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
      that._Util.post(that._Api.POST_LECTURE_ROOM_ADVICE, {}, (data) => {
        that.result = data;
      }, () => {

      }, that)
    },
    methods: {
      location(o){
        let that =this;
            window.location.href = that._Api.HOSTOLD + '/wxauth/questionNaire.htm?trainingAddress='+o;
      }
    },
    components: {}
  }
</script>
