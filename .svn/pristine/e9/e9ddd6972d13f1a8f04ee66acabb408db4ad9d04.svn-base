<template>
  <div>
    <div class=" col col1 mt25">
      <ul class="window_search">
        <li><input type="text" v-model="keyword" :maxlength="20"  :placeholder="placeholder"/>
          <a href="javascript: void(0);" @click="matchingLogo(true)" class=" btn btn_redlight">{{btnValue}}</a>
        </li>
      </ul>
    </div>
    <div class=" col col3 mt25">
      <ul  ref="logoUl" :style="{height : heghtClass.heightIcon , overflow : heghtClass.overflow}" class="blockswrap clearfix" selectidx="2"> <!--selectidx="1"对应下拉框的索引-->
        <li v-for="o in resultList">
          <a @click="checkLogo(o, $event)" href="javascript: void(0);">
            <div>
              <img :src="o.fileUrl">
            </div>
            <p :style="{ color: (o.treeName.indexOf(keyword) != -1 && keyword) ? 'red' : '' }">
              {{o.treeName}}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  export default{
    props: {
      title: {
        type: String,
        require: false,
        default() {
          return '';
        }
      },
      btnValue: {
        type: String,
        require: false,
        default() {
          return '搜索';
        }
      },
      params: {
        type: Object,
        default() {
          return {};
        }
      },
      logoUrl: {
        type: String,
        default() {
          return '';
        }
      },

    },
    data(){
      return {
        keyword: '',
        resultList: [],
        placeholder: '请输入想要查询的系统厂家',
        heghtClass:{
          heightIcon:'300px',
          overflow : 'scroll'
        }
      }
    },
    mounted() {
      /*
        parentId: 整车2 发动机3 系统4
       */

//      console.log(this.heightClass.heightIcon)
//      console.log(screen.height)
//      this.heightClass.heightIcon = (screen.height - 180) + 'px'
      this.heghtClass = {
        heightIcon : document.documentElement.clientHeight - 155 +'px',
        overflow : 'scroll'

      };
      this.search();
    },
    methods: {
      checkLogo(o) {
        this.$parent.$emit('checkLogo', o);
      },
      search(params) {
        let that = this;
        that._Util.post(that._Api.POST_DATAUM_LOGO, (params || that.params), (data) => {
          that.resultList = data;
        }, () => {

        }, that);
      },
      matchingLogo(formSearch) {
        let that = this;

        if (!that.keyword) {
          return;
        }

        let flag = false;
        if (that.resultList.length > 0) {
          for (let i = 0; i < that.resultList.length; i++) {
            if (that.resultList[i].treeName.indexOf(that.keyword) != -1) {
              that.$refs.logoUl.scrollTop = parseInt(i / 4) * 105;
              flag = true;
              break;
            }
          }
        }
        if (!flag && formSearch) {
          that._Util.showMsgBoxConfirm('未查找到您要查询的厂商，是否进入到在线问答?', action => {
            if (action) {
              window.location.href =  that._Api.HOSTOLD + '/wxauth/onlineQA.htm?status=5';
            }
          });
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.search({parentId: to.query.checkIndex});

        switch (to.query.checkIndex) {
          case 2: this.placeholder = '请输入想要查询的系统厂家'; break;
          case 3: this.placeholder = '请输入想要查询的系统厂家'; break;
          case 4: this.placeholder = '请输入想要查询的系统厂家'; break;
        }

      },

      keyword () {
        this.matchingLogo(false);
      }
    },
    components: {}
  }
</script>
