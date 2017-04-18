<template>
  <div  @scroll="handleScroll">
    <div class="cycSearch result" v-if="showSearch">
      <div>
        <input id="keyword" v-model="keyword" type="text" placeholder="请输入想要搜索的文章">
        <button @click="search(keyword,'',true)"></button>
      </div>
      <div class="resultMation" v-if="showArticl && !showTabList">
        <p>得到{{ resultList.totalCount || 0}}个搜索结果</p>
      </div>
      <div class="resultTabMation" v-if="!showArticl && !showTabList">
        <p>{{ resultTabMationTitle }}</p>
        <span>{{ resultList.totalCount || 0}} 篇文章</span>
      </div>
      <div class="clearHistory"  v-if="showTabList && searchHistory.length > 0">
        <span>历史记录</span>
        <button  @click="removeSearchHistory()">清空</button>
      </div>
      <div class="searchTabList"  v-if="showTabList">
        <div>
          <ul>
            <li v-for="o in searchHistory" @click="searchListValue(o)" v-if="searchHistory.length > 0">
              <p>
                <span>{{ o }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div style=" background: white;" :style="{ top : listTop}">
      <div class="resultTabList" v-for="v in resultList.list" @click="toArticle(v,v.url,v.pay,v.type)" v-if="!showTabList" :id="v.id ? v.id : v.postId">
        <div>
          <p v-if="!v.keyword || !v.pay" style="height: 5px"></p>
          <p class="Title" v-html="v.title"></p>
          <p class="Mation" v-if="showArticl" v-html="v.content"></p>
          <div class="keyAndrule" v-if="v.keyword || v.pay">
            <div class="key"  v-if="v.keyword">
              <span v-html="v.keyword"></span>
            </div>
            <div class="rule" v-if="v.pay">
              <img src="./../../assets/images/ruleIcon.png" alt="">
              <span>付费权限</span>
            </div>
          </div>
          <p v-if="!v.keyword || !v.pay" style="height: 5px"></p>
        </div>
      </div>

    </div>

    <Pagination-Component v-if="loadingShow && !showTabList" :resource_url="resource_url" :params1="params1" :params2="params2"
                          @update="updateResource" :checkId="secondId" :keyUpdata="keyUpdata"></Pagination-Component>
    <div class="noMation"  v-if="showTabList && searchHistory.length > 0" @click="closeHistory()"></div>



  </div>
</template>
<script>
  import PaginationComponent from '../../components/common/cyclopedia/paginationComponent.vue'
  export default{
    data(){
      return {
        secondId:parseInt(this.$route.query.checkId) || '',
        resultTabMationTitle: '',
        resource_url: this._Api.POST_ELECT_ARTICLE_LIST,
        loadingShow: false,
        keyword: this.$route.query.keyword || '',
        pageNum: 1,
        pageSize: parseInt(this.$route.query.pageSize) || 10,
        resultList:[],
        showArticl: false,
        keyUpdata: '',
        params2: {
          vlue:{
            catalogueId: parseInt(this.$route.query.checkId),
            pageNum: 1,
            pageSize: parseInt(this.$route.query.pageSize) || 10
          }
        },
        params1: {
          queryValue: this.$route.query.keyword ||  this.keyword || '',
          pageModel: {
            currentPage: 1,
            pageSize: parseInt(this.$route.query.pageSize) || 10
          }
        },
        showTabList: false,
        searchHistory: [],
        historyHeight:'0',
        showSearch: true,
        listTop: 0,
        scrollHiehgt: 0
      }
    },
    mounted(){
      let that = this;
//      that.getListTop();
      that.resultTabMationTitle = that._Util.getLocalStorage('secondTitle');
      that.searchHistory =  that._Util.getLocalStorage('searchTabListValue') || [];
      that.isSeach()
      if(that.$route.query.checkId == -1 || that.$route.query.keyword  || !that.$route.query.checkId){
        that.resource_url = that._Api.POST_ELECT_ARTICLE_SEARCHLIST;
        that.search(that.keyword,'noKeyword',false);

      } else {
        that.resource_url = that._Api.POST_ELECT_ARTICLE_LIST;
        that.getMoreResult()
      }
    },
    methods:{
      toArticle(v,url,payType,payStyle){
        let that = this;
        if(v.postId){
          that._Util.setLocalStorage('anchor', v.postId);
        } else if(v.id){
          that._Util.setLocalStorage('anchor', v.id);
        }
        that._Util.post(that._Api.POST_USER_STATUS, {}, (data) =>{

          if(data.userStatus == 0){
            that._Util.showMsgBoxConfirm('对不起，只有认证会员才能查看！您还未认证，请您先完成认证！', action => {
              if (action) {
                //开通会员
                window.location.href = '/v2/business/pay/openMember?fullPath=' + that.$route.fullPath
                  + '&userStatus=' + data.userStatus;
                //self.$router.replace({name: 'openMember', query: nextParams});
              }
            })
          }else {
            if(payType == false){
//          window.location.href = url;
              if(payStyle && payStyle=='Posts'){
                window.location.href = that._Api.HOSTOLD + 'wxauth/commonRailForumDetail.htm?postId='+ v.postId +'&_='+(new Date()).getTime()+'#wechat_redirect';
              }else if(payStyle && payStyle=='FineCourse'){
                window.location.href = that._Api.HOSTOLD + 'wxauth/trainingSourceDetail.htm?sourceId='+ v.postId +'&_='+(new Date()).getTime()+'#wechat_redirect';
              } else{
                window.location.href = url+'&_='+(new Date()).getTime()+'#wechat_redirect';
              }
            } else {
              that._Util.getUserStatus(that, () => {
                  console.log(that._Enums.ENUMS_USER_STATUS.VIP)
                  if(payStyle && payStyle=='Posts'){
                    window.location.href = that._Api.HOSTOLD + 'wxauth/commonRailForumDetail.htm?postId='+ v.postId +'&_='+(new Date()).getTime()+'#wechat_redirect';
                  }else if(payStyle && payStyle=='FineCourse'){
                    window.location.href = that._Api.HOSTOLD + 'wxauth/trainingSourceDetail.htm?sourceId='+ v.postId +'&_='+(new Date()).getTime()+'#wechat_redirect';
                  } else{
                    window.location.href = url+'&_='+(new Date()).getTime()+'#wechat_redirect';
                  }
                }, () => {

                }, {
                  name: that.$route.name,
                  fullPath: window.location.href
                },
                that._Enums.ENUMS_USER_STATUS.VIP
              );
            }
          }
        }, ()=>{}, that);
      },
      getMoreResult(){
        let that = this;
        that._Util.post(that._Api.POST_ELECT_ARTICLE_LIST, {
          catalogueId: that.secondId,
          pageNum: 1,
          pageSize: parseInt(that.$route.query.pageSize) || 10
        } , (data) =>{
          that.resultList = data;
//          返回三级菜单添加锚点
          if(that._Util.getLocalStorage('anchor')){
            setTimeout(function(){
              window.location.href = '#'+ that._Util.getLocalStorage('anchor');
              setTimeout(function(){
                that._Util.removeLocalStroageByKey('anchor');
              },500)
            },0)
          }
          that.isShowLoading()
        },() =>{}, that)
      },
      search(keyword,isKeyword,flag){
        let that = this;
        if(isKeyword != 'noKeyword'){
          if(!that.keyword){
            that._Util.showMsgBox('搜索内容不能为空');
            return;
          }
          if(keyword.length <2){
            that._Util.showMsgBox('请至少输入两个字符');
            return;
          }
        }
        if(that._Util.getLocalStorage('anchor')){
          that.params1.pageModel = {
            currentPage: 1,
            pageSize: parseInt(this.$route.query.pageSize) || 10
          }
          that._Util.post(that._Api.POST_ELECT_ARTICLE_SEARCHLIST,{
            queryValue: keyword || that.keyword,
            pageModel:{
              currentPage: 1,
              pageSize: parseInt(that.$route.query.pageSize) || that.pageSize,
            }
          }, (data) =>{
            that.params1.queryValue = keyword || that.keyword;
            that.resultList = data;
//          返回三级菜单添加锚点
            if(that._Util.getLocalStorage('anchor')){
              setTimeout(function(){
                window.location.href = '#'+ that._Util.getLocalStorage('anchor');
                setTimeout(function(){
                  that._Util.removeLocalStroageByKey('anchor');
                },500)
              },0)
            }

            if(flag){
              if (that.searchHistory.indexOf(that.keyword) == -1) {
                that.searchHistory.unshift(that.keyword);
                that._Util.setLocalStorage('searchTabListValue', that.searchHistory);
              }
            }
            that.showTabList = false;
            that.showArticl = true;
            that.isShowLoading();
            that.$router.replace({query: {keyword: keyword || that.keyword, checkId: '-1', pageSize: that.$route.query.pageSize || 10, type: that.$route.query.type}});
            that.secondId = parseInt(that.$route.query.checkId);
            that.keyUpdata = keyword || that.keyword;
            that.resource_url = that._Api.POST_ELECT_ARTICLE_SEARCHLIST;
//          that.getListTop()


          }, ()=>{

          }, that)
        } else {
          that.params1.pageModel = {
            currentPage: 1,
            pageSize: 10
          }
          that._Util.post(that._Api.POST_ELECT_ARTICLE_SEARCHLIST,{
            queryValue: keyword || that.keyword,
            pageModel:{
              currentPage: 1,
              pageSize: 10
            }
          }, (data) =>{
            that.params1.queryValue = keyword || that.keyword;
            that.resultList = data;
//          返回三级菜单添加锚点
            if(that._Util.getLocalStorage('anchor')){
              setTimeout(function(){
                window.location.href = '#'+ that._Util.getLocalStorage('anchor');
                setTimeout(function(){
                  that._Util.removeLocalStroageByKey('anchor');
                },500)
              },0)
            }

            if(flag){
              if (that.searchHistory.indexOf(that.keyword) == -1) {
                that.searchHistory.unshift(that.keyword);
                that._Util.setLocalStorage('searchTabListValue', that.searchHistory);
              }
            }
            that.showTabList = false;
            that.showArticl = true;
            that.isShowLoading();
            that.$router.replace({query: {keyword: keyword || that.keyword, checkId: '-1', pageSize: 10, type: that.$route.query.type}});
            that.secondId = parseInt(that.$route.query.checkId);
            that.keyUpdata = keyword || that.keyword;
            that.resource_url = that._Api.POST_ELECT_ARTICLE_SEARCHLIST;
//          that.getListTop()


          }, ()=>{

          }, that)
        }

      },
      isSeach(){
        let that = this;
        if(that.$route.query.checkId == -1){
          that.showArticl = true;
        } else {
          that.showArticl = false;
        }
      },
      isShowLoading(){
        let that = this;
        let listResult = that.resultList.totalCount || 0;
        if(listResult == 0){
          that.loadingShow = false;
          return;
        }
        if(that.resultList.list.length == listResult || listResult < 10){
          that.loadingShow = false;
        } else {
          that.loadingShow = true;
        }
      },
      updateResource(data){
        let that = this;
        that.resultList = data;
        that.isShowLoading();
        if(that.$route.query.checkId == -1 || ''){
          that.$router.replace({query: {keyword: that.$route.query.keyword  || that.keyword, checkId: '-1', pageSize: parseInt(that.$route.query.pageSize) + 10, type: that.$route.query.type}});
        } else {
          that.$router.replace({query: { checkId: that.$route.query.checkId, firstId: that.$route.query.firstId, pageSize: parseInt(that.$route.query.pageSize) + 10, type: that.$route.query.type}});
        }
      },
      searchListValue(o){
        this.showTabList = false;
        this.keyword = o;
        this.search(o,'noKeyword',false);
      },
      removeSearchHistory(){
        this._Util.removeLocalStroageByKey('searchTabListValue');
        this.searchHistory =  this._Util.getLocalStorage('searchTabListValue') || [];
        this.showTabList = false;
      },
      closeHistory(){
        this.showTabList = false;
      },
      handleScroll: function (e) {
        let that = this;
        let currentScrollPosition = e.srcElement.scrollTop;
        console.log(currentScrollPosition)
        if (currentScrollPosition > that.scrollPosition) {
          console.log(1)
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
    components: {
      PaginationComponent
    }
  }
</script>
