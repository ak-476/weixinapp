<template>
  <div>
    万能搜搜:

    <router-link :to="{path: '/v2/faultCode/index'}">故障代码</router-link>
    <router-link :to="{name: 'partsInfoIndex'}">系统部件</router-link>
    <router-link :to="{path: '/v2/datum/datumSearch?checkIndex=0'}">资料大全</router-link>
    <router-link :to="{path: '/v2/soso/testDataQuery'}">测试数据</router-link>
    <router-link :to="{path: '/v2/universalSoso/index'}">万能搜搜</router-link>
    <router-link :to="{path: '/v2/cycLopeDia/index'}">电喷百科</router-link>
    <router-link :to="{path: '/v2/login'}">登录</router-link>

    </br>

    会员中心
    <router-link :to="{path: '/v2/member/center'}">会员中心</router-link>

    <br>
    <form>
      <input id="test" type="file">
    </form>

    <div id="msg">

    </div>
    <br>

    <!--<file-upload-->
      <!--:title="title"-->
      <!--class="file-upload"-->
      <!--:events="events"-->
      <!--:name="name"-->
      <!--:post-action="postAction"-->
      <!--:extensions="extensions"-->
      <!--:accept="accept"-->
      <!--:multiple="multiple"-->
      <!--:size="size"-->
      <!--:headers="headers"-->
      <!--:data="data"-->
      <!--:drop="drop"-->
      <!--:files="files"-->
      <!--:auto="auto"-->
      <!--ref="upload">-->
    <!--</file-upload>-->

    <!--<button v-if="upload.active" type="submit" @click.prevent="upload.active = !upload.active">Stop upload</button>-->
    <!--<button v-else type="submit" @click.prevent="upload.active = !upload.active">上传图片</button>-->
  </div>
</template>
<style>

</style>
<script>
  //import FileUpload from 'vue-upload-component'
//  import $ from 'jquery'
//  import upload from '../assets/js/jquery.upload'
  export default{
    data() {
      return {
        storePicCount: 0,
        accept: 'image/*',
        size: 1024 * 1024 * 10,
        multiple: true,
        extensions: 'gif,jpg,png',
        // extensions: ['gif','jpg','png'],
        // extensions: /\.(gif|png|jpg)$/i,
        files: [],
        upload: [],
        title: '请选择图片',
        drop: true,
        auto: true,

        name: 'storeImg',

        postAction: 'http://192.168.11.58:9999/api/storeInfo/saveStoreImg.htm',

        headers: {
          "X-Csrf-Token": "xxxx",
        },

        data: {
          "_csrf_token": "xxxxxx",
        },

        events: {
          add(file, component) {
            console.log('add');
            if (this.auto) {
              component.active = true;
            }
            file.headers['X-Filename'] = encodeURIComponent(file.name);
            file.data.finename = file.name;
            this.storePicCount++;

            // file.putAction = 'xxx'
            // file.postAction = 'xxx'
          },
          progress(file, component) {
            console.log('progress ' + file.progress);
            if (!this.storePicCount) {
            	console.log('last');
            }

              this.storePicCount--;
          },
          after(file, component) {
            console.log('after');
          },
          before(file, component) {
            console.log('before');
          },
        }
      }
    },

    mounted() {


    },

    methods: {
      remove(file) {
        var index = this.files.indexOf(file)
        if (index != -1) {
          this.files.splice(index, 1);
        }
      },
    },

    components: {
      //FileUpload
    }
  }
</script>
