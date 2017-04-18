<template>
  <div :class="className" class="windowwrap selectwindow" style="display: inline; z-index: 9999 !important;"> <!--selectwindow2 对应下拉框的索引-->
    <div v-if="moduleType != _Enums.COLLECTION_MODULE.FAULT" class=" window">
      <div class=" windowtt">
        <span>{{result.attrItems[result.source[0].solrType][0].pageTitle}}</span>
        <a class="window_close" @click.stop="close()">
          <img src="../../assets/images/window_close.png"/>
        </a>
      </div>
      <div class="bg_img">
        <table v-for="(o, index) in result.source" class="windowtable" style="margin-top:0px">
          <tr v-for="(v, vIndex) in result.attrItems[o.solrType]"
              :class="{firstTr: !vIndex}">
            <td :style="{width: !index ? '40%' : ''}">
              <span class="f161">{{v.title}}:</span>
            </td>
            <td @click.stop="showOhk(o.solrType, v.name, o[v.name], o)"
                :style="{width: !vIndex ? '60%' : ''}">
              <span v-html="rewriteHtml(o.solrType, v.name, o[v.name], o)"
                    style="width: 100%"></span>
            </td>

            <Collection v-if="!vIndex && moduleType" :collectParams="{
                moduleType: moduleType,
                objId: o.sn,
                queryValue: o.id,
                favId: o.favId
              }" :class="clineName2"></Collection>

          </tr>
        </table>
      </div>
      <div style="height:60px;"></div>
      <div style="width: 100%; text-align: center;">
        <Online-qa :class="clineName2"
                   :question="question"></Online-qa>
      </div>
    </div>

    <div v-else class=" window">
      <div class=" windowtt">
        <span id="title">{{result.the_system}}</span>
        <a @click.stop="close()" class="window_close"> <img src="../../assets/images/window_close.png"/></a>
      </div>
      <div class="guzhang" id="faultCodeDetail">
        <div v-if="result.solrType == 'OBD'">
          <p v-if="result.code" class=" clearfix tt">
            <span class=" f16"> 故障码:&nbsp; </span>
            <span v-html="result.code"></span>
          </p>

          <p v-if="result.desc" class=" clearfix tt">
            <span class=" f16"> 故障描述: </span>
            <span class="mt5" v-html="result.desc"></span>
          </p>

          <div v-if="result.category">
            <p class=" clearfix tt">
              <span class=" f16"> 故障范畴: </span>
            </p>
            <p class="mt5" v-html="result.category"></p>
          </div>

          <div v-if="result.check">
            <p class=" clearfix tt">
              <span class=" f16"> 排查步骤: </span>
            </p>
            <p class="mt5" v-html="result.check"></p>
          </div>
        </div>

        <div v-else>
          <p v-if="hlFlField == 'pcode'" class=" clearfix tt">
            <span class=" f16"> 故障P码:&nbsp; </span>
            <span v-html="result.pcode"></span>
          </p>

          <p v-if="hlFlField == 'scode'" class=" clearfix tt">
            <span class=" f16"> 故障闪码:&nbsp; </span>
            <span v-html="result.scode"></span>
          </p>

          <p v-if="hlFlField == 'spn' && 'SQFYTHY' == result.solrType" class=" clearfix tt">
            <span class=" f16"> 故障代码:&nbsp; </span>
            <span v-html="result.spn"></span>
          </p>

          <p v-if="hlFlField == 'spn'" class=" clearfix tt">
            <span class=" f16"> SPN码:&nbsp; </span>
            <span v-html="result.spn"></span>
          </p>

          <p v-if="hlFlField == 'fmi'" class=" clearfix tt">
            <span class=" f16"> FMI码:&nbsp; </span>
            <span v-html="result.fmi"></span>
          </p>

          <p v-if="hlFlField == 'spn_fmi'" class=" clearfix tt">
            <span class=" f16"> SPN_FMI码:&nbsp; </span>
            <span v-html="result.spn_fmi"></span>
          </p>

          <p v-if="hlFlField == 'dtcm'" class=" clearfix tt">
            <span class=" f16"> 十六进制故障码:&nbsp; </span>
            <span v-html="result.dtcm"></span>
          </p>

          <p v-if="hlFlField == 'dtcm_10'" class=" clearfix tt">
            <span class=" f16"> 十进制故障码:&nbsp; </span>
            <span v-html="result.dtcm_10"></span>
          </p>

          <p v-if="hlFlField == 'factory_code'" class=" clearfix tt">
            <span class=" f16"> 厂家自定义码:&nbsp; </span>
            <span v-html="result.factory_code"></span>
          </p>

          <p v-if="hlFlField == 'the_system'" class=" clearfix tt">
            <span class=" f16"> 所属系统:&nbsp; </span>
            <span v-html="result.the_system"></span>
          </p>

          <p v-if="result.postId" class=" clearfix tt">
              <span class=" f16" style="float: left;"> 详情排查:&nbsp;
              </span>
            <a href="javascript: void(0);" @click.stop="toGuide(result.postId)" class="red right"
               style="text-decoration:underline; color: red; float: left;">
              图文指南
            </a>
          </p>

          <p v-if="result.pcode && hlFlField != 'pcode'" class=" clearfix tt">
            <span class=" f16"> 故障P码:&nbsp; </span>
            <span v-html="result.pcode"></span>
          </p>

          <p v-if="result.desc" class=" clearfix tt">
            <span class=" f16"> 故障描述: </span>
            <span class="mt5" v-html="result.desc"></span>
          </p>

          <p v-if="result.symptom &&  result.hlFlFidld != 'pcode'" class=" clearfix tt">
            <span class="f16"> 可能症状:&nbsp; </span>
          <p v-html="result.symptom"></p>
          </p>

          <p v-if="result.reason" class=" clearfix tt">
            <span class=" f16"> 可能原因:&nbsp; </span>
          <p v-html="result.reason"></p>
          </p>

          <p v-if="result.check" class=" clearfix tt">
            <span class=" f16"> 排查步骤:&nbsp; </span>
          <p v-html="result.check"></p>
          </p>

          <p v-if="result.other" class=" clearfix tt">
            <span class=" f16"> 其他提示:&nbsp; </span>
          <p v-html="result.other"></p>
          </p>
        </div>
        <div style="height: 60px;"></div>
        <div style="width: 100%; text-align: center;">
          <Online-qa :class="clineName"
                     :question="question + '&text5='
                     + (result.spn_fmi ? result.spn_fmi + ',' : '')
                     + (result.pcode ? result.pcode + ',' : '')
                     + result.desc
                     + '&text3=' + result.applicable_car"></Online-qa>
          <Collection v-if="moduleType" :collectParams="{
            moduleType: moduleType,
            objId: result.sn,
            queryValue: result.id,
            favId: result.favId
          }" :class="clineName"></Collection>
        </div>
      </div>
    </div>
    <div style="height: 35px;"></div>
  </div>
</template>
<script type="text/babel">
  import Collection from '../../components/common/collection.vue'
  import OnlineQa from '../../components/common/onlineQa.vue'

  export default{
    props: {
      result: {
        type: Object,
        require: true,
        default() {

        }
      },
      className: {
        type: String,
        require: false,
        default() {
          return '';
        }
      },
      keyword: {
        type: String,
        require: false,
        default() {
          return '';
        }
      },
      hlFlField: {
        type: String,
        require: true,
        default() {
          return '';
        }
      },
      moduleType: {
        type: Number,
        default() {
          return 0
        }
      },
      question: {
      	type: String,
        default() {
      		return ''
        }
      }
    },

    data(){
      return {
        clineName: "details",
        clineName2: "detalsTable"
      }
    },

    mounted() {
      let that = this;
      that.$on('collectResult', (data) => {
        that.$parent.$emit('collectResult', data);
      });
    },

    methods: {
      close() {
        this.$parent.$emit('closeDetail')
      },

      showOhk(solrType, attrName, ohk, obj) {
        if (solrType == 'Product' && attrName == 'ohk' && ohk) {
          let that = this;

          that._Util.post(that._Api.POST_PARTS_INFO_GET, {
            refNo: ohk,
            productType: 11
          }, (data) => {
            that.result.source = data;
            //that.result.source.push(data);
            that.$parent.$emit('keywordIsChange', ohk);
          }, () => {

          }, that);
        }
      },

      rewriteHtml(solrType, attrName, str) {
        if (!str) return;

        let temp = '';

        if (solrType == 'Product' && attrName == 'ohk') {
          temp = '<a class="aClass">' + str + '</a>';
        } else {
        	if (this.keyword) {
            temp = (str.replace(new RegExp(this.keyword, 'g'), '<font color="red">' + this.keyword + '</font>').replace(/\n/g, '<br>'));
          } else {
            temp = (str.replace(/\n/g, '<br>'));
          }
        }
        return temp;
      },

      toGuide(postId) {
        let that = this;

        that._Util.post(that._Api.POST_WXAUTH_GET_APPID, {}, (data) => {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + data.appId
            + '&redirect_uri=' + that._Api.HOSTOLD + 'wxauth/commonRailForumDetail.htm?postId=' + postId
            + '&response_type=code&scope=snsapi_base&state=commonRailForumDetail#wechat_redirect';
        }, () => {

        }, that);
      },
    },

    watch: {
    	'question'() {
    		console.log(this.question);
      }
    },

    components: {
      Collection,
      OnlineQa
    }
  }
</script>

<style>
  .newline {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  }
</style>
