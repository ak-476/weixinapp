<template>
  <div>
    <Nav-menu-component :check-index="checkIndex" :nav-menus="navMenus" :class="className"></Nav-menu-component>
    <div style="height: 80px;"></div>
    <router-view class="child-view" :class-name="className"></router-view>
  </div>
</template>
<script type="text/babel">
  import NavMenuComponent from '../../../components/common/navMenuComponent.vue'

  export default{
    data(){
      return {
        transitionName: 'slide-left',
        navMenus: [
          {
            title: '资料搜索',
            url: '',
            className: '',
            active: true
          }, {
            title: '发动机资料',
            url: '',
            className: '',
            active: false
          }, {
            title: '整车资料',
            url: '',
            className: '',
            active: false
          }, {
            title: '系统资料',
            url: '',
            className: '',
            active: false
          }
        ],
        className: 'tabnav tabnav2 tabzldq',
        checkIndex: 0
      }
    },
    beforeMount() {
      console.log(this.$route.query);
      if (this.$route.query.checkIndex) {
        switch (parseInt(this.$route.query.checkIndex)) {
          case 2:
            this.checkIndex = 2;
            break;
          case 3:
            this.checkIndex = 1;
            break;
          case 4:
            this.checkIndex = 3;
            break;
          default:
            this.checkIndex = 0;
            break;
        }
      }
    },
    mounted() {
      let that = this;

      if (that.$route.query.checkIndex) {
        switch (parseInt(that.$route.query.checkIndex)) {
          case 2:
            that.checkIndex = 2;
            break;
          case 3:
            that.checkIndex = 1;
            break;
          case 4:
            that.checkIndex = 3;
            break;
          default:
            that.checkIndex = 0;
            break;
        }
      }

      that.$on('checkMenu', function (index) {
        let path = {};
        let temp = '';
        that.checkIndex = index;
        switch (index) {
          case 0:
            path = 'datumSearch';
            temp = 0;
            that.$emit('searchFlag', true);
            break;
          case 1:
            path = 'engine';
            temp = 3;
            break;
          case 2:
            path = 'engine';
            temp = 2;
            break;
          case 3:
            path = 'engine';
            temp = 4;
            break;
        }
        that.$router.replace({name: path, query: {checkIndex: temp}});
      });
    },
    watch: {
      '$route' (to, from) {
        if (to.name == 'engine') {
          switch (parseInt(to.query.checkIndex)) {
            case 2:
              this.checkIndex = 2;
              break;
            case 3:
              this.checkIndex = 1;
              break;
            case 4:
              this.checkIndex = 3;
              break;
          }
        } else if (to.name == 'datumSearch') {
          this.checkIndex = 0;
        }
      }
    },
    components: {
      NavMenuComponent
    }
  }
</script>
