<template>
  <div>
    <div class="parseInfo">
      <Nav-menu-component :nav-menus="navMenus" :class="className"
                          :checkIndex="checkIndex"></Nav-menu-component>
    </div>


    <Parts v-if="checkIndex == 0"></Parts>
    <Mating :mating-engine="matingEngine" v-if="checkIndex == 1"></Mating>
  </div>
</template>

<script>
  import NavMenuComponent from '../../../components/common/navMenuComponent.vue'
  import Parts from './parts.vue'
  import Mating from './mating.vue'
  export default{
    data(){
      return {
        navMenus: [
          {
            title: '部件信息',
            url: '',
            className: '',
            active: true
          },
          {
            title: '配套信息',
            url: '',
            className: '',
            active: false
          }
        ],
        className: 'tabnav tabnav2',
        checkIndex: 0,
        matingEngine: ''
      }
    },
    mounted() {
      this.$on('checkMenu', function (obj) {
        this.checkIndex = obj;
      });

      this.$on('checkEngine', function (obj) {
        this.matingEngine = obj;
      });
    },
    components: {
      NavMenuComponent,
      Parts,
      Mating
    }
  }
</script>
