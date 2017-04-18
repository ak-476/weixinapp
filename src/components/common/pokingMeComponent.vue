<template>
  <div style="padding: 10px;">
    <a href="https://mp.weixin.qq.com/s?__biz=MzA3NDM2ODIzMQ==&mid=2712522832&idx=3&sn=b17a0f88b300766c70201b2457b70ebc&chksm=bb59a5d88c2e2cced7c71bf79af392108d063a2b8d693fadea195af63db2e7a9eaba178bedb6&mpshare=1&scene=1&srcid=0206INdCnjfk6eg9Z1YanttK&key=28c3d7b9cfd22ffb2452d9209d73d1b1a095e3ad9c4b375d78a61933028b78ba2d4d29b20d6f7dade2dcfac66ed7b2f2a73e8352495796495fc7b5f1db66e474b5a890ea9825a17c891cc77df138fc5c&ascene=0&uin=MjgxNTU1MDI4NA%3D%3D&devicetype=iMac+MacBookPro11%2C5+OSX+OSX+10.12.3+build(16D32)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=FJsRoKSvuIYWXdcl8APEoWfgN%2FZJ50QR%2Bv9qkhpGHQfJ7ZiEX3ueAXxZGovoUY0y">
      <img alt="" src="../../assets/images/buying/poking_me_04.gif" width="100%"/>
    </a>
  </div>
</template>

<script>
  export default{
    name: 'PokingMeComponent',
    data(){
      return {
        msg: 'hello vue',
        gift: true
      }
    },

    created() {
      let date1 = new Date(Date.parse("2017-1-26 23:59:59".replace(/-/g, "/")));
      let date2 = new Date();

      if (date2 > date1) {
        this.gift = false;
      }


    }


  }
</script>
