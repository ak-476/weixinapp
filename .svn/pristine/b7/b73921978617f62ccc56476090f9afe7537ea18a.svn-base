<template>
  <div>
    <div style="height:10px"></div>
    <Brand-logo-component :logo-url="logoUrl" :params="params"></Brand-logo-component>
  </div>
</template>

<script type="text/babel">
  import BrandLogoComponent from '../../../components/common/brandLogoComponent.vue'

  export default{
    data(){
      return {
        logoUrl: this._Api.POST_DATAUM_LOGO,
        params: {
          parentId: this.$route.query.checkIndex
        }
      }
    },
    mounted() {

      let that = this;
      that.$on('checkLogo', (obj) => {
        that._Util.log(obj);
        let urlParams = {
          name: 'datumList',
          query: {parentId: obj.parentId, logoId: obj.id, keyword: obj.treeName, checkIndex: that.$route.query.checkIndex}
        };
        that.$router.push(urlParams);
      });

    },
    components: {
      BrandLogoComponent
    }
  }
</script>
