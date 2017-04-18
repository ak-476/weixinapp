<template>
  <div @click="toDetail(item)">
    <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin: 10px;width: 90%;">
                  <p class="tt ellipsis" v-html="item.spn_fmi"></p>
                  <p> 车型：{{item.the_system}}</p>
                  <p class=" gray_666"> 系统：{{item.applicable_car}}</p>
                </span>

    <Collection v-if="showCollect" :collectParams="{
            moduleType: _Enums.COLLECTION_MODULE.FAULT,
            objId: item.sn,
            queryValue: item.id,
            favId: favId || item.favId
          }" :isCancel="isCancel" class="yuncang" ></Collection>

    <Close-page-component v-if="showDetail" :result="result"
                          :hlFlField="hlFlField" :moduleType="_Enums.COLLECTION_MODULE.FAULT"></Close-page-component>

    <code-dialog-component :show="dialogShow"></code-dialog-component>
  </div>

</template>

<script type="text/babel">
  import Collection from '../common/collection.vue'
  import ClosePageComponent from '../../components/common/closePageComponent.vue'
  import CodeDialogComponent from '../../components/common/codeDialogComponent.vue'

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
        hlFlField: '',
        result: {}
      }
    },

    mounted() {
      let that = this;

      that.$on('collectResult', (data) => {
        that.$parent.$emit('collectResult', data);
      });

      that.$on('closeDetail', () => {
        that.showDetail = false;
        that.hlFlField = '';
        that.result = {};
      });

      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });

      that.$on('verifyCodeCorrect', () => {
        that.dialogShow = false;
        that.getDetail({id: that.detailId}, that);
      });
    },

    methods: {
      toDetail(item) {
        let that = this;
        that._Util.getUserLog((data) => {
          that.hlFlField = item.hlFlField;
          that.getDetail(item, that);
        }, () => {
          that.dialogShow = true;
        }, that);
      },

      getDetail(item, self) {
        let that = self;
        that._Util.post(that._Api.POST_FALT_CODE_DETAIL, {id: item.id}, function (data) {
          that.result = data;
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
