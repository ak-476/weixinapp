<template>
  <div>

    <input type="hidden" id="serachType" name="serachType" value=""/>
    <div>
      <div class="col col1">
        <ul class="search">
          <li class=" tc">
            <img src="../../../assets/images/wnss.png" class="serchicon"/>
          </li>
          <li class="search_input">
            <input type="text" v-model.trim="keyword" placeholder="请输入关键字，如：发动机 博世"/>
          </li>
          <li class=" mt25">
            <a class=" btn btn_redlight btn_large">
              <input type="button" @click="search()" class="inputSubmit" value=""/>搜搜
            </a>
          </li>
          <li class="tips">
            <p class="yuanxinl">这是一个万能的搜索功能！您可以搜索到任何维修相关的知识要点。</p>
            <p class="yuanxinl">包括配套信息、经典问答、电路图、学习资料、排查指南、维修诀窍等。</p>
            <p class="yuanxinl">若都不到内容，请及时给小轨留言</p>
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
        patrn: /[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\\\\/;'\[\]]/im
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

        if(that.patrn.test(that.keyword)){
          that._Util.showMsgBoxThen('输入内容含有特殊字符', () => {
            that.keyword = '';
          });
          return;
        }
        if (!that.keyword) {
          that._Util.showMsgBox('请填写查询关键词');
          return;
        }
        that.$router.push({name: 'universalSerList', query: {keyword: that.keyword}});
      }
    },
    components: {
      PokingMeComponent
    }
  }
</script>
