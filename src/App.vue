<style>
  @import "./assets/css/common_v1.css";
  @import "./assets/css/reset.css";
  @import "./assets/css/crs.css";
  @import "./assets/css/alert_add.css";
  @import "./assets/css/dianluziliao.css";
  @import "./assets/css/igandChange.css";
  @import "./assets/css/personal.css";
  @import './assets/css/jiangtangGG.css';
</style>

<template>
  <div style="height: 100%">
    <router-view class="view" style="height: 100%;"></router-view>
  </div>
</template>

<script type="text/babel">
  import './assets/font/iconfont.css';

  export default {
    data () {

      return {
        msg: 'Hello Vue!'
      }
    },
    components: {}
  }
</script>
