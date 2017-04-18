<template>
  <div style="display:block;">

    <div v-if="!showDetail">
      <div class=" col">
        <div>
          <div class="col1">
            <ul class="search">
              <li style="border:1px solid #ccc;border-radius:5px;">
                <input type="text" v-model.trim="keyword" placeholder="请输入部件型号，如：0445025035"/>
              </li>
              <li class=" mt25">
                <a href="javascript: void(0);"
                   @click="search()"
                   class=" btn btn_redlight btn_large">
                  搜搜
                </a>
              </li>
              <li class="tips">
                <p>直接输入部件号查询详细的配件信息，如：</p>
                <p>喷油器：博世（0445120078），电装（0950006222），德尔福（EJBR03301D）</p>
                <p>油&nbsp;&nbsp;&nbsp;泵：0445020077</p>
                <p>油&nbsp;&nbsp;&nbsp;轨：0445212001</P>
                <p>阀组件：F00RJ01657</p>
                <p>油嘴刻印号： DLLA150P1622</p>
                <p>ECU：0281020075</p>
                <p>传感器：0281006067</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <code-dialog-component :show="dialogShow"></code-dialog-component>

    <Close-page-component v-if="showDetail" :result="result" class-name="selectwindow2"
                          :keyword="keyword" :moduleType="_Enums.COLLECTION_MODULE.PARTS"
                          :question="question"></Close-page-component>

    <Poking-me-component></Poking-me-component>
    <Footer-component></Footer-component>
  </div>
</template>
<script type="text/babel">
  import CodeDialogComponent from '../../../components/common/codeDialogComponent.vue'
  import ClosePageComponent from '../../../components/common/closePageComponent.vue'
  import partsTableConfig from './parts.table.config.json';
  import PokingMeComponent from '../../../components/common/pokingMeComponent.vue'
  import FooterComponent from '../../../components/common/footerComponent.vue'

  export default{
    data(){
      return {
        keyword: '',
        oldKeyword: '',
        showDetail: false,
        result: {},
        dialogShow: false,
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im,
        question: '?type=2'
      }
    },
    mounted() {
      let that = this;
      that.$on('closeDetail', () => {
        that.showDetail = false;
        that.result = {};
        that.keyword = that.oldKeyword || that.keyword;
      });

      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });

      that.$on('verifyCodeCorrect', () => {
        that.dialogShow = false;
        that._fetchData(that);
      });

      that.$on('keywordIsChange', (data) => {
        that.oldKeyword = that._Util.copyObject(that.keyword);
        that.keyword = data;
      });
    },
    methods: {
      search() {
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
        that._fetchData(that);
      },
      _fetchData(self) {
        let that = self;

        that._Util.getUserLog(() => {
          that._Util.post(that._Api.POST_PARTS_INFO_GET, {refNo: that.keyword}, (data) => {

            if (!data.length) {
              that._Util.showMsgBox('小轨没有查到关键信息');
              return;
            }

            that.result = {
              source: data,
              attrItems: partsTableConfig
            };
            that.question = '?type=2&text2=' + data[0].pyq;
            that.showDetail = true;
          }, () => {

          }, that);
        }, () => {
          that.dialogShow = true;
        }, that);
      }
    },
    components: {
      CodeDialogComponent,
      ClosePageComponent,
      PokingMeComponent,
      FooterComponent
    }
  }
</script>
