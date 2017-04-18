<template>
  <div>
    <div v-if="searchFlag && !$route.query.keyword">
      <div class="zlscimg">
        <img src="../../../assets/images/dianluziliao/zlsearcherl.png">
      </div>
      <div class="zlscinput">
        <input v-model="keyword" class="text" type="text" placeholder="请输入查询信息的关键字">
        <input type="button" @click="search(true)" class="inputSubmit" value="搜搜"/>
      </div>
      <div class="zlscword">
        <p class="yuanxinl">在这里您可以检索查阅各种发动机资料，整车资料，系统部件资料。海量资料等你来查
        </p>
        <p class="yuanxinl">请输入正确关键字“EDC7”“潍柴”“后处理”等
        </p>
        <p class="yuanxinl">您可以直接点击文件进行查看，文件偏大的需稍等片刻
        </p>
      </div>
    </div>

    <div v-if="!searchFlag || $route.query.keyword">
      <div class="faultCodeSeach" style="margin-top: 0px;">
        <div class="sosoformSearch">
          <div class="submit">
            <input type="button" @click="search(true)" class="inputSubmit" value="搜搜">
          </div>
          <div class="input">
            <input type="text" v-model.trim="keyword" class="inputText" placeholder="请输入搜索关键字"/>
          </div>
        </div>
      </div>

      <div id="scrollwrapper" style="bottom: 52px; top: 152px;">
        <div class="faultCodeLTable" style="height: 100%;">
          <div id="resultHeight" style="height: 100%;">
            <div class="zltypelist findlist findlistheight" v-if="resultList.bolist != ''">
              <ul v-for="o in resultList.bolist"
                  @click="viewFiles(o.id)" class="brand">

                <li class="li1">
                  <a href="javascript: void(0);">
                    <!--let arrA = ['JPG', 'PNG', 'BMP', 'GIF'];
                    let arrB = ['PDF'];
                    let arrC = ['MP4', 'AVI', 'MPG', 'WMV', 'ASF'];-->
                    <img
                      v-if="o.fileType.indexOf('JPG') != -1 || o.fileType.indexOf('PNG') != -1 || o.fileType.indexOf('BMP') != -1 || o.fileType.indexOf('GIF') != -1"
                      src="../../../assets/images/dianluziliao/zlphoto.png">
                    <img v-if="o.fileType.indexOf('PDF') != -1"
                         src="../../../assets/images/dianluziliao/zlpdf.png">
                    <img
                      v-if="o.fileType.indexOf('MP4') != -1 || o.fileType.indexOf('AVI') != -1 || o.fileType.indexOf('MPG') != -1 || o.fileType.indexOf('WMV') != -1 || o.fileType.indexOf('ASF') != -1"
                      src="../../../assets/images/dianluziliao/zlvidio.png">
                  </a>
                </li>
                <li class="li2">
                  <a href="javascript: void(0);">
                    <span v-html="o.fileName"></span>
                  </a>
                  <p>
                    <img src="../../../assets/images/dianluziliao/zlhuo.png">
                    推荐热度:<span>{{o.fileDownload}}</span>
                  </p>
                  <p>
                    文件大小: <span v-text="calculateFileSize(o.fileLength)"></span>
                  </p>

                  <Collection :collectParams="{
                    moduleType: _Enums.COLLECTION_MODULE.RESOURCES,
                    objId: o.sn,
                    queryValue: o.id,
                    favId: o.favId
                  }" class="yuncang" ></Collection>
                </li>
              </ul>
            </div>
            <p v-if="resultList.bolist == ''" class="promptHelp">
              提示：小轨绞尽脑汁也没查到您输入的故障码，请核对故障码输入是否有误。
            </p>
          </div>
        </div>
      </div>
      <Pagination-component :resource_url="resource_url" :reload="reload" :params="params"
                            @update="updateResource"></Pagination-component>
    </div>
    <code-dialog-component :show="dialogShow"></code-dialog-component>
  </div>
</template>

<script type="text/babel">
  import CodeDialogComponent from '../../../components/common/codeDialogComponent.vue'
  import PaginationComponent from '../../../components/common/paginationComponent.vue';
  import Collection from '../../../components/common/collection.vue'

  export default{
    data(){
      return {
        dialogShow: false,
        keyword: '',
        searchFlag: true,
        id: '',
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im,
        reload: '',
        result: {},
        resource_url: this._Api.POST_DATAUM_LIST,
        params: {
          queryValue: this.keyword,
          pageModel: {
            currentPage: 1,
            pageSize: 10
          }
        },
        resultList: [],
      }
    },
    mounted() {
      let that = this;

      that.keyword = that.$route.query.keyword || '';
      that.params.queryValue = that.keyword;

      that.$parent.$on('searchFlag', (data) => {
        that.searchFlag = data;
      });
    },
    methods: {
      search(flag) {
        let that = this;

        if (!that.keyword) {
          that._Util.showMsgBox('请填写查询关键词');
          return;
        }

        if (that.keyword.length < 2) {
          that._Util.showMsgBox('请至少输入两个字符');
          return;
        }

        if (that.patrn.test(that.keyword)) {
          that._Util.showMsgBoxThen('输入内容含有特殊字符', () => {
            that.keyword = '';
          });
          return;
        }
        that.searchFlag = false;
        that.params.queryValue = that.keyword;

        let query = that._Util.copyObject(that.$route.query);
        if (flag) {
          query.currentPageNum = 1;
          query.keyword = that.keyword;
          query.random = Math.floor(Math.random()*10000+1);
        }
        that.$router.replace({query: query});
        //that.reload = (Date.parse(new Date())).toString();
        //that.$router.replace({name: 'datumSearchList', params: {keyword: that.keyword}})
      },
      updateResource(data) {
        this.resultList = data;
        document.getElementById('scrollwrapper').scrollTop = 0;
      },
      handleScroll: function (e) {
        var currentScrollPosition = e.srcElement.scrollTop;
        console.log(currentScrollPosition);
        if (currentScrollPosition > this.scrollPosition) {

        }
        this.scrollPosition = currentScrollPosition;
      },
      calculateFileSize(fileLength) {
        let len = '0KB';
        if (fileLength) {
          len = fileLength / 1024;
          if (len < 1024) {
            len = parseInt(len) + "KB";
          } else {
            len = parseInt(len / 1024) + "MB";
          }
        }
        return len;
      },
      viewFiles(fileId) {
        window.location.href = this._Api.HOSTOLD + '/wxauth/searchDataTree/fileView.htm?fileId=' + fileId;
        //window.location.href = "http://192.168.11.58:8080/wxauth/searchDataTree/fileView.htm?fileId=" + fileId;
      }
    },
    components: {
      PaginationComponent,
      CodeDialogComponent,
      Collection
    },
//    watch: {
//      '$route' (to, from) {
//        this.search();
//      }
//    }

    beforeRouteUpdate(to, from, next) {
      next();
      this.reload = (Date.parse(new Date())).toString();
    }
  }
</script>
<style>
  body {
    height: 100%;
    overflow: hidden;
  }
</style>
