<template>
  <div v-if="labelItems" class="labelAll" id="labelAll">
    <div name="labelDiv" v-if="labelItems.length > 1" @click="checkedAll()" :class="{active: $route.query.facet == ''}"
         class="labelList">
      全部资料
    </div>
    <div name="labelDiv" @click="checked(o,1)" class="labelList" v-for="(o, index) in labelItems"
         v-if="index <= 3 && firstRow" :class="{active: $route.query.facet == o}">
      {{o}}
    </div>
    <div name="labelDiv" @click="checked(o,2)" class="labelList" v-for="(o, index) in labelItems"
         v-if="index > 3 && secondRow" :class="{active: $route.query.facet == o}">
      {{o}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      labelClass: {
        default () {
          return {}
        }
      },
      labelItems: {
        type: Array,
        required: true,
        default() {
          return []
        }
      },
      firstRow: {
        default() {
          return true;
        }
      },
      secondRow: {
        default() {
          return true;
        }
      }
    },
    data(){
      return {
        seeNone: 'active',
        labelId: ''
      }
    },
    methods: {
      checked(o, index) {
        this.seeNone = '';
        this.$parent.$emit('checkMenu', {index: index, o: o});
      },
      checkedAll(){
        this.seeNone = 'active';
        this.$parent.$emit('MenuAll');
      }

    },
    components: {}
  }
</script>
<style>
  .labelAll {
    overflow: hidden;
    background: white;
  }

  .labelList {
    margin-left: 4%;
    width: 20%;
    float: left;
    height: 30px;
    line-height: 30px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    margin-bottom: 5px;
    text-align: center;
  }

  .labelList.default {
    background: #1766b3;
    border: 1px solid #1766b3;

  }
</style>
