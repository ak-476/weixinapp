<template>
  <div>
    <div class="labelAll" v-if="showFlag" style="background: white">
      <!--<div class="labelList" v-if="labelList.length > 0" @click="checkLabelAll()" :class="{active: checkIndex == -1}">
        全部资料
      </div>-->
      <div v-for="(o, index) in labelList" v-if="index < 4 && firstRow" @click="checkedLabel(o, index, 1)"
           :class="{active: $route.query.labelId == o.id}"
           class="labelList group1">

        {{o.treeName}}
      </div>
      <div v-for="(o, index) in labelList" v-if="index >= 4 && secondRow" @click="checkedLabel(o, index, 2)"
           :class="{active: $route.query.labelId == o.id}"
           class="labelList group2">
        {{o.treeName}}
      </div>
    </div>

    <div class="scrollfixed">
      <div class="zltypelist findlist findlistheight" @scroll="handleScroll" id="scrollwrapper"
           :style='{ height : brandHeight.height , overflow : brandHeight.overflow}'>
        <ul v-for="o in resultList.bolist"
            @click="viewFiles(o.id)" class="brand">
          <li class="li1">
            <a href="javascript: void(0);">
              <!--let arrA = ['JPG', 'PNG', 'BMP', 'GIF'];
              let arrB = ['PDF'];
              let arrC = ['MP4', 'AVI', 'MPG', 'WMV', 'ASF'];-->
              <img
                v-if="o.fileType.indexOf('JPG') != -1 || o.fileType.indexOf('PNG') != -1 || o.fileType.indexOf('BMP') != -1 || o.fileType.indexOf('GIF') != -1"
                src="../../assets/images/dianluziliao/zlphoto.png">
              <img v-if="o.fileType.indexOf('PDF') != -1"
                   src="../../assets/images/dianluziliao/zlpdf.png">
              <img
                v-if="o.fileType.indexOf('MP4') != -1 || o.fileType.indexOf('AVI') != -1 || o.fileType.indexOf('MPG') != -1 || o.fileType.indexOf('WMV') != -1 || o.fileType.indexOf('ASF') != -1"
                src="../../assets/images/dianluziliao/zlvidio.png">
            </a>
          </li>
          <li class="li2">
            <a href="javascript: void(0);">
              <span v-html="o.fileName"></span>
            </a>
            <p>
              <img src="../../assets/images/dianluziliao/zlhuo.png">
              推荐热度:<span>{{o.fileDownload}}</span>
            </p>
            <p>
              文件大小: <span v-text="calculateFileSize(o.fileLength)"></span>
            </p>

          </li>
          <Collection :collectParams="{
            moduleType: 2,
            objId: o.sn,
            queryValue: o.id,
            favId: o.favId
          }" :class="clineName" ></Collection>
        </ul>
      </div>
    </div>


    <Pagination-component v-if="showPage" :resource_url="resource_url" :reload="reload" :params="params"
                          @update="updateResource"></Pagination-component>

  </div>
</template>
<script type="text/babel">
  import PaginationComponent from '../../components/common/paginationComponent.vue';
  import Collection from '../../components/common/collection.vue'
  export default{
    data(){
      return {
        reload: '',
        resultList: [],
        resource_url: this._Api.POST_DATAUM_LIST,
        params: {
          queryValue: '',
          pageModel: {
            currentPage: 1,
            pageSize: 10
          }
        },
        parentId: '',
        logoId: '',
        labelList: [],
        labelId: '',
        showPage: false,
        checkIndex: '-1',
        brandHeight: {
          height: '300px',
          overflow: 'scroll'
        },
        tableLength: 0,
        showFlag: true,
        scrollTops: 0,
        scrollPosition: 0,
        rowIndex: 1,
        firstRow: true,
        secondRow: true,
        clineName: "yuncang yuncangziliao"
      }
    },
    beforeMount() {
      //let engineParams = this._Util.getLocalStorage('engineParams');
      this.parentId = this.$route.query.parentId;
      this.logoId = this.$route.query.logoId;
      if (parseInt(this.parentId) != -1) {
        this.params.df = 'parentId';
      }
    },
    mounted() {
      let that = this;
      //根据logoId查询分类

      that._Util.post(that._Api.POST_DATAUM_LOGO, {parentId: that.logoId}, function (data) {
        that.labelList = data;
        if (that.$route.query && that.$route.query.labelId) {
          that.labelId = that.$route.query.labelId;
          that.params.queryValue = that.labelId;
        } else {
          let query = that._Util.copyObject(that.$route.query);
          query.labelId = data[0].id;
          that.$router.replace({query: query});
          that.params.queryValue = data[0].id;
        }

        that.showPage = true;
        that.getScrollHeight();
      }, function () {

      }, that);

      that.$on('colectCheck', (data) => {
        console.log(data)
      })

    },
    methods: {
      search(flag) {
        if (flag) this.params.queryValue = '';
        this.params.queryValue = this.labelId;
        this.reload = (Date.parse(new Date())).toString();
      },
      updateResource(data) {
        this.resultList = data;

        document.getElementById('scrollwrapper').scrollTop = 0;
      },
      getScrollHeight(){
        let that = this;
        that.tableLength = that.labelList.length;
        that.tableLength = that.labelList.length;
        if (that.firstRow == false || that.secondRow == false) {
          that.brandHeight = {
            height: (document.documentElement.clientHeight - 75 - 40 - 55) + 'px',
            overflow: 'scroll'
          }
          return;
        }
        that.brandHeight = {
          height: (document.documentElement.clientHeight - 75 - (Math.ceil(that.tableLength / 4) * 40) - 55) + 'px',
          overflow: 'scroll'
        }
      },
      checkedLabel(o, index, rowIndex) {
        let that = this;
        that.labelId = o.id;
        that.checkIndex = index;
        that.rowIndex = rowIndex;

        let query = that._Util.copyObject(that.$route.query);
        query.labelId = o.id;
        query.currentPageNum = 1;
        that.$router.replace({query: query});

        //that.search();
      },
      checkLabelAll(){
        let that = this;
        that.labelId = '';
        let query = that._Util.copyObject(that.$route.query);
        query.labelId = o.id;
        query.currentPageNum = 1;
        that.$router.replace({query: query});
        //this.search();
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
        let that = this;

        that._Util.getUserStatus(that, () => {
            window.location.href = that._Api.HOSTOLD + "wxauth/searchDataTree/fileView.htm?fileId=" + fileId;
          }, () => {
          }, {
            name: that.$route.name,
            fullPath: that.$route.fullPath
          },
          that._Enums.ENUMS_USER_STATUS.VIP
        );
      },
      handleScroll: function (e) {
        let that = this;
        let currentScrollPosition = e.srcElement.scrollTop;

        if (currentScrollPosition > that.scrollPosition) {
          if (that.rowIndex == 1) {
            that.firstRow = true;
            that.secondRow = false;
          } else if (that.rowIndex == 2) {
            that.firstRow = false;
            that.secondRow = true;
          }
          that.getScrollHeight();
        } else {
          that.firstRow = true;
          that.secondRow = true;
          that.getScrollHeight();
        }
        that.scrollPosition = currentScrollPosition;

      }
    },
    watch: {
      '$route' (to, from) {
        this.labelId = this.$route.query.labelId;
        this.search();
      }
    },

    components: {
      PaginationComponent,
      Collection
    }
  }
</script>
