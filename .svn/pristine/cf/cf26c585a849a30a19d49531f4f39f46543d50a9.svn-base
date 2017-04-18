<template>
  <div>
    <div class="personal_detail" id="personal_detail">

      <div class="detail_img">
        <img :src="result.headImgUrl">
        <p>{{result.uname}}</p>
      </div>

      <div class="detail_mation">
        <ul @click="showModal({title: '修改姓名', flag: 1})">
          <li class="detail_key">姓名</li>
          <li class="detail_title" v-html="result.uname"></li>
        </ul>
        <ul @click="showModal({title: '修改手机号', flag: 2})">
          <li class="detail_key">手机号</li>
          <li class="detail_title" v-html="result.uphone"></li>
        </ul>
        <ul @click="showModal({title: '修改邮箱', flag: 3})">
          <li class="detail_key">邮箱</li>
          <li class="detail_title" v-html="result.uemail"></li>
        </ul>
        <ul @click="showDateTime = !showDateTime">
          <li class="detail_key">生日</li>
          <li class="detail_title">{{result.birthDayStr}}</li>
        </ul>
        <ul @click="toAddress()">
            <li class="detail_key">收货地址</li>
            <li class="detail_title" v-html="(addressResult.province + addressResult.city + addressResult.dist + addressResult.country) || ''">{{ }}</li>
          <!-- <li class="detail_key">公司类型</li>
          <li class="detail_title" id="detail_style">{{_Enums.ENUMS_COMPANY_TYPE[result.userType]}}</li>
          <select v-model="userType"
                  @change="changeUserType()"
                  class="detailconpany">
            <option value="">请选择公司性质(非必填)</option>
            <option value="1">校泵站</option>
            <option value="2">设备配件生产商</option>
            <option value="3">经销商</option>
            <option value="4">共轨产品生产商</option>
            <option value="6">汽车电路维修</option>
            <option value="5">其他</option>
          </select> -->
        </ul>
      </div>
    </div>

    <Dialog-component v-if="dialogShow" type="confirm" :title="dialogItem.title"
                      :confirm-button="dialogItem.confirmButton" :cancel-button="dialogItem.cancelButton"
                      call-back="">
      <!--<mt-field ref="input" v-model="newEntity.uname" v-if="dialogItem.flag == 1"
                v-focus
                label="姓名" placeholder="请输入姓名" :attr="{ maxlength: 10 }"
      ></mt-field>-->
      <div class="newForm" v-if="dialogItem.flag == 1">
        <span>姓名</span>
        <input type="text" v-focus v-model="newEntity.uname"
               placeholder="请输入姓名" />
      </div>

      <div class="newForm" v-if="dialogItem.flag == 2">
        <span>手机号</span>
        <input v-focus v-model="newEntity.uphone"  type="number"  :attr="{ autofocus: 'autofocus'}"
               placeholder="请输入手机号码" />
      </div>
      <div class="page-part newForm" v-if="dialogItem.flag == 2">
        <span>验证码</span>
        <input v-model="newEntity.inputCode" type="tel" placeholder="输入验证码">
        <button id="newEntity" @click="getCode()" :disabled="smsFlag">{{newEntityText}}</button>
      </div>

      <div class="newForm" v-if="dialogItem.flag == 3">
        <span>邮箱</span>
        <input type="email" v-model="newEntity.uemail" v-focus placeholder="请输入邮箱">
      </div>
      <!--<mt-field v-model="newEntity.uemail" v-if="dialogItem.flag == 3"-->
                <!--label="邮箱" placeholder="请输入邮箱"-->
                <!--:attr="{ autofocus: 'autofocus'}" type="email"></mt-field>-->

    </Dialog-component>

    <Date-time-picker :show="showDateTime"></Date-time-picker>
  </div>
</template>
<script type="text/babel">
  import DialogComponent from '../../../../components/DialogComponent.vue';
  import DateTimePicker from '../../../../components/datetimePicker/index.vue';

  export default{
    data(){
      return {
        styleColor: {
          entityBgColor: '#ff0000',
        },
        newEntityText: '发送验证码',
        result: {},
        timeOut: 60,
        phoneExp: /^1[34578]\d{9}$/,
        emailExp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        entity: true,
        dialogShow: false,
        popupVisible: false,
        smsFlag: false,
        addressResult: {
          province: '',
          city: '',
          dist: '',
          country: ''
        },
        dialogItem: {
          title: '',
          confirmButton: '确定',
          cancelButton: '取消',
          flag: 1
        },
        newEntity: {},
        userType: '',
        addressid: 0,
        showDateTime: false,
        birthDay: ''
      }
    },
    mounted() {
      let that = this;
      that.getInfo(that);

      that.$on('dialogSave', (data) => {
        let msg = '';
        switch (that.dialogItem.flag) {
          case 1:
            msg = that.newEntity.uname ? '' : '姓名不能为空 ';
            break;
          case 3:
            msg = that.newEntity.uemail ? '' : '邮箱地址不能为空 ';
            if (!msg && !that.emailExp.test(that.newEntity.uemail)) {
              msg = '邮箱地址格式不正确';
            }
            break;
          case 2:
            msg = that.newEntity.uphone ? '' : '电话号码不能为空 ';
            if (!msg && !that.phoneExp.test(that.newEntity.uphone)) {
              msg = '手机号码格式不正确';
            }
            break;
        }

        if (msg) {
          that._Util.showMsgBox(msg);
          return;
        }

        if (that.dialogItem.flag == 2) {
          that.checkCode(() => {
            that.save();
          });
        } else {
          that.save();
        }
      });

      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });

      that.$on('checkedCity', (data) => {
        if (data.province) {
        	that.birthDay = data.province + '-' + data.city + '-' + data.area;
        }
        that.showDateTime = false;
        this.newEntity = JSON.parse(JSON.stringify(this.result));
        that.save();
      });

      that.$on('areaCancel', () => {
        that.showDateTime = false;
      });

      that._Util.post(that._Api.POST_MEMBER_PERSONAL_ADDRESS, { type: 2} , (data) =>{
      	if (data && data.length) {
          that.addressResult = {
            province : data[0].province || '',
            city: data[0].city || '',
            dist: data[0].dist || '',
            country: data[0].address || ''
          };
        }
      }, () =>{

      }, that);
    },
    methods: {
      save() {
        let that = this;
        that.result = that.newEntity;
        that.dialogShow = false;
        let params = {
          nickname: that.result.nickname,
          sex: that.result.sex,
          province: that.result.province,
          city: that.result.city,
          country: that.result.country,
          headImgUrl: that.result.headImgUrl,
          uprovince: that.result.uprovince,
          ucity: that.result.ucity,
          udist: that.result.udist,
          uaddress: that.result.uaddress,
          ucompany: that.result.ucompany,
          uname: that.result.uname,
          uemail: that.result.uemail,
          uphone: that.result.uphone,
          inputCode: that.result.inputCode,
          openId: that.result.openId,
          userType: that.result.userType,
          birthDayStr: that.birthDay || that.result.birthDayStr
        };

        that._Util.post(that._Api.POST_MEMBER_PERSONAL_SAVE, params, function (data) {
          that._Util.post(that._Api.POST_MEMBER_PERSONAL_SAVE_WXAUTH, params, function (data) {
            that.birthDay = '';
            that.getInfo(that);
          }, () => {

          }, that)
        }, () => {

        }, that);
      },
      showModal(obj) {
        this.dialogItem.title = obj.title;
        this.dialogItem.flag = obj.flag;

        this.newEntity = JSON.parse(JSON.stringify(this.result));
        this.dialogShow = true;
      },
      changeUserType() {
        this.newEntity = JSON.parse(JSON.stringify(this.result));
        this.newEntity.userType = this.userType;
        this.save();
      },
      getInfo(self) {
        let that = self;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_INFO, {}, (data) => {
          that.result = data;
        }, () => {

        }, that);
      },
      getCode() {
        let msg = '';
        let that = this;
        msg = that.newEntity.uphone ? '' : '电话号码不能为空 ';
        if (!that.phoneExp.test(that.newEntity.uphone)) {
          msg = '手机号码格式不正确';
        }
        if (msg) {
          that._Util.showMsgBox(msg);
          return;
        }

        that.entity = false;
        that._Util.post(that._Api.POST_WXAUTH_PHONE_NOTE, {phone: that.newEntity.uphone}, (data) => {
          that.smsFlag = true;

          let time = setInterval(function () {
            if (that.timeOut == 1) {
              that.newEntityText = '发送验证码';
              that.timeOut = 60;
              that.smsFlag = false;
              clearInterval(time);
            } else {
              that.newEntityText = (that.timeOut--) + 's后重新发送';

            }

          }, 1000)
        }, function () {

        }, that);
      },
      checkCode(callback) {
        let that = this;
        console.log(that._Util.copyObject(that.newEntity.inputCode));
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_CHECK_CODE, {inputCode: that.newEntity.inputCode}, (data) => {
        	//return;
          callback && callback();
        }, function () {

        }, that);
      },

      toAddress() {
      	this.$router.push({name: 'memberAddress', query: {type: 2}});
      }
    },
    components: {
      DialogComponent,
      DateTimePicker
    }
  }
</script>
