<template>
  <div class="container">
    <div class="atv-bg"><image src="https://www.woyue.com/vdimg/bg_main_big.png" mode="widthFix"></image></div>
    <div class="atv-share"><button open-type="share">转发朋友</button></div>
    <scroll-view scroll-y class="scroll-view">
    <div class="atv-box">
      <p class="act-logo-p">
        <image src="https://www.woyue.com/xcximg/btn_chunjie_logo.png" mode="widthFix"></image>
      </p>

      <!--<image class="lantern-img" src="https://www.woyue.com/xcximg/img_chunjie_lantern.png" mode="widthFix"></image>-->

      <div class="atv-djs" v-if="cdDays > 0">
        <image src="https://www.woyue.com/vdimg/img_chunjie_text1_1.png" mode="widthFix"></image>
        <label class="countdown-day">{{cdDays}}</label>
        <image class="atv-djs-img" src="https://www.woyue.com/vdimg/img_chunjie_text2.png" mode="widthFix"></image>
      </div>
      <div class="atv-djs" v-if="cdDays <= 0">
        <div class="hpby"><image src="https://www.woyue.com/xcximg/img_chunjie_text3.png" mode="widthFix"></image></div>
      </div>

      <div class="avt-ctn-box">
        <image src="https://www.woyue.com/vdimg/img_chunjie_banner.png" mode="widthFix"></image>
        <div class="avt-yue-sm">
          <p>
            <i class="point"></i>
            每逢佳节倍催婚，约个女(男)朋友
            <br/>一起过-情人节。
          </p>
          <p><i class="point"></i>通过微信活动发起你的邀约，委婉表白，避免尴尬。</p>
          <p><i class="point"></i>将你的邀约链接分享到朋友圈或微信群，也许有意想不到的TA</p>
          <p class="avt-yue-sm-by-p"><label class="avt-yue-sm-by">愿意和你一起过-情人节</label></p>
        </div>
      </div>

      <!--isAtv2-->
      <div class="avt-btn-box">
        <navigator hover-class="none" url="../atvme/main?zj=0" v-if="isAtv2">
          <image src="https://www.woyue.com/xcximg/btn_chunjie_ilook.png" mode="widthFix"></image>
        </navigator>
        <navigator hover-class="none" url="../atvcreate/main?zj=0" v-else>
          <image v-if="userInfos.gender == 1" src="https://www.woyue.com/xcximg/btn_chunjie_ifemale.png" mode="widthFix"></image>
          <image v-else-if="userInfos.gender == 2" src="https://www.woyue.com/xcximg/btn_chunjie_iman.png" mode="widthFix"></image>
          <image v-else src="https://www.woyue.com/xcximg/btn_chunjie_iobject.png" mode="widthFix"></image>
        </navigator>
        <!--<navigator url="../atvme/main?zj=1"><image src="https://www.woyue.com/xcximg/btn_chunjie_ilook.png" mode="widthFix"></image></navigator>-->
        <navigator hover-class="none" v-if="isAtv" url="../atvme/main?zj=1"><image src="https://www.woyue.com/xcximg/btn_chunjie_look.png" mode="widthFix"></image></navigator>
        <navigator hover-class="none" v-else url="../atvcreate/main?zj=1"><image src="https://www.woyue.com/xcximg/btn_chunjie_imy.png" mode="widthFix"></image></navigator>
      </div>

      <!--<p class="download-prompt">redirectTo点击查看更多约局活动或下载我约APP加下划线</p>-->
      <navigator url="../home/main" hover-class="none" open-type="redirect" class="download-prompt">点击查看更多约局活动或下载我约APP</navigator>
    </div>
    </scroll-view>
    <Isreg @myevent="onMyevent" :is-loading="isLoadingShow" />
  </div>
</template>

<script>
import '../../../static/activity/css/main.css'
import Isreg from '../../components/Isreg.vue'
import { userLoadings } from '../../../static/js/Landing'
import { baseUrl, basePath }  from '../../../static/js/httpUrl'
import { actJudge } from '../../../static/js/judgeLogin'
export default {
  components: {Isreg:Isreg},
  template: '<Isreg/>',
  data () {
    return {
      msg: '活动首页',
      isLoadingShow: false,
      userInfos:{},
      isAtv:false,
      isAtv2:false,
      cdDays:0,
      genderStr:'女朋友',
      inviter:0
    }
  },
  onLoad(opt){
    wx.setStorageSync('avtlogin',1)
    wx.setNavigationBarTitle({
      title: '约个朋友一起过-情人节'
    })
    wx.showLoading({ title: '加载中', mask: false })
    if(wx.getStorageSync('token')){
      this.isLoadingShow = false
      actJudge(wx,(isls)=>{
        if(isls){
          this.isLoadingShow = true
        }else{
          this.isLoadingShow = false
        }
      })
      if(wx.getStorageSync('userinfos')){
        this.userInfos = wx.getStorageSync('userinfos')
        if(wx.getStorageSync('userinfos').gender == 1){
          this.genderStr = '女朋友'
        }else if(wx.getStorageSync('userinfos').gender == 2){
          this.genderStr = '男朋友'
        }else{
          this.genderStr = '对象'
        }

        if(wx.getStorageSync('atvcreat') && wx.getStorageSync('atvcreat') != ''){
          this.isAtv = true
        }else{
          this.atvIndexReq(255)
        }
        if(wx.getStorageSync('atvcreat256') && wx.getStorageSync('atvcreat256') != ''){
          this.isAtv2 = true
        }else{
          this.atvIndexReq(256)
        }

        wx.hideLoading()
      }else{
        this.isLoadingShow = true
        wx.hideLoading()
      }
    }else{
      this.isLoadingShow = true
      wx.hideLoading()
    }
    if(opt.inviter){
      this.inviter = opt.inviter
      wx.setStorageSync('inviter',opt.inviter)
    }
    this.newYear()
  },
  onUnload(){
    /*wx.navigateBack({
      url: '../home/main'
    })*/
  },
  onShow(){
    if(parseInt(wx.getStorageSync('fb')) == 0){
      if(wx.getStorageSync('atvcreat') && wx.getStorageSync('atvcreat') != ''){
        this.isAtv = true
      }else{
        this.atvIndexReq(255)
      }
      if(wx.getStorageSync('atvcreat256') && wx.getStorageSync('atvcreat256') != ''){
        this.isAtv2 = true
      }else{
        this.atvIndexReq(256)
      }
    }
    wx.removeStorage({
      key: 'atvedit',
      success(res) {}
    })
    wx.removeStorage({
      key: 'fb',
      success(res) {}
    })
  },
  methods: {
    onMyevent(e){
      if(this.inviter != 0){
        wx.setStorageSync('inviter',this.inviter)
      }
      let $this = this
      if(e){
        userLoadings(wx,baseUrl,basePath,(res)=>{
          if(res){
            if(wx.getStorageSync('token')){
              $this.isLoadingShow = false

              $this.userInfos = wx.getStorageSync('userinfos')
              if(wx.getStorageSync('userinfos').gender == 1){
                $this.genderStr = '女朋友'
              }else if(wx.getStorageSync('userinfos').gender == 2){
                $this.genderStr = '男朋友'
              }else{
                $this.genderStr = '对象'
              }

              if(wx.getStorageSync('atvcreat') && wx.getStorageSync('atvcreat') != ''){
                $this.isAtv = true
              }else{
                $this.atvIndexReq(255)
              }
              if(wx.getStorageSync('atvcreat256') && wx.getStorageSync('atvcreat256') != ''){
                $this.isAtv2 = true
              }else{
                $this.atvIndexReq(256)
              }



            }else{
              $this.isLoadingShow = true
            }
          }
        })
      }else{
        // this.adactav = []
      }
    },
    atvIndexReq(num){
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA')
      let $this = this
      wx.request({ //查询活动信息
        method: 'POST',
        url: ''+baseUrl+''+basePath.atvinfo+'',
        data: {id:wx.getStorageSync('uid'),idtype:1,tp:num},
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('=-=====约局信息查询=======')
          console.log(wx.getStorageSync('uid'))
          console.log(res)
          if(parseInt(num) == 255){
            if(res.data.status == 0){
              if(res.data.data.length > 0){
                wx.setStorageSync('atvcreat', res.data.data[0].id)
                $this.isAtv = true
              }else{
                $this.isAtv = false
              }
            }
          }
          if(parseInt(num) == 256){
            if(res.data.status == 0){
              if(res.data.data.length > 0){
                wx.setStorageSync('atvcreat256', res.data.data[0].id)
                $this.isAtv2 = true
              }else{
                $this.isAtv2 = false
              }
            }
          }
          console.log('000000000000000000000000000000')
          console.log($this.isAtv)
          console.log($this.isAtv2)
        },
        fail(){
          // wx.showLoading()
        }
      })
    },
    newYear(){
      let nowDate = Date.parse(new Date())
      let strtime = '2019-02-14 00:00:00'
      let nYear = new Date(strtime.replace(/-/g, '/')).getTime()
      let val = nYear - nowDate
      let days = val / (1000 * 60 * 60 * 24)
      this.cdDays = parseInt(days)
    }
  },
  /**
   * 转发
   * @param res
   * @returns {{title: string, path: string, imageUrl: string}}
   */
  onShareAppMessage(res){
    var $this = this
    if(res.from == 'button'){
      console.log(res.target)
    }
    return {
      title: '距离情人节还有'+this.cdDays+'天，约个女(男)朋友一起过节。',
      path: 'pages/atvindex/main?inviter='+wx.getStorageSync('uid')+'',
      imageUrl: 'https://www.woyue.com/vdimg/img_share_wechat.png',
      success(re){
        //在页面onLoad()实践中实现接口  onLoad(opt)
        wx.showShareMenu({
          //返回分享目标信息
          withShareTicket: true
        })
      }
    }
  }
}
</script>


<style scoped>
.container{background-color:#A32646;}
.scroll-view{position:relative; width:100%; height:100%; padding-bottom:0px !important;}
.avt-yue-sm{color:#DF205C; bottom:22px;}
label.avt-yue-sm-by{background-color:#DF205C;}
.avt-yue-sm>p{position:relative;}
.avt-yue-sm>p>i.point{position:absolute; width:5px; height:5px; top:5px; left:5px; border-radius:50%; background-color:#DF205C;}
.avt-ctn-box{margin-top:-53px; z-index:1;}
.atv-djs{z-index:2;}label.countdown-day{position:relative; z-index:2;}
.atv-djs image{position:relative; z-index:2;}
</style>
