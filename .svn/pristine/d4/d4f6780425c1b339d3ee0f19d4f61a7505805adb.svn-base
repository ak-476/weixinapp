<template>

      <div style="border-top: 0px solid #EDEDED; background: white">
        <a v-for="(menu, index) in navMenus" :class="{active: checkIndex == index}" @click="checkMenu(menu, index)"
           style="font-weight: bold;font-size: 16px;">
          <span class="icony"></span>
          <span class="word">{{menu.title}}
            <span class="number" v-if="showNumber && menu.navNumber && index == 0">{{ menu.navNumber}}</span>
            <span class="number" v-if="showNumber && menu.navNumber && index > 0">({{ menu.navNumber}})</span>
          </span>
        </a>
      </div>

</template>

<script>
  export default{
    name: 'NavMenuComponent',
    props: {
      navMenus: {
        type: Array,
        default: []
      },
      checkIndex: {
        default() {
          return 0;
        }
      },
      showNumber:{
        default:''
      }
    },
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
      checkMenu(menu, index) {
        //if (index == this.checkIndex) return;
        this.$parent.$emit('checkMenu', index)
      }
    }
  }
</script>
