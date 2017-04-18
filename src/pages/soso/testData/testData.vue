<template>
  <div>
    <div class="col col1">
      <ul class="search">
        <li class="search_input">
          <input type="text" v-model.trim="keyword"
                 @blur="keywordBlur($event)"
                 placeholder="请输入喷油器、油泵型号，如0950006222"/>
        </li>
        <li class=" mt25">
          <a class=" btn btn_redlight btn_large">
            <input type="button"
                   @click="search()"
                   :disabled="!keyword"
                   class="inputSubmit" />
            搜搜
          </a>
        </li>
        <li v-show="!searchFlag" class="tips">
          <p class="yuanxinl">包含喷油器和油泵的测试数据。</p>
          <p class="yuanxinl">请正确输入型号，如0445120397、0445020078、0950006222、EJBR3301。</p>
          <p class="yuanxinl">测试数据持续更新中。</p>
        </li>
      </ul>
    </div>

    <div class="result" v-show="searchFlag">
      <p class="tit">查询结果</p>
      <div class="con" v-if="resultMsg">{{resultMsg}}</div>
      <div class="con" v-if="testResult">

        <div v-if="testResult.type == 1">
          <div class="row">
            <div class="col-xs-12">
              <table class="table02 table-bordered" align="center">
                <tr>
                  <th rowspan="2" style="width: 20%;">测试点</th>
                  <th rowspan="2" style="width: 15%;">轨压</th>
                  <th rowspan="2" style="width: 15%;">
                    加电
                    <br>时间</th>
                  <th colspan="3" style="width: 40%;">油量</th>
                </tr>
                <tr>
                  <th style="width: 13.3%;" align="center">
                    标准
                    <br>值</th>
                  <th style="width: 13.3%;" align="center">
                    建议
                    <br>上限</th>
                  <th style="width: 13.3%;" align="center">
                    建议
                    <br>下限</th>
                </tr>
                <tr v-for="o in testResult.text1">
                  <td>{{o.testNode}}</td>
                  <td>{{o.gy}}</td>
                  <td>{{o.jdsj}}</td>
                  <td>{{o.ybz}}</td>
                  <td>{{o.ysx}}</td>
                  <td>{{o.yxx}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="row">
            <div class="col-xs-12">
              <table class="table02 table-bordered" align="center">
                <tr>
                  <th style="width: 16%;" align="center">测试点</th>
                  <th style="width: 14%;" align="center">
                    转速
                    <br>[转/分]</th>
                  <th style="width: 15%;" align="center">ZME电流[A]</th>
                  <th style="width: 15%;" align="center">
                    轨压
                    <br>[bar]</th>
                  <th style="width: 15%;" align="center">
                    供油量
                    <br>[L/h]</th>
                  <th style="width: 15%;" align="center">
                    回油量
                    <br>[L/h]</th>
                </tr>
                <tr v-for="o in testResult.text1">
                  <td>{{o.testNode}}</td>
                  <td>{{o.zs}}</td>
                  <td>{{o.zmedl}}</td>
                  <td>{{o.gy_pump}}</td>
                  <td>{{o.gyl}}</td>
                  <td>{{o.hyl}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div style="width: 100%; text-align: center;">
          <Online-qa :class="clineName"
                     :question="'?type=2&text2=' + keyword"></Online-qa>
          <Collection :collectParams="{
            moduleType: 6,
            objId: testResult.sn,
            queryValue: testResult.id,
            favId: testResult.favId,
            requestValue: keyword
          }" :class="clineName"></Collection>
      </div>
    </div>
  </div>
  <code-dialog-component :show="dialogShow"></code-dialog-component>
</div>
</template>
<script src="../../../assets/js/des3/des3.js"></script>
<script type="text/babel">
  import CodeDialogComponent from '../../../components/common/codeDialogComponent.vue'
  import Collection from '../../../components/common/collection.vue'
  import OnlineQa from '../../../components/common/onlineQa.vue'

  export default{
    name: 'TestData',
    data(){
      return {
        keyword: '',
        checkIndex: 0,
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im,
        testResult: '',
        resultMsg: '',
        searchFlag: false,
        dialogShow: false,
        navMenus: [
          {
            title: '测试数据',
            url: '',
            className: '',
            active: true
          },
          {
            title: '垫片调整',
            url: '',
            className: '',
            active: false
          }
        ],
        clineName: "testShoucang",
        collectParams: {}
      }
    },

    mounted() {
      let that = this;
      if (parseInt(that.$route.query.type) == 0) {
        that.keyword = that.$route.query.keyword || '';
      	that.search();
        that.$router.replace({query: {}});
      }

      that.$on('checkMenu', (obj) => {
        that.checkIndex = obj;
      });

      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });

      that.$on('verifyCodeCorrect', () => {
        that.dialogShow = false;
        that._fetchData(that);
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

        if(that.patrn.test(that.keyword)){
          that._Util.showMsgBoxThen('输入内容含有特殊字符', () => {
            that.keyword = '';
          });
          return false;
        }
        that._Util.getUserLog((data) => {
          that._fetchData(that);
        }, () => {
          that.dialogShow = true;
        }, that);
      },

      keywordBlur(obj) {
        //this.keyword = obj.target.value;
        this.$parent.$emit('emitKeyword', this.keyword);
      },

      validInput() {
        this.keyword = this.keyword.replace(/[^\w\.\/]/ig, '');
      },

      _fetchData(self) {
        let that = self;
        that.searchFlag = true;
        that.testResult = '';
        that.resultMsg = '正在查询中...';
        that._Util.post(that._Api.POST_SOSO_TEST_DATA, {id: that.keyword}, function (data) {
          if (!data) {
            that.resultMsg = '未查到任何数据';
            return;
          } else {
            data.text1 = JSON.parse(data.text1);
            that.testResult = data;
            that.resultMsg = '';
          }

//          that._Util.getSlyYou(that, (key) => {
//            let keyStr = key.des3Key;
//            let jsonStr = that._DESUtil.DES3.decrypt(keyStr, data);
//            if (jsonStr == 'null') {
//              that.resultMsg = '未查到任何数据';
//            } else {
//              that.testResult = JSON.parse(jsonStr);
//              that.testResult.text1 = JSON.parse(that.testResult.text1);
//              that.resultMsg = '';
//            }
//          });
        }, function () {

        }, that);
      }
    },

    components: {
      CodeDialogComponent,
      Collection,
      OnlineQa
    },

    watch: {
      keyword(newVal, oldVal) {
        this.keyword = newVal.replace(/[^\w\/]/ig, '');
      }
    }

  }


</script>
