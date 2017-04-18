<!-- 我的收藏 -->
<template>
  <div style="background: #EDEDED">
    <div id="scrollwrapper" class="collect" style="bottom: 0" v-if="resultList.length > 0">
      <div class="faultCodeLTable">
        <div id="resultHeight">
          <div class="list2 sosoList Collecter selfcollect" style="padding: 0 0;border-bottom: none">
            <ul ref="testUl">
              <li v-for="(v, index) in resultList">
                <p v-if="v.moduleType == 7">
                  {{v.type == 1 ? '故障诊断' : (v.type == 2 ? '部件维修' : '其他')}}
                </p>
                <p v-html="_Enums.COLLECTION_MODULE_TYPE[v.moduleType]"></p>

                <div v-if="_Enums.COLLECTION_MODULE.GASKET == v.moduleType || _Enums.COLLECTION_MODULE.TEST == v.moduleType">
                  <div v-if="_Enums.COLLECTION_MODULE.GASKET == v.moduleType" style="padding: 0px 0 0px 40px;" class="iconTestData"
                       @click.stop="testData(v, 1)">
                    <div class="con">
                      <p class="tit">
                        提供商：{{JSON.parse(v.requestValue).supplier}}
                      </p>
                      <p class="tit">
                        回油量：{{JSON.parse(v.requestValue).hyl}}
                      </p>
                      <p class="tit">
                        全负荷点：{{JSON.parse(v.requestValue).qfhd}}
                      </p>
                      <p class="tit">
                        排放点：{{JSON.parse(v.requestValue).pfd}}
                      </p>
                      <p class="tit">
                        预喷点：{{JSON.parse(v.requestValue).ypd}}
                      </p>
                      <p class="tit">
                        低怠速点：{{JSON.parse(v.requestValue).ddsd}}
                      </p>
                      <p class="desc" v-html="v.newsDescription"></p>
                    </div>
                  </div>

                  <div v-else-if="_Enums.COLLECTION_MODULE.TEST == v.moduleType" style="padding: 0px 0 0px 40px;" class="iconTestData"
                       @click.stop="testData(v, 0)">
                    <div class="con">
                      <a><span class="tit2 ">
                      <span v-if="v.objectData.type == '1'" v-html="'喷油器测试数据：' + v.objectData.pyq"></span>
                      <span v-html="'油泵测试数据：' + v.objectData.pump"></span></span></a>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div v-if="v.objectData && v.objectData.solrType == 'Posts'" class="iconArticle" style="padding: 0px 0 0px 40px;">
                    <div class="con">
                      <img v-if="v.objectData.postImg" :src="v.objectData.postImg" class="postImg"/>
                      <p class="tit"><a @click.stop="article(v.objectData.sn)" v-html="v.objectData.postTitle"></a></p>
                      <p class="desc" v-html="v.objectData.postSummary"></p>
                    </div>
                  </div>

                  <div v-else-if="v.objectData && v.objectData.solrType == 'ImageText'" class="iconArticle" style="padding: 0px 0 0px 40px;"
                       @click.stop="getUrl(v.objectData.newsUrl)">
                    <img :src="v.objectData.newsPicUrl" class="postImg"/>
                    <div class="con">
                      <p class="tit"><a v-html="v.objectData.newsTitle"></a></p>
                      <p class="desc" v-html="v.objectData.newsDescription"></p>
                    </div>
                  </div>

                  <div v-if="v.objectData && v.objectData.solrType == 'DataShare'" class="iconPicture" style="padding: 0px 0 0px 40px;"
                       @click.stop="viewFiles(v.objectData.id)">
                    <div class="con">
                    <span class="tit2 ">
                      <a v-if="userResults.userStatus == 2" v-html="v.objectData.fileName"></a>
                      <a v-else @click.stop="alertStatus()" v-html="v.objectData.fileName"></a>
                    </span><br>
                      <span class="desc" style="display: block">推荐热度：{{v.objectData.fileDownload}}</span>
                      <span class="desc" style="display: block">文件类型：{{v.objectData.fileType}} </span>
                      <span class="desc" style="display: block">文件大小：{{v.objectData.fileLengthKB}}</span>
                    </div>
                  </div>

                  <div v-else-if="v.objectData && v.objectData.solrType == 'VipQuestion'" class="iconQ" style="padding: 0px 0 0px 40px;"
                       @click.stop="questionList(v.objectData.sn)">
                    <div class="con">
                      <a>
                        <span class="tit" style="display: block">{{v.objectData.typeStr}}&nbsp;&nbsp;&nbsp;&nbsp;<em>{{v.objectData.createTimeStr}}</em></span>
                        <span class="desc" style="display: block" v-if="v.objectData.type == 3" v-html="v.objectData.text5"></span>
                        <span class="desc" style="display: block" v-html="v.objectData.text1+v.objectData.text2+v.objectData.text3"></span>

                      </a>
                    </div>
                  </div>

                  <div v-else-if="v.objectData && v.objectData.solrType == 'Product' || v.objectData && v.objectData.solrType == 'Rail' ||　v.objectData && v.objectData.solrType == 'Pump' ||　v.objectData && v.objectData.solrType == 'Dzpyq'"
                    class="iconProduct" style="padding: 0px 0 0px 40px;" @click.stop="toDetail(v);">
                    <div class="con">
                      <a href="javascript:void(0)">
                        <p class="tit2 ">
                          <span v-if="v.objectData && v.objectData.solrType == 'Rail'" v-html="'油轨型号:' + v.objectData.smodel"></span>
                          <span v-if="v.objectData && v.objectData.solrType == 'Pump'" v-html="'油泵型号:' + v.objectData.pmodel"></span>
                          <span v-html="'喷油器型号:' + v.objectData.pyq"></span></p>
                        <p class="desc" v-html="v.objectData.zjcn"></p>
                      </a>
                    </div>
                  </div>

                  <!--_v.objectData.the_system-->
                  <div v-else-if="v.objectData && v.objectData.solrType == 'OBD'" style="padding: 0px 0 0px 40px;" class="iconFaltCode"
                       @click.stop="getFaultCodeDetail(v.objectData)">
                    <div class="con">
                      <a href="javascript:void(0)">
                        <p v-html="(v.objectData.applicable || '') + '-' + v.objectData.code" class="tit"></p>
                        <p class="desc" v-html="v.objectData.desc"></p>
                      </a>
                    </div>
                  </div>

                  <div v-else-if="v.objectData && v.objectData.solrType != 'Delphi' && v.objectData && v.objectData.solrType != 'OBD' && v.objectData && v.objectData.solrType != 'VipQuestion' && v.objectData && v.objectData.solrType != 'FileShare' && v.objectData && v.objectData.solrType != 'Posts' && v.objectData && v.objectData.solrType != 'Product' && v.objectData && v.objectData.solrType != 'Pump' && v.objectData && v.objectData.solrType != 'Rail' && v.objectData && v.objectData.solrType != 'Dzpyq'
                && v.objectData && v.objectData.solrType != 'TestData' && v.objectData && v.objectData.solrType != 'ImageText' && v.objectData && v.objectData.solrType != 'DataShare'"
                       class="iconFaltCode" style="padding: 0px 0 0px 40px;" @click.stop="getFaultCodeDetail(v.objectData)">
                    <div class="con">
                      <a>
                        <p class="tit" v-html="(v.objectData.the_system || '') + '-' + (v.objectData.pcode || '') + '-' + (v.objectData.scode || '')"></p>
                        <p class="desc" v-html="v.objectData.desc"></p>
                      </a>
                    </div>
                  </div>
                </div>


                <Collection :collectParams="{
                    moduleType: v.moduleType,
                    objId: v.objectData && v.objectData.sn ? v.objectData.sn : '',
                    queryValue: v.objectData && v.objectData.id ? v.objectData.id : '',
                    favId: v.favId
                  }" class="yuncang"
                            :class="colectStyle" :isCancel="true"></Collection>

                <!--<Detail-parts v-else
                              :item="v.objectData.objectData || v" :favId="v.objectData.favId" :showCollect="true"
                              :isCancel="true"></Detail-parts>-->
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <Close-page-component v-if="showDetail" :result="result" class-name="selectwindow"
                          :moduleType="moduleType" :hlFlField="hlFlField"
                          :question="question"
    ></Close-page-component>
    <div class="nocllection"  v-if="showEmpty">
      <img src="../../../../assets/images/nocollection.png" alt="">
      <p>啥都没收藏您点进来是做啥子？</p>
    </div>
  </div>
</template>
<script type="text/babel">
  import PaginationComponent from '../../../../components/common/paginationComponent.vue'
  import DetailFault from '../../../../components/moduleDetail/fault.vue'
  import DetailParts from '../../../../components/moduleDetail/parts.vue'
  import ClosePageComponent from '../../../../components/common/closePageComponent.vue'
  import Collection from '../../../../components/common/collection.vue'
  import partsTableConfig from '../../../soso/partsInfo/parts.table.config.json';

  export default{
    data(){
      return {
        resultList: [],
        userResults: {},
        showDetail: false,
        colectStyle: 'styleYun',
        hlFlField: '',
        showEmpty: false,
        question: ''
      }
    },
    mounted(){
      let that = this;

      that._Util.post(that._Api.POST_USER_STATUS, {}, (data) => {
        that.userResults = data;
      }, () => {

      }, that, false);

      that.getList();

      that.$on('collectResult', (data) => {
        that.getList();
      });

      that.$on('closeDetail', () => {
        that.result = {};
        that.showDetail = false;
        that.hlFlField = '';
      });
    },
    methods: {
      getList() {
      	let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_COLLECT, {}, (data) => {
          that.resultList = data.bolist;
          that.showEmpty = !data.bolist.length;
        }, () => {

        }, that);
      },

      testData(item, type) {
      	this.$router.push({name: 'testDataQuery', query: {keyword: item.requestValue, type: type}});
      },

      toDetail(o) {
        let that = this;

        that._Util.post(that._Api.POST_PARTS_OHK_INFO, {id: o.objectData.id, solrType: o.objectData.solrType}, function (data) {
          //that.result = data;

          that.result = {
            source: [data],
            attrItems: partsTableConfig
          };
//          that.showDetail = true;
          that.moduleType = data.moduleType;
          that.question = "?type=2";
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
          that.question = "?type=1";
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

      alertStatus() {
        this._Util.showMsgBox("对不起，只有付费会员才能获取该资料！请您先完成付费！")
      },

      questionList(o) {
        window.location.href = this._Api.HOSTOLD + "/wxauth/sosoVipQuestionDetail.htm?questionId=" + o;
      },

      getUrl(url) {
        window.location.href = url;
      }
    },
    components: {
      DetailFault,
      DetailParts,
      ClosePageComponent,
      Collection
    }
  }
</script>

<style>
  .collect {
    top: 0px;
  }
</style>
