<template>
  <div class="mendian">
    <div class="personal_detail" id="personal_detail">
      <div class="detail_mation" style="margin-top:0">
        <ul>
          <li class="detail_key">身份</li>
          <li class="detail_title" @click="_comeIn()">
            {{result.resign == 1 ? '老板' : ( result.resign == 2 ? '维修师傅' : '请选择身份')}}
          </li>
        </ul>
        <ul @click="toAddress()">
          <li class="detail_key">门店地址</li>
          <li class="detail_title">
            {{ (addressResult.province + addressResult.city + addressResult.dist + addressResult.country) || ''}}
          </li>
        </ul>
        <ul @click="toStoreNature()">
          <li class="detail_key">门店性质</li>
          <li class="detail_title">
            <span class="text-overflow-ellipsis">
                {{result.natureText}}
            </span>
          </li>
        </ul>
        <ul @click="toBusinessScope()">
          <li class="detail_key">业务范围</li>
          <li class="detail_title">
            <span class="text-overflow-ellipsis">{{ result.projectText }}</span>
          </li>
        </ul>
        <ul @click="showModal({title: '员工人数', flag: 1})">
          <li class="detail_key">员工人数</li>
          <li class="detail_title">{{result.technicianCount || 0}}人</li>
        </ul>
        <ul @click="showModal({title: '门店面积', flag: 2})">
          <li class="detail_key">门店面积</li>
          <li class="detail_title">{{result.storeArea || 0}}平方米左右</li>
        </ul>
      </div>

      <div class="weui-cells weui-cells_form" style="margin-top: auto; position: static;">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title" style="margin-left: -5px; color: #8f8f8f;">门店照片</p>
                <div class="weui-uploader__info">{{(imgResult.storePic && imgResult.storePic.length) || 0}}/9</div>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <!--<li class="weui-uploader__file" :style="{backgroundImage: 'url(http://oi47fz5zk.bkt.clouddn.com//ggzj/user/member/201701101353099922qus.png)'}"></li>-->
                  <li class="weui_uploader__file" v-for="(v, index) in imgResult.storePic"
                      :style="{ backgroundImage: 'url(' + (imgResult.prefixUrl + v) + '?imageView2/1/w/150/h/150)' }"
                      @click="previewImg(imgResult.prefixUrl + v, index, true)"
                      style="float: left; margin-right: 9px; margin-bottom: 9px; width: 79px; height: 79px; background: no-repeat 50%; background-size: cover;">
                  </li>
                </ul>

                <div class="weui-uploader__input-box">
                  <form id="storePicFrm" method="post" enctype="multipart/form-data">
                    <input id="storeImgInp" name="storeImg" @change="uploadImg(true)" class="weui-uploader__input" type="file"
                           accept="image/*" multiple>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="weui-cells weui-cells_form" style="margin-top: auto;">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title" style="margin-left: -5px; color: #8f8f8f;">设备设施</p>
                <div class="weui-uploader__info">{{(imgResult.storeDevicePic && imgResult.storeDevicePic.length) || 0}}/15</div>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files">
                  <!--<li class="weui-uploader__file" :style="{backgroundImage: 'url(http://oi47fz5zk.bkt.clouddn.com//ggzj/user/member/201701101353099922qus.png)'}"></li>-->
                  <li class="weui_uploader__file" v-for="(v, index) in imgResult.storeDevicePic"
                      :style="{ backgroundImage: 'url(' + (imgResult.prefixUrl + v) + '?imageView2/1/w/150/h/150)' }"
                      @click="previewImg(imgResult.prefixUrl + v, index, false)"
                      style="float: left; margin-right: 9px; margin-bottom: 9px; width: 79px; height: 79px; background: no-repeat 50%; background-size: cover;">
                  </li>

                  <!--<li class="weui_uploader__file" v-for="(v, index) in imgResult.storeDevicePic"


                      @click="previewImg(imgResult.prefixUrl + v, index, false)"
                      style="float: left; margin-right: 9px; margin-bottom: 9px; width: 79px; height: 79px; background: no-repeat 50%; background-size: cover;">
                    <canvas id="canvas"  :onload="drawImage(this, 79, 79)"></canvas>


                  </li>-->
                </ul>
                <div class="weui-uploader__input-box">
                  <form id="storeDevPicFrm" method="post" enctype="multipart/form-data">
                    <input id="storeDeviceImgInp" name="storeDeviceImg" class="weui-uploader__input" @change="uploadImg()" type="file" accept="image/*" multiple="">
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form id="delFrm" method="post" enctype="multipart/form-data">
        <input id="storePic" name="storePic" style="display: none;"/>
        <input id="storeDevicePic" name="storeDevicePic" style="display: none;"/>
      </form>

      <div v-if="previewImgUrl" @click="previewImgUrl = ''" class="weui-gallery" style="display: block">
        <span class="weui-gallery__img" :style="{ backgroundImage: 'url(' + previewImgUrl + '?imageView2/1)' }"></span>
        <div class="weui-gallery__opr">
          <a href="javascript:" class="weui-gallery__del">
            <i class="weui-icon-delete weui-icon_gallery-delete" @click.stop="deleteImg()"></i>
          </a>
        </div>
      </div>

      <!--<div class="weui_cells weui_cells_form" style="margin-top: auto;">
        <div class="weui_cell">
          <div class="weui_cell_bd">
            <div class="weui_uploader">
              <div class="weui_uploader_hd">
                <p class="weui_uploader_title" style="float: left;">设备照片</p>
                <div class="weui_uploader_info" style="text-align: right;">0/15</div>
              </div>
              <div class="weui_uploader_bd">
                <ul class="weui_uploader_files" id="uploaderFiles">
                  <li class="weui_uploader_file" :style="{backgroundImage: 'url(' + defaultImg + ')'}"></li>
                  <li class="weui_uploader_file" :style="{backgroundImage: 'url(' + defaultImg + ')'}"></li>
                  <li class="weui_uploader_file" :style="{backgroundImage: 'url(' + defaultImg + ')'}"></li>
                  <li class="weui_uploader_file" :style="{backgroundImage: 'url(' + defaultImg + ')'}"></li>
                  <li class="weui_uploader_file" :style="{backgroundImage: 'url(' + defaultImg + ')'}"></li>
                  <li class="weui_uploader_file" :style="{backgroundImage: 'url(' + defaultImg + ')'}"></li>
                  <li class="weui_uploader_file" :style="{backgroundImage: 'url(' + defaultImg + ')'}"></li>
                  <li class="weui_uploader_file weui_uploader_file_status" :style="{backgroundImage: 'url(' + defaultImg + ')'}">
                    <div class="weui_uploader_file_content">
                      <i class="weui_icon_warn"></i>
                    </div>
                  </li>
                  <li class="weui_uploader_file weui_uploader_file_status" :style="{backgroundImage: 'url(' + defaultImg + ')'}">
                    <div class="weui_uploader_file_content">50%</div>
                  </li>
                </ul>
                <div class="weui_uploader_input_wrp">
                  <input id="uploaderInput" class="weui_uploader_input" type="file" accept="image/*" multiple="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>-->

      <!--<p></p>-->
      <!--门店照片:-->
      <!--<img :src="imgData.prefixUrl + v" v-for="(v, index) in imgData.storePic" height="50" width="50">-->



    </div>
    <div v-if="display" @click="closeSelect" @touchmove="_stopDef" @mousewheel="_stopDef"
         style="position: absolute;z-index:200;left: 0;top: 0;bottom:0;right:0;background:#000000;opacity: 0.7 "></div>
    <div class="uregTime" v-if="display" style="right: 0;left: 0;bottom: 0;">
      <button class="cancel" @click="_cancel()">取消</button>
      <span>请选择</span>
      <button class="ensure" @click="_ensure()">确认</button>
      <div
        style="position: absolute;left: 0;top: 0;background: #eee;z-index: -20;height: 50px;width: 100%;"></div>
      <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
    </div>

    <Dialog-component v-if="dialogShow" type="confirm" :title="dialogItem.title"
                      :confirm-button="dialogItem.confirmButton" :cancel-button="dialogItem.cancelButton"
                      call-back="">
      <div class="newForm" v-if="dialogItem.flag == 1">
        <input type="number" v-focus v-model="newEntity.technicianCount"
               placeholder="请输入员工人数"/>
        <span>人</span>
      </div>
      <div class="newForm" v-if="dialogItem.flag == 2">
        <input type="number" v-model="newEntity.storeArea" v-focus placeholder="请输入门店面积">
        <span>平方米左右</span>
      </div>
    </Dialog-component>
  </div>
</template>
<script type="text/babel">
  import {Indicator} from 'mint-ui';
  import $ from 'jquery'
  import DialogComponent from '../../../../components/DialogComponent.vue';
  import  MemberShip from '../../../../components/common/MemberShip.vue'
  export default{
    data(){
      return {
        styleColor: {
          entityBgColor: '#ff0000',
        },
        result: {},
        dialogShow: false,
        dialogItem: {
          title: '',
          confirmButton: '确定',
          cancelButton: '取消',
          flag: 1
        },
        newEntity: {},
        tags: this.$route.query.tags,
        showAddress: false,
        imgResult: {},
        addressResult: {
          province: '',
          city: '',
          dist: '',
          country: ''
        },
        display: false,
        addressSlots: [{
          flex: 1,
          values: ['选择身份', '老板', '维修师傅'],
          className: 'slot',
          textAlign: 'center'
        }],
        card: '',
        previewImgUrl: '',
        isStoreImg: false,
        delImgIndex: ''
      }
    },

    mounted() {
      let that = this;
      that.getStoreInfo();

      that.$on('dialogSave', (data) => {
        let msg = '';
        switch (that.dialogItem.flag) {
          case 1:
            msg = that.newEntity.technicianCount ? '' : '员工人数不能为空';
            break;
          case 2:
            msg = that.newEntity.storeArea ? '' : '门店面积不能为空';
            break;
        }

        if (msg) {
          that._Util.showMsgBox(msg);
          return;
        }

        that.save(that, that.newEntity);
      });

      that.$on('dialogCancel', () => {
        that.dialogShow = false;
      });

      that.getStoreImg();

      //      地址列表
      that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORE_ADDRESS, {} , (data) =>{
      	if (data) {
          that.addressResult = {
            province : data.province || '',
            city: data.city || '',
            dist: data.dist || '',
            country: data.address || ''
          };
        }
      }, () =>{

      }, that);

    },
    methods: {
      getStoreInfo() {
        let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORES, {}, (data) => {
          that.result = data;
        }, () => {

        }, that);
      },

      getStoreImg() {
      	let that = this;
        that._Util.post(that._Api.POST_MEMBER_PERSONAL_STORES_IMG, {}, (data) => {
        	if (!data) return;
          that.imgResult = data;
        }, () => {

        }, that);
      },

      onAddressChange(picker, values) {
        let that =this;
        that.card = values[0];
      },
      _stopDef(e){
        e.preventDefault()
      },
      _cancel(){
        this.display = false;
      },
      _ensure(){
        let that = this;
        if( that.card == "老板"){
          that.result.resign = 1;
        } else if( that.card == "维修师傅"){
          that.result.resign = 2;
        } else {
          that.result.resign = 0;
        }
        that.save(that);
        that.display = false;
      },
      closeSelect(){
        this.display = false;
      },
      _comeIn(){
        this.display = true;

      },
      changeResign() {
        let that = this;
        that.save(that);

      },
      save(self, item) {
        self._Util.post(self._Api.POST_MEMBER_PERSONAL_STORES_SAVE, (item || self.result), (data) => {
          self.dialogShow = false;
          self.showAddress = false;
          //self._Util.showToast('保存成功');
          self.getStoreInfo();
        }, () => {

        }, self);
      },

      showModal(obj) {
        this.dialogItem.title = obj.title;
        this.dialogItem.flag = obj.flag;

        this.newEntity = JSON.parse(JSON.stringify(this.result));
        this.dialogShow = true;
      },

      toAddress() {
        this.$router.push({name: 'memberAddress', query: {type: 1}});
      },

      toBusinessScope() {
        this.$router.push({name: 'memberBusinessScope'});
      },

      toStoreNature() {
        this.$router.push({name: 'memberStoreNature'});
      },

      previewImg(prefixUrl, index, flag) {
      	this.previewImgUrl = prefixUrl;
      	this.delImgIndex = index;
      	this.isStoreImg = flag;
      },

      deleteImg() {
      	let that = this;
        $('#storePic').val('');
        $('#storeDevicePic').val('');
      	let imgResultCopy = that._Util.copyObject(that.imgResult);

        let arr = [];
        let picStr = '';
        let storeDevicePic = '';

      	if (that.isStoreImg) {
          imgResultCopy.storePic.splice(that.delImgIndex, 1);
          arr = imgResultCopy.storePic;
        } else {
          imgResultCopy.storeDevicePic.splice(that.delImgIndex, 1);
          arr = imgResultCopy.storeDevicePic;
        }

        for (let i = 0; i < arr.length; i++) {
          picStr += arr[i] + (i < arr.length - 1 ? ',': '');
        }

        if (that.isStoreImg) {
          $('#storePic').val(picStr);
          if (imgResultCopy.storeDevicePic && imgResultCopy.storeDevicePic.length > 0) {
          	let sdStr = '';
          	for (let i = 0; i < imgResultCopy.storeDevicePic.length; i++) {
              sdStr += imgResultCopy.storeDevicePic[i] + (i < imgResultCopy.storeDevicePic.length - 1 ? ',': '');
            }
            $('#storeDevicePic').val(sdStr);
          }
        } else {
          $('#storeDevicePic').val(picStr);
          if (imgResultCopy.storePic && imgResultCopy.storePic.length > 0) {
            let sStr = '';
            for (let i = 0; i < imgResultCopy.storePic.length; i++) {
              sStr += imgResultCopy.storePic[i] + (i < imgResultCopy.storePic.length - 1 ? ',': '');
            }
            $('#storePic').val(sStr);
          }
        }

        that._Util.showMsgBoxConfirm('确认删除照片吗?', (action) => {
          if (action) {
          	console.log(picStr);
            Indicator.open({
              spinnerType: 'fading-circle'
            });
            $.ajax({
              url: that._Api.POST_MEMBER_PERSONAL_STORES_IMG_SAVE,
              type: 'POST',
              async: true,
              data: $('#delFrm').serialize(),
              success: function (data) {
                Indicator.close();
                that.previewImgUrl = '';
                that.getStoreImg();
              },
              error: function (xhr, textStatus) {

                console.log('错误');
                console.log(xhr);
                console.log(textStatus);
                // that.showAlert('', '服务器异常,请稍后再试');
              },
              complete: function () {

              }
            });
          }
        });
      },

      uploadImg(flag) {
        let that = this;
        let frmName = '';
        let inputName = '';
        if (flag) {
          inputName = 'storeImgInp';
        } else {
          inputName = 'storeDeviceImgInp';
        }


        let imgArr = $('#' + inputName).get(0).files;
        let imgTotalSize = 0;
        for (let i = 0; i < imgArr.length; i++) {
          imgTotalSize += imgArr[i].size;
        }

        if (imgTotalSize / 1024 / 1024 > 8) {
        	that._Util.showMsgBox('图片单次上传最大8M,请分批上传吧~')
          return;
        }
      	if (flag) {
          frmName = 'storePicFrm';
      		if ($('#' + inputName).get(0).files.length > 9 || (that.imgResult && that.imgResult.storePic && $('#' + inputName).get(0).files.length > 9 - that.imgResult.storePic.length)) {
      			that._Util.showMsgBox('门店照片最多上传9张');
      			return;
          }
        } else {
          frmName = 'storeDevPicFrm';
          if ($('#' + inputName).get(0).files.length > 15 || (that.imgResult && that.imgResult.storeDevicePic && $('#' + inputName).get(0).files.length > 15 - that.imgResult.storeDevicePic.length)) {
            that._Util.showMsgBox('设备设施最多上传15张');
            return;
          }
        }

      	//return;
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        $.ajax({
          url: that._Api.POST_MEMBER_PERSONAL_STORES_IMG_SAVE,
          type: 'POST',
          async: true,
          data: new FormData($('#' + frmName)[0]),
          processData: false,
          contentType: false,
          success: function (data) {
            Indicator.close();
            //that.previewImgUrl = '';
            that.getStoreImg();
          },
          error: function (xhr, textStatus) {

            console.log('错误');
            console.log(xhr);
            console.log(textStatus);
            // that.showAlert('', '服务器异常,请稍后再试');
          },
          complete: function () {

          }
        });
      }

    },
    components: {
      DialogComponent
    }
  }
</script>

<style>
  @import '../../../../assets/css/upload.css';
</style>
