<template>
  <div class="pagebtn" v-if="pageShow">
    <input type="button" @click="pageUp()"
           :disabled="loading"
           class="pageprve" value="上一页"/>
    <div class="pagenana">
      <input type="text" v-model="params.pageModel.currentPage" class="pageIndex" readonly/>
      /
      <input type="text" v-model="last_page" class="pageMax" readonly/>
    </div>
    <input type="button" @click="pageDown()"
           :disabled="loading" class="pagenext" value="下一页"/>

    <code-dialog-component :show="dialogShow"></code-dialog-component>
  </div>

</template>
<script type="text/babel">
  import CodeDialogComponent from './codeDialogComponent.vue'

  export default{
    props: {
      resource_url: {
        type: String,
        required: true
      },
      reload: {
        type: String,
        required: false
      },
      styles: {},
      custom_template: '',
      options: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      },
      params: {
        type: Object,
        required: true,
        default() {
          return {
            pageModel: {
              currentPage: 1,
              pageSize: 10
            }
          }
        }
      }
    },
    data(){
      return {
        last_page: 0,
        pageShow: true,
        loading: false,
        dialogShow: false
      }
    },
    mounted(){
      let that = this;
//      that._Util.post(that._Api.POST_FALT_CODE_LIST,(data) => {
//        alert(data)
//      })
      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });
      that.$on('verifyCodeCorrect', () => {
        that.dialogShow = false;
        that.fetchData('', that);
      });
    },

    methods: {
      search (pageUrl) {
        let that = this;
        that.params.pageModel = {
          currentPage: that.$route.query.currentPageNum || 1,
          pageSize: 10
        };
        that._Util.getUserLog((data) => {
          that.fetchData(pageUrl, that);
        }, () => {
          that.dialogShow = true;
        }, that);
      },
      fetchData (pageUrl, self) {
        let that = self;

        pageUrl = pageUrl || that.resource_url;
        that.loading = true;
        that._Util.post(pageUrl, that.params, (data) => {
          that.pageShow = true;
          that.loading = false;
          that.$options.methods.handleResponseData(data, that);
        }, () => {
          that.pageShow = false;
          that.params.pageModel.currentPage = 0;
          that.loading = false;
        }, that);
      },



      handleResponseData (response, that) {
        that.makePagination(response, that);
        that.$emit('update', response);
      },

      makePagination (data, that) {
        let pageModel = data.pageModel;
        that.current_page = pageModel.currentPage;
        that.last_page = pageModel.totalPage;
        that.next_page_url = (that.current_page === that.last_page) ? null : that.resource_url;
        that.prev_page_url = (that.current_page === 1) ? null : that.resource_url;
      },

      pageUp() {
        if (this.params.pageModel.currentPage <= 1) {
          this._Util.showMsgBox('已经是第一页');
          return;
        }
        this.params.pageModel.currentPage--;
        //this.fetchData();
        this._setUrlPage(this);
      },

      pageDown() {
        if (this.params.pageModel.currentPage > this.last_page - 1) {
          this._Util.showMsgBox('已经是最后一页');
          return;
        }
        this.params.pageModel.currentPage++;
        //this.fetchData();
        this._setUrlPage(this);
      },

      _setUrlPage(self) {
        let that = self;
        let query = that._Util.copyObject(that.$route.query);
        query.currentPageNum = that.params.pageModel.currentPage;
        that.$router.replace({query: query});
      }
    },
    watch: {
      resource_url () {
        this.search();
      },
      reload (flag) {
        this.params.pageModel = {
          currentPage: 1,
          pageSize: 10
        };
        this.search();

      }
    },
    created () {
      this.search();
    },
    components: {
      CodeDialogComponent
    }
  }
</script>
<style>
  .pagenana {
    position: relative;
    width: 80px;
  }

  .pagenana input.pageIndex {
    position: absolute;
    left: 0;
    width: 35px;
    line-height: 35px;
    text-align: center;

  }

  .pagenana input.pageMax {
    position: absolute;
    right: 0;
    width: 35px;
    line-height: 35px;
    text-align: center;

  }
</style>
