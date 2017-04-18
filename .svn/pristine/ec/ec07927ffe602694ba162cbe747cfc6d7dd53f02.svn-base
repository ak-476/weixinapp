<template>
  <div>
    <div class="bMember">
      <div>
        <div class="fufeiImg">
          <img src="../../../../assets/images/20161103003.jpg">
          <p>{{$route.query.operType == '3' ? '报名成功' : ($route.query.operType == '1' ? '续费成功' : '认证成功')}}</p>
          <!--<a v-if="fufeiDisplay" class="chakanhuiyuanquanxian" @click="getMemberShip()" style="color: #0b4377;display: block;text-decoration: underline;margin-top: 10px;">付费说明</a>-->
        </div>
      </div>
    </div>

    <div class="addAddress">
      <div v-if="storeAddFlag">
        <div @click="show = !show" class="country" style="position: relative">
          <span>所在地区：</span>
          <p class="area">{{addressNew.province + addressNew.city + addressNew.dist || ''}}</p>
          <span class="pleaseCheck" v-if="!addressNew.province">请选择</span>
        </div>
        <div class="address">
          <span>详细街道：</span>
          <input type="text" v-model="addressNew.address"
                 placeholder="街道、楼牌号等">
          <div style="color: red;">
            <span v-if="addressNew.address && addressLength < 10">详细地址至少需要输入5个汉字</span>
            <span v-if="addressNew.address && addressLength > 120">详细地址最多可以输入60个汉字</span>
          </div>
        </div>

        <label class="mint-checklist-label" style="text-align: right; margin-top: 5px;">
        <span class="mint-checkbox">
          <input type="checkbox" v-model="syncFlag" class="mint-checkbox-input" value="同步为收货地址">
          <span class="mint-checkbox-core"></span>
        </span>
          <span class="mint-checkbox-label">同步为收货地址</span>
        </label>
      </div>

      <div class="addBTn" style="margin-top: 0;position: absolute; width: 96%;left: 2%;margin: 0">
        <button @click="save()">{{saveTitle}}</button>
        <button @click="nextTime()" style="background: white;color:#d41116; border: 1px solid #d41116;">下次再说</button>
      </div>

      <mt-popup
        v-model="popupVisible"
        position="right"
        class="mint-popup-3"
        :modal="false">

        <img :src="exclusive.img" style=" width: 100%; height: calc(100vh - 80px)"/>
        <div class="addBTn" style="margin-top: 0;position: absolute;bottom: 0; width: 96%;left: 2%;margin: 0">
          <button @click="nextTime()" style="background: white;color:#d41116; border: 1px solid #d41116;">关闭</button>
        </div>
      </mt-popup>

      <Vue-area :show="show" :result="result"></Vue-area>

    </div>
  </div>
</template>

<script type="text/babel">
  import {Checklist, Popup} from 'mint-ui';
  import VueArea from '../../../../components/vue-area/vue-area.vue';
  import DialogComponent from '../../../../components/DialogComponent.vue';

  export default{
    data(){
      return {
        user: {},
        addIndex: 0,
        address: {},
        addressNew: {
          name: '',
          phone: '',
          address: ''
        },
        resultList: [],
        id: this.$route.query.id,
        show: false,
        result: {
          province: {},
          city: {},
          area: {},
        },
        addressLength: 0,
        syncFlag: true,
        storeAddFlag: false,
        saveTitle: '获取专属客服',
        exclusive: {},
        popupVisible: false,
        province: '',
        shipAddId: ''
      }
    },
    mounted(){
      let that = this;
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_INFO, {}, (data) => {
        that.user = data;
      }, () => {

      }, that);

      that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE_ADDRESS, {} , (data) =>{
        if (data) {
          that.storeAddFlag = false;
          that.province = v.province;
          that.saveTitle = '获取专属客服';
        } else {
          that.storeAddFlag = true;
          that.saveTitle = '保存并获取专属客服';
        }
      }, () =>{

      }, that);

      that._Util.post(that._Api.POST_MEMBER_PERSONAL_ADDRESS, {type: 2}, (data) => {
        //data = [];
        if (!data || !data.length) {

        } else {
          that.shipAddId = data[0].id;
        }
      }, () => {

      }, that);

      that.$on('checkedCity', (data) => {
        that._Util.log(data);
        that.show = false;
        if (!data.province) {
          that.addressNew.province = '';
        } else {
          that.addressNew.province = data.province;
        }

        if (!data.city) {
          that.addressNew.city = '';
        } else {
          that.addressNew.city = data.city;
        }

        if (!data.area) {
          that.addressNew.dist = '';
        } else {

          that.addressNew.dist = data.area;
        }

//        that.addressNew.province = data.province.name;
//        that.addressNew.city = data.city.name;
//        that.addressNew.dist = data.area.name;
      });

      that.$on('areaCancel', () => {
        that.show = false;

      });

      that.addressLength = 0;

    },
    methods: {
      save() {
        let that = this;

        if (!that.storeAddFlag) {
          that.getExclusive(that);
          return;
        }

//        if (!that.addressNew.id) {
//          that.addressNew.type = 1;
//        }

        if (!that.addressNew.province) {
          that._Util.showMsgBox('请选择所在地区');
          return;
        }

        if (that.addressLength < 5) {
          that._Util.showMsgBox('详细地址至少需要输入5个汉字');
          return;
        }

        if (that.addressLength > 60) {
          that._Util.showMsgBox('详细地址最多可以输入60个汉字');
          return;
        }

        that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE_ADDRESS_SAVE, that.addressNew, (data) => {
          that.province = that._Util.copyObject(that.addressNew).province;
          if (that.syncFlag) {
            that.saveShip(that);
          } else {
            that.getExclusive(that);
          }

        }, () => {

        }, that);
      },

      saveShip(self) {
        let that = self;
        that.addressNew.type = 2;
        if (that.shipAddId) {
          that.addressNew.id = that.shipAddId;
        }
        that.addressNew.name = that.user.uname;
        that.addressNew.phone = that.user.uphone;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_ADDRESS_ADD, that.addressNew, () => {
          that.getExclusive(that);
        }, () => {

        }, that);
      },

      getExclusive(self) {
        let that = self;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_EXCLUSIVE, {province: that.province || '上海'}, (data) => {
          that.exclusive = data;
          that.popupVisible = true;
        }, () => {

        }, that);
      },

      nextTime() {
        let that = this;
        if (that.$route.query.name) {
          that.$router.replace({name: that.$route.query.name, path: that.$route.query.fullPath});
        } else {
          if (that.$route.query.external || that.$route.query.fullPath) {
            window.location.href = that.$route.query.fullPath;
          } else {
            that.$router.replace({name: 'memberCenter'});
          }
        }
      }
    },

    watch: {
      'addressNew.address' () {
        this.addressLength = this._Util.getByteLen(this.addressNew.address);
      }
    },

    components: {
      Popup,
      Checklist,
      VueArea
    }
  }
</script>

<style>
  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .mint-popup-3 .mint-button {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
  }
</style>
