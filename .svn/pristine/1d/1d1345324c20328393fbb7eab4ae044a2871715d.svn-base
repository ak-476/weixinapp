<template>
  <div @click="toDetail(item)">
    <p class="tit2">
      <span v-if="item.solrType == 'Rail'" v-html="'油轨型号:' + item.smodel"></span>
      <span v-else-if="item.solrType == 'Pump'" v-html="'油泵型号:' + item.pmodel"></span>
      <span v-html="'喷油器型号:' + item.pyq"></span></p>
    <p class="desc" v-html="item.zjcn"></p>

    <Collection v-if="showCollect" :collectParams="{
            moduleType: item.moduleType,
            objId: item.sn,
            queryValue: item.id,
            favId: favId || item.favId
          }" :isCancel="isCancel" class="yuncang" ></Collection>

    <Close-page-component v-if="showDetail" :result="result"
                          :hlFlField="hlFlField" :moduleType="moduleType"></Close-page-component>

  </div>
</template>

<script type="text/babel">
  import Collection from '../common/collection.vue'
  import ClosePageComponent from '../../components/common/closePageComponent.vue'
  import CodeDialogComponent from '../../components/common/codeDialogComponent.vue'
  import partsTableConfig from '../../pages/soso/universal/parts.table.config.json'

  export default{
  	props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      },

      favId: {
        type: Number,
        default() {
          return null
        }
      },

      showCollect: {
        type: Boolean,
        default() {
          return false
        }
      },

      isCancel: {
        type: Boolean,
        default() {
          return false
        }
      }
    },

    data(){
      return {
        showDetail: false,
        dialogShow: false,
        moduleType: '',
        hlFlField: '',
        result: {}
      }
    },

    methods: {
      toDetail(item) {
        let that = this;
        that._Util.post(that._Api.POST_PARTS_OHK_INFO, {id: item.id, solrType: item.solrType}, function (data) {
          //that.result = data;

          that.result = {
            source: [data],
            attrItems: partsTableConfig
          };
          that.moduleType = data.moduleType;
          that.showDetail = true;
        }, function () {

        }, that);
      }
    },

    components: {
      Collection,
      ClosePageComponent,
      CodeDialogComponent
    }
  }
</script>
