<template>
  <div>
    <div v-show="!showDetail" class="faultCodeSeach">
      <input type="hidden" id="serachType" name="serachType"/>
      <input type="hidden" id="pageIndex" name="pageIndex"/>
      <input type="hidden" id="maxPage" name="maxPage"/>
      <div class="sosoformSearch">
        <div class="submit">
          <input type="button" @click="search(true)" class="inputSubmit" value="搜搜">
        </div>
        <div class="input">
          <input type="text" v-model.trim="keyword" class="inputText" placeholder="请输入搜索关键字"/>
        </div>
      </div>
    </div>


    <div v-show="!showDetail" ref="scrollwrapper" id="scrollwrapper" style="bottom: 52px; top: 72px;">
      <div class="faultCodeLTable" style="height: 100%;">
        <div id="resultHeight" style="height: 100%;">
          <div class="list2 sosoList" style="height: 100%; padding: 0">
            <p v-if="!resultList.bolist.length" class="promptHelp">
              提示：小轨绞尽脑汁也没查到您输入的故障码，请核对故障码输入是否有误。
            </p>
            <ul ref="testUl" @scroll="handleScroll">

              <li class="iconHand"
                  v-if="resultList.guideList.length > 0 && resultList.guideList.indexOf('FaultDiagnss') != -1">

                <!--故障代码跳转-->
                <div class="con" style="padding-left: 40px;">
                  <a @click="toFaultCode()">您是不是要找 <span style="color: red">{{keyword}}</span> 的故障代码?</a>
                </div>
              </li>

              <!--@click="toDetail(o, $event, index)"-->
              <li v-for="(o, index) in resultList.bolist" style="padding: 0 0 5px 0">
                <div v-if="o.solrType == 'Posts'" class="iconArticle" style="margin: 10px;padding: 10px 0 10px 40px;">
                  <div class="con">
                    <img v-if="o.postImg" :src="o.postImg" class="postImg"/>
                    <p class="tit"><a @click="article(o.sn)" v-html="o.postTitle"></a></p>
                    <p class="desc" v-html="o.postSummary"></p>
                  </div>
                </div>

                <div v-if="o.solrType == 'ImageText'" class="iconArticle" style="margin: 10px;padding: 10px 0 10px 40px;"
                     @click="getUrl(o.newsUrl)">
                  <img :src="o.newsPicUrl" class="postImg"/>
                  <div class="con">
                    <p class="tit"><a v-html="o.newsTitle"></a></p>
                    <p class="desc" v-html="o.newsDescription"></p>
                  </div>
                </div>

                <div v-if="o.solrType == 'DataShare'" class="iconPicture" style="margin: 10px;padding: 10px 0 10px 40px;"
                     @click="viewFiles(o.id)">
                  <div class="con">
                    <span class="tit2">
                      <a v-if="userResults.userStatus == 2" v-html="o.fileName"></a>
                      <a v-else @click="alertStatus()" v-html="o.fileName"></a>
                    </span><br>
                    <span class="desc" style="display: block">推荐热度：{{o.fileDownload}}</span>
                    <span class="desc" style="display: block">文件类型：{{o.fileType}} </span>
                    <span class="desc" style="display: block">文件大小：{{o.fileLengthKB}}</span>
                  </div>
                </div>

                <div v-if="o.solrType == 'VipQuestion'" class="iconQ" style="margin: 10px;padding: 10px 0 10px 40px;"
                     @click="questionList(o)">
                  <div class="con">
                    <a>
                      <span class="tit" style="display: block">{{o.typeStr}}&nbsp;&nbsp;&nbsp;&nbsp;<em>{{o.createTimeStr}}</em></span>
                      <span class="desc" style="display: block" v-if="o.type == 3" v-html="o.text5"></span>
                      <span class="desc" style="display: block" v-html="o.text1+o.text2+o.text3"></span>

                    </a>
                  </div>
                </div>

                <div
                  v-if="o.solrType == 'Product' || o.solrType == 'Rail' ||　o.solrType == 'Pump' ||　o.solrType == 'Dzpyq'"
                  class="iconProduct" style="margin: 10px;padding: 10px 0 10px 40px;" @click="toDetail(o);">
                  <div class="con">
                    <a href="javascript:void(0)">
                      <p class="tit2">
                        <span v-if="o.solrType == 'Rail'" v-html="'油轨型号:' + o.smodel"></span>
                        <span v-if="o.solrType == 'Pump'" v-html="'油泵型号:' + o.pmodel"></span>
                        <span v-html="'喷油器型号:' + o.pyq"></span></p>
                      <p class="desc" v-html="o.zjcn"></p>
                    </a>
                  </div>
                </div>

                <!--_o.the_system-->
                <div v-if="o.solrType == 'OBD'" style="margin: 10px;padding: 10px 0 10px 40px;" class="iconFaltCode"
                     @click="getFaultCodeDetail(o)">
                  <div class="con">
                    <a href="javascript:void(0)">
                      <p v-html="(o.applicable || '') + '-' + o.code" class="tit"></p>
                      <p class="desc" v-html="o.desc"></p>
                    </a>
                  </div>
                </div>

                <div v-if="o.solrType == 'TestData'" style="margin: 10px;padding: 10px 0 10px 40px;" class="iconTestData"
                     @click="testData(o.id,o.type)">
                  <div class="con">
                    <a><span class="tit2">
                      <span v-if="o.type == '1'" v-html="'喷油器测试数据：' + o.pyq"></span>
                      <span v-html="'油泵测试数据：' + o.pump"></span></span></a>
                  </div>
                </div>

                <div v-if="o.solrType != 'Delphi' && o.solrType != 'OBD' && o.solrType != 'VipQuestion' && o.solrType != 'FileShare' && o.solrType != 'Posts' && o.solrType != 'Product' && o.solrType != 'Pump' && o.solrType != 'Rail' && o.solrType != 'Dzpyq'
                && o.solrType != 'TestData' && o.solrType != 'ImageText' && o.solrType != 'DataShare'"
                     class="iconFaltCode" style="margin: 10px;padding: 10px 0 10px 40px;" @click="getFaultCodeDetail(o)">
                  <div class="con">
                    <a>
                      <p class="tit" v-html="(o.the_system || '') + '-' + (o.pcode || '') + '-' + (o.scode || '')"></p>
                      <p class="desc" v-html="o.desc"></p>
                    </a>
                  </div>
                </div>

                <Collection v-if="o.moduleType" :collectParams="{
            moduleType: o.moduleType,
            objId: o.sn,
            queryValue: o.id,
            favId: o.favId
          }" class="yuncang" ></Collection>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <Pagination-component :resource_url="resource_url" :reload="reload" :params="params"
                          @update="updateResource"></Pagination-component>

    <Close-page-component v-if="showDetail" :result="result" class-name="selectwindow2"
                          :keyword="keyword"
                          :moduleType="moduleType" :hlFlField="hlFlField"
                          :question="question"></Close-page-component>
  </div>
</template>
<script type="text/babel">
  import PaginationComponent from '../../../components/common/paginationComponent.vue';
  import LabelComponent from '../../../components/common/labelComponent.vue';
  import ClosePageComponent from '../../../components/common/closePageComponent.vue';
  import partsTableConfig from './parts.table.config.json';
  import Collection from '../../../components/common/collection.vue'

  export default{
    data(){
      return {
        keyword: '',
        id: '',
        solrType: '',
        reload: '',
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im,
        result: {},
        showDetail: false,
        resource_url: this._Api.POST_FALT_CODE_SOSO,
        params: {
          queryValue: this.$route.query.keyword,
          facet: '',
          pageModel: {
            currentPage: 1,
            pageSize: 10
          }
        },
        brandHeight: {
          height: '300px',
          overflow: 'scroll'
        },
        resultList: {
          guideList: [],
          bolist: []
        },
        testUl: '',
        userResults: {},
        hlFlField: '',
        moduleType: 0,
        question: '?type='
      }
    },
    mounted() {
      let that = this;
      that.keyword = that.$route.query.keyword;
      that._Util.post(that._Api.POST_USER_STATUS, {}, (data) => {
        that.userResults = data;
      }, () => {

      }, that, false);
      that.$on('closeDetail', () => {
        that.result = {};
        that.showDetail = false;
        that.hlFlField = '';
      });
    },
    methods: {
      search(flag) {
        let that = this;
        if (!that.keyword) {
          that._Util.showMsgBox('请填写查询关键词');
          return;
        }
        if (that.patrn.test(that.keyword)) {
          that._Util.showMsgBoxThen('输入内容含有特殊字符', () => {
            that.keyword = '';
          });
          return;
        }

        that.params.queryValue = that.keyword;
        let query = that._Util.copyObject(that.$route.query);
        if (flag) {
          query.currentPageNum = 1;
          query.random = Math.floor(Math.random()*10000+1);
        }
        query.keyword = that.keyword;
        that.$router.replace({query: query});

//        that.reload = (Date.parse(new Date())).toString();

      },

      updateResource(data) {
        let that = this;
        that.resultList = data;
        that.$refs.scrollwrapper.scrollTop = 0;
        //document.getElementById('scrollwrapper').scrollTop = 0;
      },
      handleScroll: function (e) {
        let currentScrollPosition = e.srcElement.scrollTop;
//        console.log(currentScrollPosition)
        this.scrollPosition = currentScrollPosition;
      },

      toDetail(o) {
        let that = this;
        that._Util.post(that._Api.POST_PARTS_OHK_INFO, {id: o.id, solrType: o.solrType}, function (data) {
          //that.result = data;

          that.result = {
            source: [data],
            attrItems: partsTableConfig
          };
//          that.showDetail = true;
          that.moduleType = data.moduleType;
          that.question = '?type=' + (data.moduleType == 4 ? (2 + '&text2=' + data.pyq) : 1) ;
          that.showDetail = true;
        }, function () {

        }, that);
      },

      getFaultCodeDetail(o){
        let that = this;
        that.hlFlField = o.hlFlField;
        that._Util.post(that._Api.POST_FALT_CODE_DETAIL, {id: o.id}, function (data) {
          that.result = data;
          that.moduleType = that._Enums.COLLECTION_MODULE.FAULT;
          that.question = that.question += '1';
          that.question = '?type=1';
          that.showDetail = true;
        }, function () {

        }, that);
      },

      viewFiles(fileId) {
        window.location.href = this._Api.HOSTOLD + "/wxauth/searchDataTree/fileView.htm?fileId=" + fileId;
      },

      article(fileSn) {
        window.location.href = this._Api.HOSTOLD + "/wxauth/commonRailForumDetail.htm?postId=" + fileSn;
      },
      toFaultCode(){
        this.$router.push({name: 'faultList', query: { keyword: this.keyword}});
      },
      testData(id, type) {
        let queryValue = '';
        if (type == "1") {
          queryValue = id.replace("testdata_", "")
        }
        else {
          queryValue = id.replace("testdata_pump_", "")
        }
        window.location.href = this._Api.HOSTOLD + "/wxauth/queryTestData.htm?queryValue=" + queryValue;
      },

      alertStatus() {
        this._Util.showMsgBox("对不起，只有付费会员才能获取该资料！请您先完成付费！")
      },

      questionList(o) {
        window.location.href = this._Api.HOSTOLD + '/wxauth/sosoVipQuestionDetail.htm?questionId=' + o.sn + '&id=' + o.id;
      },

      getUrl(url) {
        window.location.href = url;
      }
    },

//    watch: {
//      '$route' (to, from) {
//        this.search();
//      }
//    },

    beforeRouteUpdate(to, from, next) {
      next();
      this.reload = (Date.parse(new Date())).toString();
    },

    components: {
      PaginationComponent,
      LabelComponent,
      ClosePageComponent,
      Collection
    }
  }
</script>
