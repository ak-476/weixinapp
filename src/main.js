import Vue from 'vue'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import Mint from 'mint-ui'
import router from "./router/index"
import * as filters from './filter/index'
import * as directives from './directive/index'
import App from './App.vue'
import _Util from './assets/js/Utils'
import _DESUtil from './assets/js/des3/des3'
import _Enums from './assets/js/enums'
import _Api from './api'

import 'mint-ui/lib/style.css';

//开启debug模式
Vue.config.debug = true;

// Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(Mint);

Vue.prototype.$http = axios;
Vue.prototype._Util = _Util;
Vue.prototype._Api = _Api;
Vue.prototype._Enums = _Enums;
Vue.prototype._DESUtil = _DESUtil;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

//增加权限控制
// router.beforeEach((route, redirect, next) => {
//   setTitle(route.meta.title || document.title);
//   next();
//   return;
//   // next();
//   // return;
//   //document.title = route.meta.title || document.title;
//   axios.post(_Api.POST_WXAUTH_CHECK_SESSION, {}).then((response) => {
//     if (response.status != 200) {
//       _Util.ajaxError(response);
//     } else {
//       if (!response.data.data.verifyStatus) {
//         let reg = new RegExp("(^|&)code=([^&]*)(&|$)");
//         let r = window.location.search.substr(1).match(reg);
//         let code = (r == null ? null : decodeURI(r[2]));
//
//         if (code) {
//           axios.post(_Api.POST_COMMON_GET_SEESION, {code: code}).then((response) => {
//             if (response.status != 200) {
//               _Util.ajaxError(response);
//             } else {
//               Vue.cookie.set('sid', response.data.data.sessionId);
//               next();
//             }
//           })
//         } else {
//           axios.post(_Api.POST_WXAUTH_GET_APPID, {}).then((response) => {
//             if (response.status != 200) {
//               _Util.ajaxError(response);
//             } else {
//               if (response.data.data && response.data.data.appId) {
//                 window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + response.data.data.appId + "&redirect_uri=" + escape(location.href) + "&action=viewtest&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
//               }
//             }
//           });
//         }
//       } else {
//         next();
//       }
//     }
//   });
// });
document.body.onselectstart = document.body.oncontextmenu = function () {
  return false;
}

function setTitle(title) {
  document.title = title
  var mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    var iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', '/static/static/iframeImg.png')
    var iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }

}

const app = new Vue({
  router: router,
  render: h => h(App)
  // components: { firstcomponent, secondcomponent }d
}).$mount('#app');


