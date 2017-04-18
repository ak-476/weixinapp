import hostConfig from './host.config';

const HOSTOLD = hostConfig.config.hostOld;
const HOSTOLDWX = hostConfig.config.hostOld2;
const HOST = hostConfig.config.hostApi;
const HOSTCOMMON = hostConfig.config.hostCommon;

//校验session
const POST_WXAUTH_CHECK_SESSION = HOSTCOMMON + 'checkSession.json';

//获取APPID
const POST_WXAUTH_GET_APPID = HOSTCOMMON + 'getCommonrailAppId.json';

//获取验证码
const POST_WXAUTH_VERIFY_CODE = HOST + 'authImage';

//获取手机短信验证码
const POST_WXAUTH_PHONE_NOTE = HOST + 'member/sendMsg.json';

//获取用户状态
const POST_USER_STATUS = HOST + 'getUserStatus.json';

//支付请求
const POST_WXAUTH_PAY = HOST + 'wx/getPayJsParameter.json';

//对比验证码
const POST_WXAUTH_CHECK_VERITY_CODE = HOST + 'ajaxCheckVerifyCode.json';

//获取图片
const POST_WXAUTH_SLY_YOU = HOST + 'getDeskey.json';

//检查是否需要验证码
const POST_WXAUTH_USER_LOG = HOST + 'ajaxUserLog.json';

//添加收藏
const POST_COLLECTION_SAVE = HOST + 'fav/saveUserFavorite.json';

//取消收藏
const POST_COLLECTION_CANCEL = HOST + 'fav/cancelUserFavorite.json';

//查询测试数据
const POST_SOSO_TEST_DATA = HOST + 'testData/query.json';

//垫片调整
const POST_SOSO_GASKET = HOST + 'gasketAdjust/query.json';

//校验是否需要支付年费会员
const POST_MEMBER_SCOPE = HOST + 'training/verifyNeedPayYearFee.json';

/**
 * 故障代码
 */
//故障码分页查询
const POST_FALT_CODE_LIST = HOST + 'faltCode/searchPage.json';

//故障码详情页
const POST_FALT_CODE_DETAIL = HOST + 'faltCode/getDetail.json';


/**
 * 共轨搜搜
 */
const  POST_FALT_CODE_SOSO = HOST +'soso/searchPage.json'

/**
 * 系统部件
 */
//部件信息查询
const POST_PARTS_INFO_GET = HOST + 'partsInfo/queryDetail.json';

//OHK查询
const POST_PARTS_OHK_INFO = HOST + 'partsInfo/getDetail.json';

//获取发动机厂商
const POST_PARTS_INFO_ENGINE = HOST + 'partsInfo/getEngineCompany.json';

//获取发动机型号
const POST_PARTS_INFO_ENGINENO = HOST + 'partsInfo/getEngineNo.json';

//根据发动机型号 获取结果
const POST_PARTS_INFO_ENGINE_RESULT = HOST + 'partsInfo/getEngineResult.json';

/**
 * 资料大全
 */
//获取logo
const POST_DATAUM_LOGO = HOST + 'datashare/searchDataTree.json';

//资料共享数据
const POST_DATAUM_LIST = HOST + 'datashare/queryDataFiles.json';

/**
 * 共轨讲堂
 */
//往期特训
const POST_LECTURE_ROOM_SHARE = HOST + 'training/getNewsArticleList.json';

//本期特训
const POST_LECTURE_ROOM_CURRENT = HOST + 'training/getStationList.json';

//获取站点详情
const POST_LECTURE_ROOM_DETAIL = HOST + 'training/getStationDetail.json';


// 评价建议
const POST_LECTURE_ROOM_ADVICE = HOST +'training/getEvaluate.json'

//创建订单
const POST_LECTURE_ROOM_CREATE_ORDER = HOST + 'training/createOrder.json';

//校验是否已报名某站点
const POST_LECTURE_ROOM_CHECK_SHARE = HOST + 'training/verifyStationSigned.json';

//精品课件列表
const POST_LECTURE_ROOM_COURSEWARE = HOST + 'training/getCourseList.json';

// 精品课件权限检测
const POST_LECTURE_ROOM_COURSESTATU = HOST + 'training/verifyCanViewCourse.json';
/**
 * 会员中心
 */
//获取未完成订单，及未领取礼品数量
const POST_MEMBER_PERSONAL_MSG_COUNT = HOST + 'member/noOkOrderGiftNum.json';

//校验验证码
const POST_MEMBER_PERSONAL_CHECK_CODE = HOST + 'member/checkCode.json';

//查询各功能使用次数
const POST_MEMBER_PERSONAL_USE_COUNT = HOST + 'member/myStatistical.json';

//个人中心-获取个人信息
const POST_MEMBER_PERSONAL_INFO = HOST + 'member/userinfo.json';

//修改用户信息
const POST_MEMBER_PERSONAL_SAVE = HOST + 'member/saveUserInfo.json';

//修改信息第二次验证
const POST_MEMBER_PERSONAL_SAVE_WXAUTH = HOST + 'member/wxauth.json';

//订单列表
const POST_MEMBER_PERSONAL_ORDER_LIST = HOST + 'member/orderList.json';

//订单详情
const POST_MEMBER_PERSONAL_ORDER_DETAIL = HOST + 'member/orderDetail.json';

// 取消订单
const POST_MEMBER_PERSONAL_CANCEL_ORDER = HOST + 'member/cancelOrder.json';

//获取地址
const POST_MEMBER_PERSONAL_ADDRESS = HOST + 'member/findShippingAddressList.json';

//获取门店地址
const POST_MEMBER_PERSONAL_STORE_ADDRESS = HOST + 'member/findStoreAddress.json';

//保存门店地址
const POST_MEMBER_PERSONAL_STORE_ADDRESS_SAVE = HOST + 'member/saveStoreAddress.json';

//保存地址
const POST_MEMBER_PERSONAL_ADDRESS_ADD = HOST + 'member/saveShippingAddress.json';

// 地址详情
const POST_MEMBER_PERSONAL_ADDRESS_detail = HOST + 'member/findShippingAddressById.json';


//删除地址
const POST_MEMBER_PERSONAL_ADDRESS_DEL = HOST + 'member/delShippingAddress.json';

//获取礼品
const POST_MEMBER_PERSONAL_GET_GIFT = HOST + 'member/myGift.json';

//会员续费
const POST_MEMBER_PERSONAL_GET_JS_PARAMETER = HOST + 'wx/getJsParameter.json';

// 获取用户优惠券信息
const POST_MEMBER_PERSONAL_GET_JS_LOTTERY = HOST + 'wx/getLotteryRecord.json';

// 我的收藏
const POST_MEMBER_PERSONAL_COLLECT = HOST +'fav/searchPage.json';

// 优惠券
const POST_MEMBER_PERSONAL_COUPON = HOST +'coupon/searchList.json';

//门店基本信息
const POST_MEMBER_PERSONAL_STORES = HOST + 'storeInfo/getDetail.json';

//保存门店基本信息
const POST_MEMBER_PERSONAL_STORES_SAVE = HOST + 'storeInfo/saveStoreInfo.json';

//获取门店性质
const POST_MEMBER_PERSONAL_STORE = HOST + 'storeInfo/getStoreNature.json';

//获取用户保存门店性质
const POST_MEMBER_PERSONAL_STORE_USER = HOST + 'storeInfo/getUserStoreNature.json';

//保存门店性质
const POST_MEMBER_PERSONAL_STORE_SAVE = HOST + 'storeInfo/saveUserStoreNature.json';

//获取业务范围
const POST_MEMBER_PERSONAL_STORES_BUSINESS = HOST + 'storeInfo/getProject.json';

// 获取用户保存业务范围
const POST_MEMBER_PERSONAL_STORES_BUSINESS_SAVE = HOST + 'storeInfo/getUserProject.json';

//获取门店信息照片
const POST_MEMBER_PERSONAL_STORES_IMG = HOST + 'storeInfo/getUserImgs.json';

//保存门店信息照片
const POST_MEMBER_PERSONAL_STORES_IMG_SAVE = HOST + 'storeInfo/saveStoreImg.htm';

//每日签到
const POST_MEMBER_PERSONAL_DAILY_SINGIN = HOST + 'member/sign.json';

//检查每日签到
const POST_MEMBER_PERSONAL_DAILY_SINGIN_CHECK = HOST + 'member/checkSign.json';

//获取客服
const POST_MEMBER_PERSONAL_EXCLUSIVE = HOST + 'member/exclusive.json';

//获取技能测试
const POST_SKILLS_TEST = HOST + 'member/myCert.json';

//电喷百科获取文章列表
const POST_ELECT_ARTICLE_LIST = HOST + 'article/getArticleList.json'

//电喷百科获取百科目录
const POST_ELECT_ARTICLE_CATALOGUELIST = HOST + 'article/getCatalogueList.json'

//电喷百科搜索文章
const POST_ELECT_ARTICLE_SEARCHLIST = HOST + 'article/searchArticleList.json'

/**
 * 内置
 */
//const GET_WXSDK_CONFIG = HOSTOLD + 'ajaxmgiftactivesave.json';

//获取sdk
const POST_COMMON_WXSDK_CONFIG = HOSTCOMMON + 'getCommonrailJsSdkConfig.json';

//获取用户SESSION
const POST_COMMON_GET_SEESION = HOSTCOMMON + 'getCommonrailSession.json';


/**
 * URL 参数
 * @type {string}
 */
const POST_URL_PARAMS_CURR_ORDER = 'POST_URL_PARAMS_CURR_ORDER';

const LOCAL_STORAGE_AUTH_LOGIN_FLAG = 'AUTH_LOGIN_FLAG';






export default {
  HOST,
  HOSTOLD,
  HOSTOLDWX,
  HOSTCOMMON,
  POST_WXAUTH_CHECK_SESSION,
  POST_WXAUTH_GET_APPID,
  POST_USER_STATUS,
  POST_WXAUTH_VERIFY_CODE,
  POST_WXAUTH_CHECK_VERITY_CODE,
  POST_WXAUTH_USER_LOG,
  POST_WXAUTH_PHONE_NOTE,
  POST_WXAUTH_PAY,
  POST_WXAUTH_SLY_YOU,
  POST_SOSO_TEST_DATA,
  POST_SOSO_GASKET,
  POST_FALT_CODE_LIST,
  POST_PARTS_INFO_GET,
  POST_FALT_CODE_DETAIL,
  POST_PARTS_INFO_ENGINE,
  POST_PARTS_INFO_ENGINENO,
  POST_PARTS_INFO_ENGINE_RESULT,
  POST_PARTS_OHK_INFO,
  POST_DATAUM_LOGO,
  POST_DATAUM_LIST,
  POST_LECTURE_ROOM_SHARE,
  POST_LECTURE_ROOM_CURRENT,
  POST_LECTURE_ROOM_DETAIL,
  POST_LECTURE_ROOM_COURSEWARE,
  POST_LECTURE_ROOM_CREATE_ORDER,
  POST_LECTURE_ROOM_CHECK_SHARE,
  POST_MEMBER_PERSONAL_INFO,
  POST_MEMBER_PERSONAL_SAVE,
  POST_MEMBER_PERSONAL_SAVE_WXAUTH,
  POST_MEMBER_PERSONAL_ORDER_LIST,
  POST_MEMBER_PERSONAL_ORDER_DETAIL,
  POST_MEMBER_PERSONAL_ADDRESS_detail,
  POST_COMMON_GET_SEESION,
  POST_LECTURE_ROOM_COURSESTATU,
  POST_COMMON_WXSDK_CONFIG,
  POST_MEMBER_PERSONAL_ADDRESS,
  POST_MEMBER_PERSONAL_ADDRESS_ADD,
  POST_MEMBER_PERSONAL_ADDRESS_DEL,
  POST_MEMBER_PERSONAL_GET_GIFT,
  POST_MEMBER_PERSONAL_MSG_COUNT,
  POST_MEMBER_PERSONAL_CHECK_CODE,
  POST_MEMBER_PERSONAL_USE_COUNT,
  POST_MEMBER_PERSONAL_CANCEL_ORDER,
  POST_MEMBER_PERSONAL_GET_JS_PARAMETER,
  POST_MEMBER_PERSONAL_GET_JS_LOTTERY,
  POST_MEMBER_SCOPE,
  POST_FALT_CODE_SOSO,
  POST_LECTURE_ROOM_ADVICE,
  POST_COLLECTION_SAVE,
  POST_COLLECTION_CANCEL,
  POST_URL_PARAMS_CURR_ORDER,
  LOCAL_STORAGE_AUTH_LOGIN_FLAG,
  POST_MEMBER_PERSONAL_COLLECT,
  POST_MEMBER_PERSONAL_COUPON,
  POST_MEMBER_PERSONAL_STORE,
  POST_MEMBER_PERSONAL_STORES,
  POST_MEMBER_PERSONAL_STORES_SAVE,
  POST_MEMBER_PERSONAL_STORES_BUSINESS,
  POST_MEMBER_PERSONAL_STORE_USER,
  POST_MEMBER_PERSONAL_STORE_SAVE,
  POST_MEMBER_PERSONAL_STORES_BUSINESS_SAVE,
  POST_MEMBER_PERSONAL_STORES_IMG,
  POST_MEMBER_PERSONAL_STORES_IMG_SAVE,
  POST_MEMBER_PERSONAL_DAILY_SINGIN,
  POST_MEMBER_PERSONAL_EXCLUSIVE,
  POST_MEMBER_PERSONAL_DAILY_SINGIN_CHECK,
  POST_MEMBER_PERSONAL_STORE_ADDRESS,
  POST_MEMBER_PERSONAL_STORE_ADDRESS_SAVE,
  POST_SKILLS_TEST,
  POST_ELECT_ARTICLE_LIST,
  POST_ELECT_ARTICLE_CATALOGUELIST,
  POST_ELECT_ARTICLE_SEARCHLIST
}

