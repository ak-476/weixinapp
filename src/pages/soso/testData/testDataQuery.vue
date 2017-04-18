<template>
  <div>
    <Nav-menu-component :nav-menus="navMenus" :checkIndex="checkIndex" :class="className"></Nav-menu-component>

    <Test-data v-if="checkIndex == 0"></Test-data>

    <Gasket v-if="checkIndex == 1" :emit-keyword="emitKeyword"></Gasket>

    <Poking-me-component></Poking-me-component>

    <Footer-component></Footer-component>

    <div style="height:50px;"></div>
  </div>
</template>
<script type="text/babel">
  import NavMenuComponent from '../../../components/common/navMenuComponent.vue'
  import PokingMeComponent from '../../../components/common/pokingMeComponent.vue'
  import FooterComponent from '../../../components/common/footerComponent.vue'
  import TestData from './testData.vue'
  import Gasket from './gasket.vue'

  export default{
    name: 'TestDataQuery',
    data(){
      return {
        checkIndex: 0,
        emitKeyword: '',
        navMenus: [
          {
            title: '测试数据',
            url: '',
            className: '',
            active: true
          },
          {
            title: '垫片调整',
            url: '',
            className: '',
            active: false
          }
        ],
        className:'tabnav tabnav2'
      }
    },
    mounted() {
      let that = this;
      console.log(that.$route.query);

      if (that.$route.query.type) {
      	that.checkIndex = parseInt(that.$route.query.type);
      }

      that.$on('checkMenu', (obj) => {
        if (obj == 0) {
          that.emitKeyword = '';
        }
        that.checkIndex = obj;
      });

      that.$on('emitKeyword', (obj) => {
        that.emitKeyword = obj;
      });
    },
    methods: {},
    components: {
      PokingMeComponent,
      NavMenuComponent,
      FooterComponent,
      TestData,
      Gasket
    }

  }
</script>
