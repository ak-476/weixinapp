<template>
  <div>

    <input type="hidden" id="serachType" name="serachType" value=""/>
    <div>
      <div class="col col1">
        <ul class="search">
          <li class=" tc">
            <img src="../../../assets/images/gzdm.png" class="serchicon"/>
          </li>
          <li class="search_input">
            <input type="text" v-model.trim="keyword" style="height: 50px;width: 100%;border-radius: 5px;" placeholder="请输入查询信息"/>
          </li>
          <li class=" mt25">
            <a class=" btn btn_redlight btn_large">
              <input type="button" @click="search()" class="inputSubmit"/> 搜搜
            </a>
          </li>
          <li class="tips">
            <p class="yuanxinl">输入正确的故障码，如P码、闪码、十六进制码等。小轨将罗列出所有相关信息，请点击相应车型系统的条目查看详细排查指南。</p>
            <p class="yuanxinl">点击“图文指南”，小轨手把手教您排忧解难。</p>
            <p class="yuanxinl">遇到任何棘手的问题，欢迎进入“在线问答”提问，小轨们实时解答。</p>
          </li>
        </ul>
      </div>
    </div>

    <Poking-me-component></Poking-me-component>
  </div>
</template>
<script type="text/babel">
  import PokingMeComponent from '../../../components/common/pokingMeComponent.vue';

  export default{
    data(){
      return {
        keyword: '',
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im,

      }
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
        that.$router.push({name: 'faultList', query: {keyword: that.keyword}});
      }
    },
    components: {
      PokingMeComponent,
    }
  }
</script>
