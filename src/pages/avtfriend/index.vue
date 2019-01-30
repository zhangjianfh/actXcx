<template>
  <div class="container">
    <div class="atv-bg"><image src="https://www.woyue.com/vdimg/bg_main_big.png" mode="widthFix"></image></div>
    <div class="atv-share" v-if="!isMe"><button open-type="share">转发朋友</button></div>
    <div class="atv-share" v-else><button @tap="atvNav">活动首页</button></div>
    <scroll-view scroll-y class="scroll-view">
    <div class="atv-box">
      <p class="act-logo-p">
        <image src="https://www.woyue.com/xcximg/btn_chunjie_logo.png" mode="widthFix"></image>
      </p>

      <div class="atv-chooseImage">
        <div class="atv-avatar-box">
          <image :src="avtInfo.avatar" mode="widthFix"></image>
        </div>
      </div>

      <div class="atv-select">
        <div class="atv-select-b">
          <!--<image src="https://www.woyue.com/xcximg/bg_chunjie_username.png" mode="widthFix"></image>-->
          <div class="atv-select-box">
            <label class="nickname-box">{{avtInfo.name}}</label>
            <image v-if="avtInfo.uidgender == 1" src="https://www.woyue.com/xcximg/icon_chunjie_man.png" mode="widthFix"></image>
            <image v-if="avtInfo.uidgender == 2" src="https://www.woyue.com/xcximg/icon_chunjie_woman.png" mode="widthFix"></image>
          </div>
        </div>
      </div>

      <div class="recruit-y">
        <div class="recruit-y-1" v-if="avtInfo.tp == 255">
          <hr />
          <label v-if="avtInfo.uidgender == 1">男</label>
          <label v-else-if="avtInfo.uidgender == 2">女</label>
          <label>友</label>
          <label>出</label> <label>租</label>
          <hr />
        </div>
        <div class="recruit-y-1" v-else>
          <hr />
          <label v-if="avtInfo.uidgender == 1">女</label>
          <label v-else-if="avtInfo.uidgender == 2">男</label>
          <label>友</label>
          <label>招</label> <label>募</label>
          <hr />
        </div>
        <div class="recruit-y-2">
          <image src="https://www.woyue.com/vdimg/img_chunjie_lanterns.png" mode="widthFix"></image>
          <div class="recruit-y-2-1" v-if="avtInfo.tp == 255">
            <h1>本人出租</h1>
            <h4 class="bnew">一起过-情人节</h4>
          </div>
          <div class="recruit-y-2-1" v-if="avtInfo.tp == 256">
            <h1 v-if="avtInfo.uidgender == 1">约个女友</h1>
            <h1 v-else-if="avtInfo.uidgender == 2">约个男友</h1>
            <h4>一起过-情人节</h4>
          </div>
        </div>
        <div class="recruit-info">
          <image src="https://www.woyue.com/xcximg/bg_chunjie_index.png" mode="widthFix"></image>
          <!-- inviter----》{{ivt}} ||  tp --- > {{avtInfo.tp}}-->
          <text class="ritxt">{{avtInfo.decription}}</text>
        </div>
      </div>
      <!-- v-show="isMe"-->
      <div class="add-fird" v-show="isMe">
        <image src="https://www.woyue.com/xcximg/bg_chunjie_added.png" mode="widthFix"></image>
        <div class="add-fird-info">
          <h3>已报名好友</h3>
          <p>（注: 以下报名信息仅自己可见)</p>
          <ul>
            <li v-for="(jui,index) in joinUserInfos" :key="index">
              <navigator class="avt-main" :url="'../friend/main?uid='+jui.uid+'&name='+jui.name+'&gender='+jui.gender+'&avatar='+jui.avatar+''">
                <p class="avatar-p"><image :src="jui.avatar" mode="widthFix"></image></p>
                <p class="avt-nickname">{{jui.name}}</p>
              </navigator>
            </li>
            <li v-for="(tmpJui,item) in tmpFor" :key="item" v-if="item < tmpLen">
              <navigator class="avt-main">
                <p class="avatar-p"></p>
                <p class="avt-nickname"> &nbsp; &nbsp; </p>
              </navigator>
            </li>
          </ul>
        </div>
      </div>
      <!--<p class="download-prompt">更多精彩约局请下载 我约APP</p>-->
      <navigator url="../home/main" hover-class="none" open-type="redirect" class="download-prompt">点击查看更多约局活动或下载我约APP</navigator>
    </div>
    </scroll-view>
    <div class="avt-footer" v-if="!isMe">
      <image v-if="userInfos.gender == 2" @tap="navAtv" class="footer-edit" src="https://www.woyue.com/xcximg/btn_chunjie_s-iman.png" mode="widthFix"></image>
      <image v-else class="footer-edit" @tap="navAtv" src="https://www.woyue.com/xcximg/btn_chunjie_s-ifemale.png" mode="widthFix"></image>
      <div class="rent-sta" v-if="isRent">
        <image v-if="imgState" class="footer-share" src="https://www.woyue.com/xcximg/btn_chunjie_iagree.png" mode="widthFix"></image>
        <image v-else class="footer-share" src="https://www.woyue.com/xcximg/btn_chunjie_izup.png" mode="widthFix"></image>
      </div>
      <div class="rent-sta" v-else>
        <image @tap="joinAtv(avtInfo.id,ivt)" v-if="imgState" class="footer-share" src="https://www.woyue.com/xcximg/btn_chunjie_ido.png" mode="widthFix"></image>
        <image @tap="joinAtv(avtInfo.id,ivt)" v-else class="footer-share" src="https://www.woyue.com/xcximg/btn_chunjie_irent.png" mode="widthFix"></image>
      </div>
    </div>
    <div class="avt-footer" v-else>
      <button hover-class="none" class="editbtn" @tap="navEdit"><image class="footer-edit" src="https://www.woyue.com/xcximg/btn_chunjie_btn_edit.png" mode="widthFix"></image></button>
      <button hover-class="none" class="sharebtn" open-type="share"><image class="footer-share" src="https://www.woyue.com/xcximg/btn_chunjie_sharewx.png" mode="widthFix"></image></button>
    </div>
    <!--isRent-->
    <Isreg @myevent="onMyevent" :is-loading="isLoadingShow" />
    <div class="tnop-box" v-show="tnop">
      <div class="tnop-center">
        <p class="tcp-p"><image class="footer-edit" src="https://www.woyue.com/xcximg/icon_pop_likes.png" mode="widthFix"></image></p>
        <p>有新的关注哦！</p>
        <form report-submit="true" @submit="subInfo">
          <button form-type="submit" class="form-id-sub-btn">我知道了！</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../static/activity/css/main.css'
import Isreg from '../../components/Isreg.vue'
import { userLoadings } from '../../../static/js/Landing'
import { hexMD5 }  from '../../../static/js/MD5'
import { baseUrl, basePath,imgPath }  from '../../../static/js/httpUrl'
import { uAvatar }  from '../../../static/js/userInfo'
import { actJudge } from '../../../static/js/judgeLogin'
export default {
  components: { Isreg:Isreg },
  template: '<Isreg/>',
  data () {
    return {
      msg: '招募对象',
      isLoadingShow: false,
      sArry:['男','女'],
      sexArry: [{id:1,name:'男'},{id:2,name:'女'}],
      index:0,
      recruitInfo: '要求：女，单身，活的，演技好 \n \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我妈一激动说不定还会把祖传的玉坠子送给你', //decription
      userInfos:{},
      avtInfo:{},
      userId:wx.getStorageSync('uid'),
      ivt:'',
      gid: '',
      shareStr:'',
      imgState:false,
      isRent: false,
      joinUserInfos:[],//如果是自己分享的 此处显示参加活动的好友
      tmpFor:[0,1,2,3,4],
      tmpLen:5,
      isMe: false,
      zjStr:0,
      tnop:false,
      cid:''
    }
  },
  onLoad(opt){
    wx.setStorageSync('avtlogin',1)
    // opt = {gid:139, inviter:209281}
    this.gid = opt.gid
    this.ivt = opt.inviter
    wx.setStorageSync('inviter',opt.inviter)
    this.isRent = false
    if(wx.getStorageSync('token')){
      this.isLoadingShow = false
      actJudge(wx,(isls)=>{
        if(isls){
          this.isLoadingShow = true
        }else {
          this.isLoadingShow = false
          console.log(wx.getStorageSync('userinfos'))
          this.userInfos = wx.getStorageSync('userinfos')
          this.joinUserInfos = []
          this.atvIndexReq({id:this.gid})
        }
      })
    }else{
      this.isLoadingShow = true
    }
  },
  onShow(){
    /*this.joinUserInfos = []
    this.atvIndexReq({id:this.gid})*/
  },
  methods: {
    onMyevent(e){
      wx.setStorageSync('inviter',this.ivt)
      let $this = this
      if(e){
        userLoadings(wx,baseUrl,basePath,(res)=>{
          if(res){
            if(wx.getStorageSync('token')){
              $this.isLoadingShow = false
              actJudge(wx,(isls)=>{
                if(isls){
                  $this.isLoadingShow = true
                }else{
                  $this.isLoadingShow = false
                  console.log(wx.getStorageSync('userinfos'))
                  $this.userInfos = wx.getStorageSync('userinfos')
                  $this.joinUserInfos = []
                  $this.atvIndexReq({id:this.gid})
                }
              })
            }else{
              $this.isLoadingShow = true
            }
          }
        })
      }else{
        // this.adactav = []
      }
    },
    sexSelect(e){
      this.index = e.mp.detail.value
    },
    //更新 form_id
    subInfo(e){
      console.log(e)
      console.log(e.mp.detail.value)
      console.log('=========formId=======')
      console.log(e.mp.detail.formId)
      console.log(wx.getStorageSync('uid'))
      this.tnop = false

      var updata = {}
      updata.user = {}
      updata.id = this.gid
      updata.xcx = {'form_id':e.mp.detail.formId}
      updata.user.uid = wx.getStorageSync('uid')
      updata.user.tm = Date.parse(new Date()) / 1000
      updata.user.token = hexMD5(Date.parse(new Date()) / 1000+'Token'+wx.getStorageSync('token'))
      console.log(updata)
      wx.request({ //更新form_id
        method: 'POST',
        url: ''+baseUrl+''+basePath.atvupdata+'',
        data: updata,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('更新form_id')
          console.log(res)
        },
        fail(){
          wx.hideLoading()
          wx.showToast({ title: '网络超时', icon: 'none', duration: 1500 })
        }
      })
    },

    //查询活动信息
    atvIndexReq($da){
      // wx.setStorageSync('tnop255',0)
      // wx.setStorageSync('tnop256',0)
      console.log('查询活动信息')
      console.log($da)
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.atvinfo+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('=-=====约局信息查询=======')
          console.log(res)
          console.log(res.data.data[0].tp)
          $this.isRentSta(res.data.data[0])
          $this.cid = res.data.data[0].uid
          if(res.data.data[0].tp == 255){
            $this.zjStr = 1
            $this.imgState = false
          }
          if(res.data.data[0].tp == 256){
            $this.zjStr = 0
            $this.imgState = true
          }
          $this.avtInfo = res.data.data[0]
          if($this.avtInfo.tp == 255){
            $this.shareStr = $this.avtInfo.name + '正在出租自己,陪你一起过-情人节。'
            wx.setNavigationBarTitle({
              title: '出租自己'
            })
          }else{
            if($this.avtInfo.uidgender == 1){
              $this.shareStr = $this.avtInfo.name + '想约个女朋友,一起过-情人节。'
              wx.setNavigationBarTitle({
                title: '约个女友'
              })
            }else{
              $this.shareStr = $this.avtInfo.name + '想约个男朋友,一起过-情人节。'
              wx.setNavigationBarTitle({
                title: '约个男友'
              })
            }
          }

          if(res.data.data[0].uid){}else{
            wx.showToast({ title: '网络超时重新登陆', icon: 'none', duration: 1500 })
            $this.isLoadingShow = true
          }
          console.log(parseInt(res.data.data[0].uid), parseInt(wx.getStorageSync('uid')))
          if(parseInt(res.data.data[0].uid) == parseInt(wx.getStorageSync('uid'))){
            $this.isMe = true
            if(res.data.data[0].tp == 255){
              //此处用于更新 推送的  form_id
              if(parseInt(res.data.data[0].mems.length) > parseInt(wx.getStorageSync('tnop255'))){
                $this.tnop = true
                wx.setStorageSync('tnop255',res.data.data[0].mems.length)
              }
            }
            if(res.data.data[0].tp == 256){
              // if(wx.getStorageSync('tnop256')){ //此处用于更新 推送的  form_id
              if(parseInt(res.data.data[0].mems.length) > parseInt(wx.getStorageSync('tnop256'))){
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
                $this.tnop = true
                wx.setStorageSync('tnop256',res.data.data[0].mems.length)
              }else{
                console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
                console.log(wx.getStorageSync('tnop256'))
              }
            }
          }else{
            $this.isMe = false
            // wx.setStorageSync('tnop255',0)
            // wx.setStorageSync('tnop256',0)
          }

          if(res.data.data[0].mems != 'undefined'){
            if(res.data.data[0].mems.length > 0){
              $this.meShare(res.data.data[0].mems,res.data.data[0].uid)
            }else{
              $this.tmpLen = 5
            }
          }else{
            $this.tmpLen = 5
          }

        },
        fail(){
          // wx.showLoading()
        }
      })
    },
    //是否被租 图标展示状态
    isRentSta($da){
      // isRent: false,
      //   rentStatus:false,
      if($da.mems != 'undefined'){
        if($da.mems.length > 0){
          console.log('是否被租 图标展示状态')
          for(let i = 0; i < $da.mems.length; i++){
            if(parseInt($da.mems[i]) == parseInt(wx.getStorageSync('uid'))){
              console.log(parseInt($da.mems[i]))
              console.log(parseInt(wx.getStorageSync('uid')))
              this.isRent = true //已经加入该活动
            }
          }
        }else{
          this.isRent = false
        }
      }else{
        this.isRent = false
      }
    },

    //如果是自己分享的
    meShare(arry,uid){
      console.log('___________________________')
      console.log(arry)
      let $this = this
      $this.joinUserInfos = []
      let joinArr = {}
      joinArr.uid = []
      joinArr.user = {}
      joinArr.user.uid = wx.getStorageSync('uid')
      joinArr.user.tm = Date.parse(new Date()) / 1000
      joinArr.user.token = hexMD5(Date.parse(new Date()) / 1000+'Token'+wx.getStorageSync('token'))
      for(let i = 0; i < arry.length; i++){
        joinArr.uid = arry[i]
        console.log(joinArr)
        wx.request({ //查询参加活动者信息
          method: 'POST',
          url: ''+baseUrl+''+basePath.user+'',
          data: joinArr,
          header: { 'content-type': 'application/json' },
          success (res) {
            console.log('=-=====查询参加活动人信息=======')
            console.log(res)
            if(parseInt(res.data.status) == 0){
              uAvatar(res.data.data, 1, imgPath) //头像
              $this.joinUserInfos.push(res.data.data[0])
              $this.joinUserInfos = $this.deWeighting($this.joinUserInfos)
              console.log($this.joinUserInfos)
            }else{
              wx.removeStorage({
                key: 'token',
                success(res) {}
              })
              userLoadings(wx,baseUrl,basePath,(res)=>{
                if(res){
                  // if(wx.getStorageSync('token')){
                    $this.isLoadingShow = false
                    $this.userInfos = wx.getStorageSync('userinfos')
                    $this.joinUserInfos = []
                    $this.atvIndexReq({id:$this.gid})
                  // }else{
                  //   $this.isLoadingShow = true
                  // }
                }
              })
            }
          },
          fail(){
            // wx.showLoading()
          }
        })
        $this.tmpLen = 4 - i
      }

    },
    //前往活动首页
    atvNav(){
      wx.redirectTo ({
        url: '../atvindex/main'
      })
    },
    //修改
    navEdit(){
      let $this = this
      wx.setStorageSync('atvedit',this.avtInfo)
      console.log(this.avtInfo)
      wx.navigateTo ({
        url: '../atvcreate/main?zj='+$this.zjStr+''
      })
    },

    deWeighting(arr){
      var result = [];
      var obj = {};
      for(var i =0; i<arr.length; i++){
         if(!obj[arr[i].uid]){
            result.push(arr[i]);
            obj[arr[i].uid] = true;
         }
      }
      return result
    },


    /**
     * 加入活动
     * @param id
     * @param uid
     */
    joinAtv(id,uid){
      let joinDa = {
        id:id, uid:this.cid,
        user:{
          uid: wx.getStorageSync('uid'),
          tm: Date.parse(new Date()) / 1000,
          token: hexMD5(Date.parse(new Date()) / 1000+'Token'+wx.getStorageSync('token'))
        }
      }
      console.log(joinDa)
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.atvjoin+'',
        data: joinDa,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('========加入活动=====')
          console.log(joinDa)
          console.log(res)
          if(res.data.status == 0){
            wx.showToast({ title: '加入活动成功！', icon: 'none', duration: 1500 })
            $this.isRent = true
          }else{
            $this.isLoadingShow = true
            /*userLoadings(wx,baseUrl,basePath,(res)=>{
              if(res){
                // if(wx.getStorageSync('token')){
                $this.isLoadingShow = false
                $this.userInfos = wx.getStorageSync('userinfos')
                $this.joinUserInfos = []
                $this.atvIndexReq({id:$this.gid})
                // }else{
                //   $this.isLoadingShow = true
                // }
              }
            })*/
          }
        },
        fail(){
          // wx.showLoading()
        }
      })
    },
    navAtv(){
      wx.navigateTo ({
        url: '../atvindex/main'
      })
    }
  },
  /**
   * 转发
   * @param res
   * @returns {{title: string, path: string, imageUrl: string}}
   */
  onShareAppMessage(res){
    var $this = this
    console.log('---------------------hhhhhhhhhhhhhhhh-----------------')
    console.log('gid:'+this.gid, 'inviter:'+wx.getStorageSync('uid'))
    console.log($this.shareImg)
    console.log(res)
    if(res.from == 'button'){
      console.log(res.target)
    }
    return {
      title: $this.shareStr,
      path: 'pages/avtfriend/main?gid='+$this.gid+'&inviter='+wx.getStorageSync('uid')+'',
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
.atv-box{padding-bottom:80px;}
.atv-share{position:fixed; z-index:99;}
.avt-footer>image.footer-edit{width:24%; margin-right:10px;}
/*.avt-footer>image.footer-share{width:64.67%;}*/
.atv-select-box{position:relative; padding:10px 0px;}
.atv-select-box>image{width:20px; margin-left:10px;}
.nickname-box{color:#FFDEB5; font-size:18px; font-weight:600;}
.rent-sta{width:63%;}
.rent-sta>image.footer-share{width:100%;}
.recruit-info>image{margin-top:10px !important;}
.avt-footer>button.editbtn{width:23.07%; margin-right:5px;}
.avt-footer>button{display:inline-block; background-color:transparent; padding:0px; margin:0px; line-height:initial;}
.avt-footer>button.sharebtn{display:inline-block; background-color:transparent; width:64.67%; padding:0px; margin:0px; line-height:initial;}
.avt-footer>button.sharebtn>image.footer-share,.avt-footer>button.editbtn>image.footer-edit{width:100%;}
.add-fird-info>ul{white-space:nowrap; -ms-word-break:keep-all; word-break:keep-all; position:relative; width:100%; overflow-x:scroll;}
</style>
