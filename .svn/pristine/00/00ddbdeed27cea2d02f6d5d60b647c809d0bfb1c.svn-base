<template>

  <div>
    <div v-if="!editFlag" class="addressMy">
      <div v-for="(o, index) in resultList" class="myAddressList">
        <p>{{o.type == 1 ? '门店地址' : '收货地址'}}</p>


        <div v-if="o.addFlag" style="text-align: center">
          {{o.type == 1 ? '门店地址' : '收货地址'}}为空<br>
          <span @click="showSave(index,o)" style="color: #127BDC">点击添加地址{{o.type == 1 ? '门店地址' : '收货地址'}}</span>
        </div>

        <div v-else class="listEdit">
          <p>
            <span>{{o.name}}</span>
            <span>{{o.phone}}</span>
          </p>
          <p class="listEditRight">
            <button @click="editAddress(o)">编辑</button>
            <!--<button @click="deleteAdd(o)">清空</button>-->
          </p>
        </div>
        <p v-if="o.province" class="listAddress">
          {{(o.province || '') + (o.city || '') + (o.dist || '')  + (o.address || '')}}
        </p>
      </div>
    </div>


  </div>
</template>
<script type="text/babel">
  import VueArea from '../../../../components/vue-area/vue-area.vue';
  import DialogComponent from '../../../../components/DialogComponent.vue';

  export default{
    data(){
      return {
        display:false,
        editFlag: false,
        id: 1,
        address: {},
        addressNew: {},
        resultList: [],
        show: false,
        result: {
          province: {},
          city: {},
          area: {}
        },
        phoneExp:/^1[34578]\d{9}$/,

      }
    },
    mounted() {
      let that = this;
      that.getList();

      that.$on('checkedCity', (data) => {
        that._Util.log(data);
        that.show = false;
        that.addressNew.province = data.province;
        that.addressNew.city = data.city;
        that.addressNew.dist = data.area;

        that.display = true;
      });

      that.$on('areaCancel', () => {
        that.show = false;

      });
    },
    methods: {
      getList() {
        let that = this;

        if (that.$route.query.type == '1') {
          that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE_ADDRESS, {} , (data) =>{
            if (data) {
            	data.type = 1;
              that.resultList = [data];
            } else {
              that.resultList = [{
              	addFlag: true, type: that.$route.query.type
              }];
            }
          }, () =>{

          }, that);
        } else {
          that._Util.post(that._Api.POST_MEMBER_PERSONAL_ADDRESS, {type: that.$route.query.type}, (data) => {
            if (!data.length){
              that.resultList = [
                {addFlag: true, type: parseInt(that.$route.query.type)},
              ];
              return;
            } else {
              let flag = false;
              for (let i = 0; i < data.length; i++) {
                if (parseInt(that.$route.query.type) == data[i].type) {
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                that.resultList = [
                  {addFlag: true, type: that.$route.query.type},
                ];
                return;
              }
            }

            that.resultList = data.filter((v) => {
              if (v.type == parseInt(that.$route.query.type)) {
                return v;
              }
            });
          }, (data) => {

          }, that);
        }
      },
      showSave(o) {
        let that = this;
        that.$router.push({name: 'memberAddressChange', query: {id: o.id, type: that.$route.query.type}});
      },
      deleteAdd(o) {
        let that = this;
        that._Util.showMsgBoxConfirm(o.type == 1 ? '确认清空您的门店地址？' : '确认清空您的收货地址？',action =>{
          if(action){
            that._Util.post(that._Api.POST_MEMBER_PERSONAL_ADDRESS_DEL, {id: o.id}, () => {
              that.getList();
            }, () => {

            }, that);
          }
        })
      },
      editAddress(o) {
        let that = this;
        that.$router.push({name: 'memberAddressChange', query: {id: o.id, type: that.$route.query.type}});
      },
      phoneBlur(){
        let msg = '';
        let that = this;
        if(!that.phoneExp.test(that.addressNew.phone)){
          msg ='手机号码格式不正确或不能为空';
        }
        if (msg) {
          that._Util.showMsgBox(msg);
          return;
        }
      }
    },
    components: {
      VueArea
    }
  }
</script>
