<template>
  <div>
    <div v-show="!showDetail">
      <div v-if="scrollFlag" class="faultCodeSeach">
        <div class="sosoformSearch">
          <div class="submit">
            <input type="button" @click="search(true)" class="inputSubmit" value="搜搜">
          </div>
          <div class="input">
            <input type="text" v-model.trim="keyword" class="inputText" placeholder="请输入搜索关键字"/>
          </div>
        </div>
        <Label-component :label-items="tempFacetList" :first-row="firstRow" :second-row="secondRow"></Label-component>
      </div>


      <div id="scrollwrapper" @scroll="handleScroll" style="position: absolute;bottom: 52px;"
           :style="{top :  topMargin}">
        <div class="faultCodeLTable">
          <div id="resultHeight">
            <div class="list2 sosoList" style="padding: 0 0">
              <ul ref="testUl">
                <li @click="toDetail(o, $event, index)" v-for="(o, index) in resultList.bolist" style="padding: 0;">
                  <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin: 10px;width: 90%;">
                    <p class="tt ellipsis" v-html="o.hlFl"></p>
                    <p> 车型：{{o.the_system}}</p>
                    <p class=" gray_666"> 系统：{{o.applicable_car}}</p>
                  </span>

                  <Collection :collectParams="{
                    moduleType: _Enums.COLLECTION_MODULE.FAULT,
                    objId: o.sn,
                    queryValue: o.id,
                    favId: o.favId,
                    requestValue: o.hlFlField
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

    <Close-page-component v-if="showDetail" :result="result"
                          :hlFlField="hlFlField"
                          :moduleType="_Enums.COLLECTION_MODULE.FAULT"
                          question="?type=1"></Close-page-component>

    <code-dialog-component :show="dialogShow"></code-dialog-component>
  </div>
</template>
<script type="text/babel">
  import PaginationComponent from '../../../components/common/paginationComponent.vue';
  import LabelComponent from '../../../components/common/labelComponent.vue';
  import ClosePageComponent from '../../../components/common/closePageComponent.vue'
  import CodeDialogComponent from '../../../components/common/codeDialogComponent.vue'
  import partsTableConfig from './parts.table.config.json';
  import PokingMeComponent from '../../../components/common/pokingMeComponent.vue'
  import DetailFault from '../../../components/moduleDetail/fault.vue'
  import Collection from '../../../components/common/collection.vue'

  export default{
    data(){
      return {
        keyword: '',
        id: '',
        reload: '',
        result: {},
        showDetail: false,
        resource_url: this._Api.POST_FALT_CODE_LIST,
        params: {
          queryValue: this.$route.query.keyword,
          facet: '',
          pageModel: {
            currentPage: 1,
            pageSize: 10
          }
        },
        resultList: {
          bolist: [],
          pageModel: {},
          facetList: []
        },
        testUl: '',
        tableLength: 0,
        showFacetList: 0,
        topMargin: '0px',
        rowIndex: 1,
        firstRow: true,
        secondRow: true,
        scrollPosition: 0,
        tempFacetList: [],
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im,
        scrollFlag: true,
        dialogShow: false,
        detailId: '',
        hlFlField: '',
        clickItem: {}

      }
    },
    mounted() {
      let that = this;
      that.keyword = that.$route.query.keyword;

      that.$on('checkMenu', (data) => {
        if (!data.o) {
          that.showFeactList = 0;
        }
        that.params.facet = data.o;
        if (data.index == 1) {
          that.rowIndex == 1;
        } else if (data.index == 2) {
          that.rowIndex = 2;
        }
        let query = that._Util.copyObject(that.$route.query);
        query.currentPageNum = 1;
        query.facet = data.o;
        that.$router.replace({query: query});
        //that.search();
      });
      that.$on('MenuAll', (data) => {
        that.params.facet = '';
        let query = that._Util.copyObject(that.$route.query);
        query.currentPageNum = 1;
        query.facet = '';
        that.$router.replace({query: query});
        //that.search();
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

      that.$on('collectResult', (data) => {
        that.clickItem.favId = data.favId;
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
        let query = that._Util.copyObject(that.$route.query);
        if (flag) {
          that.params.facet = '';
          that.showFacetList = 0;
          query.keyword = that.keyword;
          query.facet = '';
          query.currentPageNum = 1;
          query.random = Math.floor(Math.random()*10000+1);
        } else {
          query.facet = that.params.facet;
        }
        that.params.queryValue = that.keyword;
        that.$router.replace({query: query});

      },

      updateResource(data) {
        let that = this;

        if (!data.bolist || data.bolist.length == 0) {
          that.tempFacetList = [];
          //that.topMargin = '80px';
        }

        if (!that.showFacetList && data.facetList && data.facetList.length) {
          that.tempFacetList = data.facetList;
          that.showFacetList++;
        }

        that.resultList.bolist = data.bolist;
        that.tableLength = that.tempFacetList.length + 1;

        if (!data.bolist || data.bolist.length == 0) {
          that.topMargin = '70px';
        } else {
          if (that.tableLength > 4) {
            that.topMargin = '152px'
          } else {
            that.topMargin = '112px'
          }
        }
        document.getElementById('scrollwrapper').scrollTop = 0;
      },
      handleScroll: function (e) {
        let that = this;
        let currentScrollPosition = e.srcElement.scrollTop;

        //that.calculateDivTop(currentScrollPosition > that.scrollPosition)
        that.scrollPosition = currentScrollPosition;

      },

      toDetail(o, self, index) {
        let that = this;
        self.srcElement.parentElement.scrollTop = index * 100;

        that._Util.getUserLog((data) => {
          that.detailId = o.id;
          that.hlFlField = o.hlFlField;
          that.getDetail(o, that);
        }, () => {
          that.dialogShow = true;
        }, that);
      },

      getDetail(item, self) {
        let that = self;
        that._Util.post(that._Api.POST_FALT_CODE_DETAIL, {id: item.id}, function (data) {
          that.result = data;
          that.clickItem = item;
          that.showDetail = true;
        }, function () {

        }, that);
      }

//      calculateDivTop(isDown) {
//        if (isDown) {
//          this.scrollFlag = false;
//          this.topMargin = '0px';
//        } else {
//          this.scrollFlag = true;
//          if (this.tableLength > 4) {
//            this.topMargin = '152px';
//          } else {
//            this.topMargin = '112px';
//          }
//        }
//      }

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
      PokingMeComponent,
      CodeDialogComponent,
      DetailFault,
      Collection
    }
  }
</script>
<style>
  body {
    height: 100%;
    overflow: hidden;
  }
</style>
