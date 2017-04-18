<template>
  <div class="form supplier">
    <p class="tit">提供商</p>
    <div class="select thinkmodel" style="width:auto">
      <select v-model="params.supplier">
        <option value="博世">博世</option>
        <option value="电装">电装</option>
        <option value="卡特皮勒">卡特CR200</option>
      </select>
    </div>
    <div v-if="params.supplier == '博世'" class="input thinkmodel">
      <input type="text" v-model.trim="params.injector"/>
    </div>
    <p class="tit">油量测试结果</p>
    <div class="list">
      <div class="clearfix">
        <div class="t">回油量</div>
        <div class="s  thinkmodel">
          <select v-model="params.hyl">
            <option value="正常">正常</option>
            <option value="偏大">偏大</option>
          </select>
        </div>
      </div>
      <div class="clearfix">
        <div class="t">全负荷点</div>
        <div class="s  thinkmodel">
          <select v-model="params.qfhd">
            <option value="正常">正常</option>
            <option value="偏大">偏大</option>
            <option value="偏小">偏小</option>
          </select>
        </div>
      </div>
      <div class="clearfix">
        <div class="t">排放点</div>
        <div class="s  thinkmodel">
          <select v-model="params.pfd">
            <option value="正常">正常</option>
            <option value="偏大">偏大</option>
            <option value="偏小">偏小</option>
          </select>
        </div>
      </div>
      <div class="clearfix">
        <div class="t">预喷点</div>
        <div class="s  thinkmodel">
          <select v-model="params.ypd">
            <option value="正常">正常</option>
            <option value="偏大">偏大</option>
            <option value="偏小">偏小</option>
          </select>
        </div>
      </div>
      <div class="clearfix">
        <div class="t">低怠速点</div>
        <div class="s  thinkmodel">
          <select v-model="params.ddsd">
            <option value="正常">正常</option>
            <option value="偏大">偏大</option>
            <option value="偏小">偏小</option>
          </select>
        </div>
      </div>
    </div>
    <div class="thinkmodel2">
      <input type="button" @click="search()" class="btnSubmit" value="查询"/>
    </div>
    <div class="result" v-if="searchFlag" id="anchor">
      <div class="con" v-if="resultMsg">{{resultMsg}}</div>
      <div class="con" v-if="result">
        <table class="table03">
          <tr>
            <th>可能失效原因：</th>
          </tr>
          <tr>
            <td>{{result.failReason}}</td>
          </tr>
          <tr>
            <th>最佳维修方案：</th>
          </tr>
          <tr>
            <td>{{result.repairPlan}}</td>
          </tr>
          <tr>
            <th>垫片调整方法：</th>
          </tr>
          <tr>
            <td>{{result.adjustPlan}}</td>
          </tr>
        </table>
      </div>

      <div v-if="result" style="width: 100%; text-align: center;">
        <Online-qa :class="clineName"
                   :question="'?type=2&text2=' + params.injector + '&text1=' + params.supplier"></Online-qa>
        <Collection :collectParams="{
            moduleType: 5,
            objId: result.id,
            favId: result.favId,
            requestValue: oldSearchParams
          }" :class="clineName"></Collection>
      </div>

    </div>
    <code-dialog-component :show="dialogShow"></code-dialog-component>
  </div>
</template>
<script type="text/babel">
  import CodeDialogComponent from '../../../components/common/codeDialogComponent.vue';
  import Collection from '../../../components/common/collection.vue';
  import OnlineQa from '../../../components/common/onlineQa.vue';

  export default{
    name: 'Gasket',
    props: {
      emitKeyword: {
        type: String,
        default() {
          return '';
        }
      }
    },
    data(){
      return {
        params: {
          supplier: '博世',
          injector: '0445',
          hyl: '正常',
          qfhd: '正常',
          pfd: '正常',
          ypd: '正常',
          ddsd: '正常',
        },
        searchFlag: false,
        resultMsg: '',
        result: {},
        clineName: "testShoucang",
        dialogShow: false
      }
    },
    mounted() {
      let that = this;
      if (that.emitKeyword && that.emitKeyword.length >= 3) {
        if (that.emitKeyword.substring(0, 4) == '0445') {
          that.params.injector = '0445';
        } else if (that.emitKeyword.substring(0, 3) == '095') {
          that.params.supplier = '电装';
        }
      }

      if (parseInt(that.$route.query.type || 0) == 1) {
        that.params = JSON.parse(that.$route.query.keyword);
        that.search();

        that.$router.replace({query: {}});
      }

      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });
      that.$on('verifyCodeCorrect', () => {
        that.dialogShow = false;
        that._search(that);
      });
    },

    methods: {
      search() {
        let that = this;

        that._Util.getUserLog((data) => {
          that._search(that);
        }, () => {
          that.dialogShow = true;
        }, that);
      },
      _search(self) {
        let that = self;
        if (that.params.supplier == '博世' && !that.params.injector) {
          that._Util.showMsgBox('请填写喷油嘴型号');
          return;
        }

        that.searchFlag = true;
        that.result = '';
        that.resultMsg = '正在查询中...';

        that._Util.post(that._Api.POST_SOSO_GASKET, that.params, function (data) {
          that._Util.getSlyYou(that, (key) => {
            window.location.href = '#anchor';
            if (!data) {
              that.resultMsg = '未查到任何数据';
            } else {
              that.result = data;
              that.oldSearchParams = JSON.stringify(that.params);
              that.resultMsg = '';
            }
          });
        }, function () {

        }, this);
      },
    },
    watch: {
      'params.supplier' (newVal) {
        if (newVal == '博世') {
          this.params.injector = '0445';
        } else {
          this.params.injector = '';
        }
      }
    },
    components: {
      CodeDialogComponent,
      Collection,
      OnlineQa
    }

  }
</script>
