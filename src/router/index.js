import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router);


//创建一个路由器实例
//并且配置路由规则
export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'certification',
      path: '/v2/auth/certification',
      component (resolve) {
        require(['../pages/common/certification.vue'], resolve);
      },
      meta: {
        title: '共轨之家|活动报名联系方式'
      }
    }, {
      name: 'certificationRenewal',
      path: '/v2/business/pay/certificationRenewal',
      component (resolve) {
        require(['../pages/common/certificationRenewal.vue'], resolve);
      },
      meta: {
        title: '共轨之家|认证续费',
      }
    }, {
      name: 'testDataQuery',
      path: '/v2/soso/testDataQuery',
      component (resolve) {
        require(['../pages/soso/testData/testDataQuery.vue'], resolve);
      },
      meta: {
        title: '共轨之家|测试数据查询'
      }
    }, {
      name: 'openMember',
      path: '/v2/business/pay/openMember',
      component (resolve) {
        require(['../pages/common/certificationRenewal.vue'], resolve);
      },
      meta: {
        title: '共轨之家|开通会员'
      }
    }, {
      path: '/v2/faultCode/index',
      component (resolve) {
        require(['../pages/soso/faultCode/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|故障代码查询'
      }
    },
    {
      name: 'faultList',
      path: '/v2/faultCode/list',
      component (resolve) {
        require(['../pages/soso/faultCode/list.vue'], resolve);
      },
      meta: {
        title: '共轨之家|故障代码查询'
      }
    },
    {
      name: 'partsInfoIndex',
      path: '/v2/partsInfo/index',
      component (resolve) {
        require(['../pages/soso/partsInfo/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|系统部件'
      }
    },
    {
      path: '/v2/datum',
      component (resolve) {
        require(['../pages/soso/datum/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|资料大全'
      },
      children: [
        {
          name: 'datumSearch',
          path: 'datumSearch',
          component (resolve) {
            require(['../pages/soso/datum/datumSearch.vue'], resolve);
          },
          meta: {
            title: '共轨之家|资料大全'
          }
        }, {
          name: 'engine',
          path: 'engine',
          component (resolve) {
            require(['../pages/soso/datum/engine.vue'], resolve);
          },
          meta: {
            title: '共轨之家|发动机资料'
          }
        }, {
          name: 'datumList',
          path: 'datumList',
          component (resolve) {
            require(['../components/datum/datumList.vue'], resolve);
          },
          meta: {
            title: '共轨之家|资料大全'
          }
        }
      ]
    },
    {
      path: '/v2/universalSoso/index',
      component (resolve) {
        require(['../pages/soso/universal/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|万能搜搜',
      }
    },
    {
      name: 'universalSerList',
      path: '/v2/universalSoso/searchList',
      component (resolve) {
        require(['../pages/soso/universal/universaSosoList.vue'], resolve);
      },
      meta: {
        title: '共轨之家|万能搜搜'
      }
    },
    {
      path: '/v2/lectureRoom',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|小轨特训'
      }
    }, {
      name: 'courseWare',
      path: '/v2/lectureRoom/courseWare',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/courseWare.vue'], resolve);
      },
      meta: {
        title: '共轨之家|精品课件'
      }
    }, {
      name: 'courseWareList',
      path: '/v2/lectureRoom/courseWareList',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/courseWareList.vue'], resolve);
      },
      meta: {
        title: '共轨之家|精品课件'
      }
    }, {
      name: 'advice',
      path: '/v2/lectureRoom/advice',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/advice.vue'], resolve);
      },
      meta: {
        title: '共轨之家|评价建议'
      }
    }, {
      name: 'share',
      path: '/v2/lectureRoom/share',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/share.vue'], resolve);
      },
      meta: {
        title: '共轨之家|往期特训'
      }
    }, {
      name: 'currentPeriodList',
      path: '/v2/lectureRoom/current/list',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/currentPeriodList.vue'], resolve);
      },
      meta: {
        title: '共轨之家|本期特训'
      }
    }, {
      title: '小轨动态',
      name: 'dynamicCondition',
      path: '/v2/lectureRoom/dynamicCondition',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/dynamicCondition.vue'], resolve);
      },
      meta: {
        title: '共轨之家|小轨动态'
      }
    }, {
      name: 'currentPeriodDetail',
      path: '/v2/lectureRoom/current/detail',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/currentPeriodDetail.vue'], resolve);
      },
      meta: {
        title: '共轨之家|本期特训详情'
      }
    }, {
      name: 'currentPeriodCost',
      path: '/v2/lectureRoom/current/cost',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/cost.vue'], resolve);
      },
      meta: {
        title: '共轨之家|本期特训报名'
      }
    }, {
      name: 'currentPeriodPay',
      path: '/v2/business/pay/cost',
      component (resolve) {
        require(['../pages/lectureRoom/scoop/order.vue'], resolve);
      },
      meta: {
        title: '共轨之家|本期特训报名支付'
      }
    }, {
      name: 'memberCenter',
      path: '/v2/member/center',
      component (resolve) {
        require(['../pages/memberCenter/personal/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|个人中心'
      }
    }, {
      name: 'memberPersonalInfo',
      path: '/v2/member/personal/info',
      component (resolve) {
        require(['../pages/memberCenter/personal/member/memberInfo.vue'], resolve);
      },
      meta: {
        title: '共轨之家|个人信息'
      }
    }, {
      name: 'memberMyOrder',
      path: '/v2/business/pay/orderList',
      component (resolve) {
        require(['../pages/memberCenter/personal/order/orderList.vue'], resolve);
      },
      meta: {
        title: '共轨之家|我的订单'
      }
    }, {
      name: 'memberOrderDetail',
      path: '/v2/business/pay/peyOrder',
      component (resolve) {
        require(['../pages/memberCenter/personal/order/order.vue'], resolve);
      },
      meta: {
        title: '共轨之家|订单详情'
      }
    }, {
      name: 'memberAddress',
      path: '/v2/member/center/per/address',
      component (resolve) {
        require(['../pages/memberCenter/personal/address/addressManager.vue'], resolve);
      },
      meta: {
        title: '共轨之家|地址管理'
      }
    }, {
      name: 'memberAddressChange',
      path: '/v2/member/center/per/addressChange',
      component (resolve) {
        require(['../pages/memberCenter/personal/address/addressManagerChange.vue'], resolve);
      },
      meta: {
        title: '共轨之家|添加地址'
      }
    }, {
      name: 'memberMyGift',
      path: '/v2/member/center/per/myGift',
      component (resolve) {
        require(['../pages/memberCenter/personal/gift/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|我的礼品'
      }
    }, {
      name: 'memberGrowUp',
      path: '/v2/member/center/per/growUp',
      component (resolve) {
        require(['../pages/memberCenter/personal/growUp/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|成长经历'
      }
    }, {
      name: 'memberStore',
      path: '/v2/member/center/per/store',
      component(resove){
        require(['../pages/memberCenter/personal/store/storeInfo.vue'], resove)
      },
      meta: {
        title: '共轨之家|门店信息'
      }

    }, {
      name: 'memberStoreNature',
      path: '/v2/member/center/per/store/nature',
      component(resove){
        require(['../pages/memberCenter/personal/store/nature.vue'], resove)
      },
      meta: {
        title: '共轨之家|门店性质'
      }

    }, {
      name: 'memberBusinessScope',
      path: '/v2/member/center/per/store/businessScope',
      component(resove){
        require(['../pages/memberCenter/personal/store/businessScope.vue'], resove)
      },
      meta: {
        title: '共轨之家|业务范围'
      }

    }, {
      name: 'memberCollecter',
      path: '/v2/member/center/per/collection',
      component (resolve) {
        require(['../pages/memberCenter/personal/collection/collecter.vue'], resolve);
      },
      meta: {
        title: '共轨之家|我的收藏'
      }
    }, {
      name: 'memberCoupon',
      path: '/v2/member/center/per/coupon',
      component (resolve) {
        require(['../pages/memberCenter/personal/coupon/couponer.vue'], resolve);
      },
      meta: {
        title: '共轨之家|我的优惠券'
      }
    }, {
      name: 'memberRenew',
      path: '/v2/member/center/per/renew',
      component (resolve) {
        require(['../pages/memberCenter/personal/renew/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|会员续费'
      }
    }, {
      name: 'memberIntegral',
      path: '/v2/member/center/per/intergal/memberIntegral',
      component (resolve) {
        require(['../pages/memberCenter/personal/intergal/memberIntegral.vue'], resolve);
      },
      meta: {
        title: '共轨之家|我的积分'
      }
    }, {
      name: 'memberRenewSuccess',
      path: '/v2/member/center/per/renew/success',
      component (resolve) {
        require(['../pages/memberCenter/personal/address/addressExclusiveManager.vue'], resolve);
      },
      meta: {
        title: '共轨之家|认证续费'
      }
    }, {
      name:'cyclopeIndex',
      path: '/v2/cycLopeDia/index',
      component (resolve) {
        require(['../pages/cyclopedia/index.vue'], resolve);
      },
      meta: {
        title: '共轨之家|电喷百科'
      }
    },{
      name:'cyclopeResult',
      path: '/v2/cycLopeDia/result',
      component (resolve) {
        require(['../pages/cyclopedia/resultList.vue'], resolve);
      },
      meta: {
        title: '共轨之家|电喷百科'
      }
    },{
      name:'login',
      path: '/v2/login',
      component (resolve) {
        require(['../pages/memberCenter/login.vue'], resolve);
      },
      meta: {
        title: '共轨之家|登录'
      }
    },{
      path: '/v2/quickPage',
      component (resolve) {
        require(['../pages/quickPage.vue'], resolve);
      },
      meta: {
        title: '共轨之家|快捷页面'
      }
    }, {
      path: '*',
      //redirect: '/v2/datum/datumSearch?checkIndex=0'
      //redirect: '/v2/faultCode/index'
      //redirect: '/v2/lectureRoom'
      //redirect: '/v2/member/center'
      //redirect: '/v2/soso/universal'
      //redirect: '/v2/index'
      redirect: '/v2/member/center'
    }
  ]
})
