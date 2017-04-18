<template>
  <div class="natureIndex">
    <Tags :values="tags" @change="updateTags" v-if="tags.length > 0"></Tags>

    <div class="natureCheck" v-if="pageShow">
      <div class="natureTab">
        <ul>
          <li v-for="(o,index) in storeResults" :class="{ active: index == tableIndex }" @click="getStoreChild(o,index)"><span></span>{{ o.treeName }}<span></span></li>
        </ul>
      </div>
      <div class="natureList">
        <ul>
          <li v-for="(v,index) in storeResultChild"  @click="addStore(v,index)">{{v.treeName}}</li>
          <li @click="getNew()" class="others">
            其他
            <br>(点击进行自定义添加)
          </li>
        </ul>
      </div>
    </div>
    <Dialog-component v-if="dialogShow" type="confirm" :title="dialogItem.title"
                      :confirm-button="dialogItem.confirmButton" :cancel-button="dialogItem.cancelButton"
                      call-back="">
      <div class="newForm news">
        <span>{{ dialogItem.title == '品牌维修店'? '品牌' : (dialogItem.title == '自营维修站' ? '自营' : dialogItem.title) }}</span>
        <input type="text" v-model="keyword" v-focus placeholder="请输入名称"/>
      </div>
    </Dialog-component>
    <div class="saveBtn">
      <button @click="save">保存</button>
    </div>
  </div>
</template>
<script type="text/babel">
  import Tags from '../../../../components/tag/index.vue'
  import DialogComponent from '../../../../components/DialogComponent.vue';
  export default{
    data(){
      return {
        tags: [],
        intId: 0,
        pageShow: false,
        dialogItem: {
          title: '其他主机服务站',
          confirmButton: '确定',
          cancelButton: '取消'
        },
        keyword: "",
        dialogShow: false,
        storeResults: [],
        storeResultChild: [],
        tableIndex: 0,
        resultList: [],
        saveList:{
            natureId: 0,
            natureChildId: 0,
            natureValue: '',
            natureChildName: ''
          },
        pressList: {
            natureId: 0,
            natureChildId: 0,
            natureValue: '',
            natureChildName: '',
         }
      }
    },
    mounted(){
      let that = this;
      that.$on('dialogSave', () => {
        if(that.keyword.length > 7){
          that._Util.showMsgBox('字数不能超过七个')
          return false;
        }

        that.pressList = {
          natureId : that.intId,
          natureChildId: '',
          natureValue: that.keyword,
          natureChildName: that.keyword
        }
        that.tags.push(that.pressList)
        that.dialogShow = false;
      });
      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });

      that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE, {} ,(data) =>{
        that.storeResults = data;
        that.storeResultChild = data[0].storeNatureChild;
        that.intId = that.storeResultChild.id;
        that.pageShow = true;
      }, () => {

      }, that)
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE_USER, {} , (data) =>{
        that.tags = data;
      }, ()=>{

      }, that)
    },
    methods: {
      updateTags(tags) {
      },
      getNew(){
        let that = this;
        that.dialogShow = true;
      },
      getStoreChild(o,index){
        let that = this;
        that.storeResultChild = o.storeNatureChild;
        that.tableIndex = index;
        that.intId = o.id;
        that.dialogItem.title = o.treeName;
      },
      addStore(v){
        let that = this;
        if(that.tags.length > 3){
          that._Util.showMsgBox("最多可添加4个关键词")
          return ;
        }
        that.saveList = {
          natureId : v.parentId,
          natureChildId : v.id,
          natureValue : '',
          natureChildName : v.treeName
        }
//        that.saveList.natureId = v.parentId;
//        that.saveList.natureChildId = v.id;
//        that.saveList.natureValue = '';
//        that.saveList.natureChildName = v.treeName;
        that.tags.push(that.saveList);



      },
      save(){
        let that = this;
        that._Util.showMsgBoxConfirm('确认保存信息吗', action => {
          if(action){
            that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE_SAVE , { data: that.tags}, () =>{
              this.$router.push({name: 'memberStore'});
            }, () =>{

            }, that)
          }

        })

      }
    },

    components: {
      Tags,
      DialogComponent
    }
  }
</script>
