<template>
  <div>
    <div class="vuetagger">
      <div class="vuetagger-list">
        <span v-for="tag in values" class="vuetagger-tag">
          {{ tag.natureChildName? tag.natureChildName : tag.name }} <span class="vuetagger-tag-remover" @click="remove(tag)">&times;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      values: {
        type: Array,
        default: ''
      }
    },

    data() {
      return {
        newTag: ''
      }
    },

    mounted() {

    },

    methods: {
      /**
       * Remove the selected tag
       * @param {string} tag  Tag name
       */
      remove(tag) {
        const index = this.values.indexOf(tag)
        this.values.splice(index, 1)
        this.$emit('change', this.values)
      },


      /**
       * Remove the last tag
       */
      removeLastTag() {
        if (this.newTag === '' && this.values.length > 0) {
          this.values.pop()
          this.$emit('change', this.values)
        }
      }

    }
  }
</script>

<style scoped>

</style>
