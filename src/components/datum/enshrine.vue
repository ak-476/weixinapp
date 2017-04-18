<template>
  <div class="textCheck">
    <button :disabled='disabledName' @click.stop = 'colected(colect.id)' :class='{active : clickTime == 1}'>
      {{ keyword }}
    </button>
  </div>
</template>
<script>
  export default{
    props: {
      colect:{
       default () {
          return {}
        }
      }
    },
    data(){
      return {
        disabledName: false,
        keyword: '收藏',
        clickTime: 0
      }
    },
    mounted(){
    },
    methods:{
      colected(id){
        let that = this;
        that.keyword = '已收藏';
        that.disabledName = true;
        that.clickTime++;
        that.$parent.$emit('colectCheck',{id:id});
      }
    },
    components: {}
  }
</script>
