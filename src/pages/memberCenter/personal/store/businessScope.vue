<template>
  <div class="businessStat natureIndex">
    <Tags :values="tags" @change="updateTags" v-if="tags.length"></Tags>
    <div class="businessS">
      <ul>
        <li v-for="(o,index) in businessResults" v-if="index < 6" @click="getBusiness(o)">{{ o.name }}</li>
        <li v-if="businessResults.length > 0"  @click="getNew()">其他</li>
        <li style="clear: both;display: none"></li>
      </ul>
    </div>
    <Dialog-component v-if="dialogShow" type="confirm" :title="dialogItem.title"
                      :confirm-button="dialogItem.confirmButton" :cancel-button="dialogItem.cancelButton"
                      call-back="">
      <div class="newForm">
        <span>业务</span>
        <input type="text" v-model="newsKeyWord" v-focus placeholder="请输入业务名称"/>
      </div>
    </Dialog-component>
    <div class="saveBtn">
      <button @click="save">保存</button>
    </div>
  </div>
</template>
<style>

</style>
<script type="text/babel">
  import Tags from '../../../../components/tag/index.vue'
  import DialogComponent from '../../../../components/DialogComponent.vue';
  export default{
    data(){
      return {
        tags: [],
        businessResults: [],
        businessList: {
          name: '',
          value: 0,
          natureChildName: ''
        },
        businessSaved:[],
        list:'',
        listText: '',
        dialogItem: {
          title: '其他业务范围',
          confirmButton: '确定',
          cancelButton: '取消'
        },
        keyword: "",
        newsKeyWord:"",
        dialogShow: false,


      }
    },
    mounted(){
      let that = this;
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORES_BUSINESS, {}, (data)=> {
        that.businessResults = data || [];

      }, ()=> {

      }, that)
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORES_BUSINESS_SAVE, {}, (data)=> {
        that.tags = data || [];
      }, ()=> {

      }, that)
      that.$on('dialogSave', () => {
        if(that.newsKeyWord.length > 7){
          that._Util.showMsgBox('字数不能超过七个')
          return false;
        }
        that.businessList = {
          name : that.newsKeyWord,
          value: null
        }
        that.tags.push(that.businessList)
        that.dialogShow = false;
      });
      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });
    },
    methods: {
      getNew(){
        let that = this;
        if(that.tags.length > 3){
          that._Util.showMsgBox("最多可添加4个关键字");
          return;
        }
        that.dialogShow = true;
      },
      updateTags(tags) {
        console.log(tags)

      },
      getBusiness(o){
        let that = this;
        if(that.tags.length > 3){
          that._Util.showMsgBox("最多可添加4个关键字");
          return;
        }
        that.businessList = {
          name: o.name,
          value: o.value
        }
        that.tags.push(that.businessList)


      },
      save(){
        let that = this;
        that._Util.showMsgBoxConfirm('确认保存信息吗', action => {
          if(action){
            let tlength = that.tags.length;
            for(let i =0; i< tlength ; i++){
              if(that.tags[i].value){
                that.list += that.tags[i].value + ","
              } else {
                that.listText += that.tags[i].name + ","
              }

            }
            that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORES_SAVE , { projectValue: that.list.substring(0,that.list.length-1), projectValueText: that.listText.substring(0,that.listText.length-1)}, () =>{
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
