<template>
  <div>
    <div class="addAddress">
      <div class="name" v-if="$route.query.type == '2'">
        <span>联系人：</span>
        <input type="text" v-model="addressNew.name" />
      </div>
      <div class="tel" v-if="$route.query.type == '2'">
        <span>手机号码：</span>
        <input type="number" v-model="addressNew.phone" />
      </div>
      <div @click="show = !show" class="country" style="position: relative">
        <span>所在地区：</span>
        <p class="area">{{(addressNew.province || '') + (addressNew.city || '') + (addressNew.dist || '')}}</p>
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
      <div class="addBTn" style="margin-top: 0;position: absolute;bottom: 0; width: 96%;left: 2%;margin: 0">
        <button @click="save()">保存</button>
      </div>

      <Vue-area :show="show" :result="result"></Vue-area>

    </div>
  </div>
</template>

<script type="text/babel">
  import VueArea from '../../../../components/vue-area/vue-area.vue';
  import DialogComponent from '../../../../components/DialogComponent.vue';

  export default{
    data(){
      return {
        test: '',
        addIndex: 0,
        address: {},
        addressNew: {
          name: null,
          phone: null,
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
        phoneExp: /^1[34578]\d{9}$/,
      }
    },
    mounted(){
      let that = this;

      if (that.$route.query.type == '1') {
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE_ADDRESS, {} , (data) =>{
          if (data) {
            that.addressNew = data;
            that.getAddLen();
          }
        }, () =>{

        }, that);
      } else {
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_ADDRESS_detail, {id: that.id}, (data) => {
          if (!data) {
            return;
          }
          that.addressNew = data;
          that.getAddLen();

        }, () => {

        }, that)
      }


      that.$on('checkedCity', (data) => {
        that._Util.log(data);
        that.show = false;
        if(!data.province){
          that.addressNew.province = '';
        } else {
          that.addressNew.province = data.province;
        }

        if(!data.city){
          that.addressNew.city = '';
        } else {
          that.addressNew.city = data.city;
        }

        if(!data.area){
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
        if (!that.addressNew.id) {
          that.addressNew.type = that.$route.query.type;
        }

        if (!that.addressNew.name && that.$route.query.type == '2') {
          that._Util.showMsgBox('联系人不能为空');
          return;
        }

        if (!that.addressNew.phone && that.$route.query.type == '2') {
          that._Util.showMsgBox('手机号不能为空');
          return;
        }

        if (!that.phoneExp.test(that.addressNew.phone) && that.$route.query.type == '2') {
          that._Util.showMsgBox('手机号码格式不正确');
          return;
        }

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

        that._Util.showMsgBoxConfirm('是否确认保存信息', action => {
          if (!action) {
            return;
          } else {
            that._Util.post(that.addressNew.type == 1 ? that._Api.POST_MEMBER_PERSONAL_STORE_ADDRESS_SAVE : that._Api.POST_MEMBER_PERSONAL_ADDRESS_ADD, that.addressNew, () => {
              that.$router.replace({name: 'memberAddress', query: {type: that.$route.query.type}});
              if(that.$route.query.type == 1){
                that.$router.replace({name: 'memberStore'});
              } else {
                that.$router.replace({name: 'memberPersonalInfo'});
              }
            }, () => {

            }, that);
          }
        })
      },
      phoneBlur(){
        let msg = '';
        let that = this;
        if (!that.phoneExp.test(that.addressNew.phone)) {
          msg = '手机号码格式不正确或不能为空';
        }
        if (msg) {
          that._Util.showMsgBox(msg);
        }
      }
    },

    watch: {
      'addressNew.address' () {
        this.addressLength = this._Util.getByteLen(this.addressNew.address);
      }
    },

    components: {
      VueArea
    }
  }
</script>
