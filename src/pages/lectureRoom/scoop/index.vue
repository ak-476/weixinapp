<template>
  <div style="background: #ededed;overflow: hidden;min-height: 100%;">
    <div style="background: #ededed;min-height: 100%;">
      <ul class="list_style2" style="margin-top: 10px">
        <li class="benqi">
          <router-link :to="{name: 'currentPeriodList'}">
            本期特训
            <span>点击报名</span>
          </router-link>
        </li>
        <li class="wangqi">
          <router-link :to="{name: 'share'}">
            往期特训
          </router-link>
        </li>
        <li class="jingpin">
          <a>
            <router-link :to="{name: 'courseWare'}">
              精品课件
            </router-link>

          </a>
        </li>
      </ul>
      <ul class="list_style2">
        <li class="diankong">
          <a @click="diankongClick()">
            电控基础
          </a>
        </li>
        <li class="rumen">
          <a>
            <router-link :to="{name: 'advice'}">
              评价建议
            </router-link>

          </a>
        </li>
        <li class="jianyi">
          <a :href="_Api.HOSTOLD + '/wxauth/train.htm'">
            入门培训
          </a>
        </li>
      </ul>
      <ul class="list_style2">
        <li class="ceping">
          <a :href="_Api.HOSTOLD + '/wxauth/skillAssess/start.htm'">
            技能测评
            <span>获取共轨之家认证技能证书</span>
          </a>
        </li>
         <li class="smallGui">
           <a>
             <router-link :to="{name: 'dynamicCondition'}">
               小轨动态
             </router-link>

           </a>
         </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return {
//        result: {},
//        benqiShow: false
      }
    },
    mounted(){
      let that = this;
//      that._Util.post(that._Api.POST_LECTURE_ROOM_CURRENT,{},(data) => {
//        that.result = data;
//        if(that.result.length > 0){
//          that.benqiShow = true;
//        } else {
//          that.benqiShow = false;
//        }
//      },() => {
//
//      },that)

    },
    methods:{
      diankongClick(){
        let that = this;
        that._Util.post(that._Api.POST_USER_STATUS,{},(data) => {
          if(data.userStatus == 0){
            that._Util.showMsgBoxConfirm('对不起，只有认证会员才能查看！您还未认证，请您先完成认证！', action => {
              if (action) {
                window.location.href = '/v2/business/pay/certificationRenewal';
              }
            });
          } else {
            window.location.href = that._Api.HOSTOLD + '/wxauth/commonRailForumList.htm?termId=83';
          }
        },()=>{

        },that, false)
      }

    },
    components: {

    }
  }
</script>
