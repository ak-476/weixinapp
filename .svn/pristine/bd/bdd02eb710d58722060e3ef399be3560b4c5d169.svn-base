<template>
  <div @click.stop="save()" :class="clineName" class="shoucangtf">
    <span :class="{active: collectFlag || isCancel}" class="newstar"></span>
    <span style="display: inline-block;width: 45px;text-align: right">{{isCancel ? '取消' : (collectFlag ? '已收藏' : '收藏')}}</span>
  </div>
</template>

<script type="text/babel">
  export default{
    props: {
      collectParams: {
        type: Object,
        default() {
          return {}
        }
      },
      clineName: {
        type: String,
        default() {
          return ''
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
        collectFlag: '',
        msg: ''
      }
    },

    mounted() {
      let that = this;
      that.collectFlag = that.collectParams.favId || '';
    },

   beforeUpdate() {
     let that = this;
     that.collectFlag = that.collectParams.favId || '';

   },

    methods: {
      save() {
        let that = this;

        if (that.collectFlag || that.isCancel) {
          that._Util.showMsgBoxConfirm('是否取消收藏？', (action) => {
            if (action) {
              that._Util.post(that._Api.POST_COLLECTION_CANCEL, {
                id: that.collectParams.favId
              }, () => {
                that.collectFlag = '';
                that.collectParams.favId = '';
                that._Util.showToast('取消成功');
                that.$parent.$emit('collectResult', {favId: null})
              }, () => {

              }, that, false);
            }
          }, {
            confirmButtonText: '是',
            cancelButtonText: '否'
          });
        } else {

          that._Util.getUserStatus(that, () => {
              that._Util.showMsgBoxConfirm('是否对该资料进行收藏？', (action) => {
                if (action) {
                  that._Util.post(that._Api.POST_COLLECTION_SAVE, that.collectParams, (data) => {
                    that.collectFlag = data.id;
                    that.collectParams.favId = data.id;
                    that._Util.showToast('收藏成功');
                    that.$parent.$emit('collectResult', {favId: data.id});
                  }, () => {

                  }, that, false);
                }
              });
            }, () => {

            }, {
              name: that.$route.name,
              fullPath: that.$route.fullPath
            },
            that._Enums.ENUMS_USER_STATUS.VIP
          );
        }
      }
    },

    watch: {
      'collectParams.favId'() {
        this.collectFlag = this.collectParams.favId;
      }
    },

    components: {}
  }
</script>
