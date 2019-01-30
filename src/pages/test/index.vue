<template>
  <!--@touchstart="tchStart" @touchend="tchEnd" @touchmove="tchMove" :class="{'tstbg':navState}"-->
  <div class="container">
    <!--<image src="https://www.woyue.com/xcximg/img_chunjie_banner.png" mode="widthFix"></image>-->
    <!--<movable-area style="height: 200px;width: 200px;background: red;">-->

      <!--&lt;!&ndash;蓝色任意方向拖动的内容&ndash;&gt;-->
      <!--<movable-view direction="all" style="height: 50px; width: 50px; background: blue;">-->
      <!--</movable-view>-->

      <!--&lt;!&ndash;黄色只能横向拖动的内容&ndash;&gt;-->
      <!--<movable-view direction="vertical" style="height: 20px; width: 50px; background: yellow;">-->
      <!--</movable-view>-->

    <!--</movable-area>-->





    <!--<div class="aaa">-->

    <!--</div>-->
    <!--<ul>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
      <!--<li>aaaaaaaa</li>-->
    <!--</ul>-->



    <div class="tsinfo">

      <form report-submit="true" @submit="subInfo">
        <button form-type="submit">Submit</button>
      </form>

    </div>




  </div>
</template>

<script>
export default {
  name: "test",
  data () {
    return {
      msg: 'test',
      navState: false,
      tStart: 0,
      tMove: 0,
      tEnd: 0,
      tempObj:{}
    }
  },
  onLoad(){

    // let tmpImg = 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg'
    // ctx.drawImage(tmpImg, 50, 50, 20, 20)
  },
  methods: {

    //form 表单
    subInfo(e){
      this.tempObj.name = 'aaaa'
      console.log(e)
      console.log(e.mp.detail.value)
      console.log('=========formId=======')
      console.log(e.mp.detail.formId)
      console.log(this.tempObj)
    },


    clearData(){
      wx.clearStorage()
      wx.clearStorageSync()
    },
    /**
     * 触摸开始
     */
    tchStart(e){
      console.log('start')
      console.log(e.clientY)
      this.tStart = e.clientY
    },
    /**
     * 滑动事件
     */
    tchMove(e){
      if(this.tStart - e.clientY >= 60){
        console.log(e.clientY)
        this.navState = true
      }else{
        this.navState = false
      }
    },
    /**
     * 触摸结束
     */
    tchEnd(){
      console.log('end')
    },
  }
}
</script>


<style scoped>
.container{overflow-y:auto;}
.tstbg{background-color:#fff !important;}
.aaa{position:absolute; top:0px; left:0px; width:100%; height:40px; z-index:10;}
ul{list-style:none;}
ul li{height:100px;}


.tsinfo{position:relative; width:100%; height:300px; background-color:steelblue;}
</style>
