<template>
  <div>
    <div v-if="!showDetail">
      <div v-show="engine && engineNo && step == 3" class="col colto">
        <ul class="list1 clearfix">
          <li style="padding-left: 0px;">
            <p @click="step = 1" class="select select2" towindow="2"> {{engine || '发动机厂商'}} </p>
          </li>
          <li style="padding-left: 0px;">
            <p @click="step = 2" class="select select3" towindow="3"> {{engineNo || '发动机型号'}} </p>
          </li>
        </ul>
      </div>
      <!--<div style="height: 80px;"></div>-->

      <div v-if="step == 1" style="margin-top: 10px">
        <div class=" col col1 mt25">
          <ul class="window_search">
            <li><input type="text" v-model.trim="keyword" @keyup="matchingLogo()" placeholder="请输入发动机厂商"/>
              <a href="javascript: void(0);" @click="search()" class=" btn btn_redlight">搜索 </a>
            </li>
          </ul>
        </div>
        <div ref="logoUl" class=" col col3 mt25" style="position: absolute;left: 0;bottom: 5px;width: 100%"
             :style="{top : heghtClass.heightIcon , overflow : heghtClass.overflow}">
          <ul class="blockswrap clearfix" selectidx="2"> <!--selectidx="1"对应下拉框的索引-->
            <li v-for="o in engineList">
              <a @click="getEngineNos(o.engineCompany)" href="javascript: void(0);">
                <div>
                  <img :src="o.engineImgUrl">
                </div>
                <p :style="{ color: (o.engineCompany.indexOf(keyword) != -1 && keyword) ? 'red' : '' }">
                  {{o.engineCompany}}
                </p>
              </a>
            </li>
          </ul>
          <div class="col tips yuandian">
            <p> 请选择发动机厂家和型号，小轨将为您列出详细的发动机配套信息。</p>
            <p class=" mt5"> 可以点击相应部件的部件号查询详细的部件信息。</p>
            <p class=" mt5"> 点击屏幕上方的“部件信息”可按照部件型号来查询。</p>
          </div>

          <Poking-me-component></Poking-me-component>
          <Footer-component></Footer-component>
        </div>
      </div>

      <div v-if="step == 2">
        <div class=" col mt25">
          <ul class="blockswrap clearfix engineModel" selectidx="3"> <!--selectidx="1"对应下拉框的索引-->
            <li v-for="o in engineNos">
              <p @click="getDetail(o)">{{o}}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="step == 3" class="result" name="maodian"
           style="padding-top: 0px;">
        <p v-if="!detailList.length" class="blue mt10">小轨没有查到数据！</p>

        <p v-if="detailList.length" class=" blue mt10">查询结果<span class=" f12"> （点击各项查看详细） </span></p>
        <hr/>

        <table class="bg_img">
          <tr v-for="o in detailList" towindow="4">
            <td width="40%">
              <a>{{o.productName}}</a>
            </td>
            <td @click="getNoDetail(o)" width="60%">
              <a :class="{aClass: o.productType && o.productType <= 4}">{{o.refNo}}</a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <Close-page-component v-if="showDetail" :result="result" class-name="selectwindow2"
                          ></Close-page-component>

    <code-dialog-component :show="dialogShow"></code-dialog-component>
  </div>
</template>
<script type="text/babel">
  import ClosePageComponent from '../../../components/common/closePageComponent.vue'
  import partsTableConfig from './parts.table.config.json';
  import PokingMeComponent from '../../../components/common/pokingMeComponent.vue'
  import FooterComponent from '../../../components/common/footerComponent.vue'
  import CodeDialogComponent from '../../../components/common/codeDialogComponent.vue'

  export default{
    props: {
      matingEngine: {
        type: String,
        require: false,
        default() {
          return ''
        }
      }
    },
    data(){
      return {
        keyword: '',
        engine: '',
        engineNo: '',
        engineList: [],
        engineNos: [],
        detailList: [],
        step: 0,
        styleObject: {
          color: 'red'
        },
        showDetail: false,
        result: {},
        heghtClass: {
          heightIcon: '300px',
          overflow: 'scroll'
        },
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im,
        dialogShow: false
      }
    },
    mounted() {
      let that = this;
      that.heghtClass = {
        heightIcon: '152px',
        overflow: 'scroll'

      };
      that.$on('closeDetail', () => {
        that.showDetail = false;
        that.result = {};
      });

      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });
      that.$on('verifyCodeCorrect', () => {
        that.dialogShow = false;
        that._getDetail(that);
      });

      /*that.engineList = that._Util.getLocalStorage('GG_engineList');
       that.step = 1;
       return;*/

      that._Util.post(that._Api.POST_PARTS_INFO_ENGINE, {}, (data) => {
        that.step = 1;
        //that._Util.setLocalStorage('GG_engineList', data);
        that.engineList = data;
      }, () => {

      }, that);
    },
    methods: {
      search() {
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
      },

      getEngineNos(engine) {
        let that = this;
        /*that.engine = engine;
         that.engineNos = that._Util.getLocalStorage('GG_engineNos');
         that.step = 2;
         return;*/
        that.engine = engine;
        that.$parent.$emit('checkEngine', engine);
        that._Util.post(that._Api.POST_PARTS_INFO_ENGINENO, {engineCompany: engine}, function (data) {
          that.step = 2;
          //that._Util.setLocalStorage('GG_engineNos', data);
          that.engineNos = data;
        }, function () {

        }, that);
      },

      getDetail(o) {
        let that = this;
        that.engineNo = o;

        that._Util.getUserLog((data) => {
          that._getDetail(that);
        }, () => {
          that.dialogShow = true;
        }, that);
      },

      _getDetail(self) {
        let that = self;
        that._Util.post(that._Api.POST_PARTS_INFO_ENGINE_RESULT, {
          engineCompany: that.engine,
          engineNo: that.engineNo
        }, (data) => {
          if (!data || data.length == 0) {
            that._Util.showMsgBox('小轨没有查到数据！');
            return;
          }

          that.detailList = data;
          that.step = 3;
        }, () => {

        }, that);
      },

      getNoDetail(o) {
        this._Util.log(o);
        if (!o.productType || parseInt(o.productType) > 4) {
          return;
        }

        let that = this;
        that._Util.post(this._Api.POST_PARTS_INFO_GET, {refNo: o.refNo}, function (data) {

          if (!data || data.length == 0) {
            that._Util.showMsgBox('小轨没有查到数据!');
            return;
          }

          that.result = {
            source: data,
            attrItems: partsTableConfig
          };
          that.showDetail = true;
        }, function () {

        }, that);
      },
      matchingLogo () {
        let that = this;

        if (!that.keyword) {
          return;
        }

        if (that.engineList.length > 0) {
          for (let i = 0; i < that.engineList.length; i++) {
            if (that.engineList[i].engineCompany.indexOf(that.keyword) != -1) {
              that.$refs.logoUl.scrollTop = parseInt(i / 4) * 105;
              break;
            }
          }
        }
      }

    },
    components: {
      ClosePageComponent,
      PokingMeComponent,
      FooterComponent,
      CodeDialogComponent
    }
  }
</script>
