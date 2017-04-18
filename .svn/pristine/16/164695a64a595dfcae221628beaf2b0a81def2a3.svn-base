<template>
  <div>
    <div class="uploadMore">
      <button @click="getMoreList()">点击加载更多</button>
    </div>
  </div>
</template>
<script type="text/babel">

  export default{
    props: {
      resource_url: {
        type: String,
        required: true
      },
      checkId:{
        type: Number,
        required: true
      },
      keyUpdata:{
        type: String,
        required: true
      },
      params2: {
        type: Object,
        required: true,
        default() {
          return {
            vlue:{
              catalogueId:this.checkId,
              pageNum: 1,
              pageSize: 10
            }
          }
        }
      },
      params1: {
        type: Object,
        required: true,
        default() {
          return {
            queryValue: this.keyUpdata,
            pageModel: {
              currentPage: 1,
              pageSize: 10
            }
          }
        }
      }
    },
    data(){
      return {
        loadingShow: false,
        loading: false
      }
    },
    mounted(){
      let that = this;

    },

    methods: {
      search(){
        let that  = this;
        if(that.checkId == -1 || !that.checkId){
          that._Util.post(that.resource_url ,that.params1, (data) =>{
            that.$options.methods.handleResponseData(data, that);

          }, () =>{

          }, that)
        } else{
          that._Util.post(that.resource_url ,that.params2.vlue, (data) =>{
            that.$options.methods.handleResponseData(data, that);
          }, () =>{
          }, that)
        }
      },
      handleResponseData (response, that) {
        that.$emit('update', response);
      },

      getMoreList(){
        if(this.checkId == -1 || !this.checkId){
          this.params1.pageModel.pageSize += 10;
          this.search()
        } else {
          this.params2.vlue.pageSize += 10;
          this.search()
        }

      }
    }
  }
</script>

