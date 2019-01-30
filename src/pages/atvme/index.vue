<template>
  <div class="container">
    <div class="atv-bg"><image src="https://www.woyue.com/vdimg/bg_main_big.png" mode="widthFix"></image></div>
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
            <!--<input id="editnickname"  v-model="avtInfo.name" maxlength="12" :disabled="edit" :focus="focusState" @blur="blurFun">-->
            <label class="nickname-box">{{avtInfo.name}}</label>
            <image v-if="avtInfo.uidgender == 1" src="https://www.woyue.com/xcximg/icon_chunjie_man.png" mode="widthFix"></image>
            <image v-else src="https://www.woyue.com/xcximg/icon_chunjie_woman.png" mode="widthFix"></image>
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
          <div class="recruit-y-2-1" v-else>
            <h1 v-if="avtInfo.uidgender == 1">约个女友</h1>
            <h1 v-else-if="avtInfo.uidgender == 2">约个男友</h1>
            <h4>一起过-情人节</h4>
          </div>
        </div>
        <div class="recruit-info">
          <image src="https://www.woyue.com/xcximg/bg_chunjie_index.png" mode="widthFix"></image>
          <text class="ritxt" @tap="traFocus">{{avtInfo.decription}}</text>
        </div>
      </div>
      <div class="add-fird">
        <image src="https://www.woyue.com/xcximg/bg_chunjie_added.png" mode="widthFix"></image>
        <div class="add-fird-info">
          <h3>已报名好友</h3>
          <p>（注: 以下报名信息仅自己可见)</p>
          <ul>
            <!--<li>-->
              <!--<p class="avatar-p"><image :src="avtInfo.avatar" mode="widthFix"></image></p>-->
              <!--<p class="avt-nickname">{{avtInfo.name}}</p>-->
            <!--</li>-->
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
    <div class="avt-footer">
      <button hover-class="none" class="editbtn" @tap="navEdit"><image class="footer-edit" src="https://www.woyue.com/xcximg/btn_chunjie_btn_edit.png" mode="widthFix"></image></button>
      <button hover-class="none" class="sharebtn" open-type="share"><image class="footer-share" src="https://www.woyue.com/xcximg/btn_chunjie_sharewx.png" mode="widthFix"></image></button>
    </div>
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
import { userLoadings }  from '../../../static/js/Landing'
import { baseUrl, basePath,imgPath }  from '../../../static/js/httpUrl'
import { hexMD5 }  from '../../../static/js/MD5'
import { uAvatar }  from '../../../static/js/userInfo'
export default {
  data () {
    return {
      msg: '自己发布的招募活动',
      sArry:['男','女'],
      sexArry: [{id:1,name:'男'},{id:2,name:'女'}],
      index:0,
      avtInfo:{},
      recruitInfo: '',
      joinUserInfos:[],
      tmpFor:[0,1,2,3,4],
      tmpLen:5,
      zjStr:0,
      gid:'',
      cdDays:0,
      sexTxt:'女',
      heTxt: '他',
      shareStr:'',
      tnop:false
    }
  },
  onLoad(opt){
    wx.setStorageSync('avtlogin',1)
    console.log(opt)
    this.zjStr = opt.zj
    console.log(typeof(wx.getStorageSync('atvcreat')))
    if(opt.zj == 1){
      if(typeof(wx.getStorageSync('atvcreat')) != 'string' && typeof(wx.getStorageSync('atvcreat')) != 'object'){
        console.log('初始内容')
        console.log(typeof(wx.getStorageSync('atvcreat')))
        console.log({id:wx.getStorageSync('atvcreat')})
        this.joinUserInfos = []
        this.atvIndexReq({id:wx.getStorageSync('atvcreat')})
      }else{
        console.log('初始内容idtype')
        console.log({id:wx.getStorageSync('uid'),idtype:1,tp:255})
        this.joinUserInfos = []
        this.atvIndexReq({id:wx.getStorageSync('uid'),idtype:1,tp:255})
      }
    }else{
      if(typeof(wx.getStorageSync('atvcreat256')) != 'string' && typeof(wx.getStorageSync('atvcreat256')) != 'object'){
        console.log('初始内容')
        console.log(typeof(wx.getStorageSync('atvcreat256')))
        console.log({id:wx.getStorageSync('atvcreat256')})
        this.joinUserInfos = []
        this.atvIndexReq({id:wx.getStorageSync('atvcreat256')})
      }else{
        console.log('初始内容idtype')
        console.log({id:wx.getStorageSync('uid'),idtype:1,tp:256})
        this.joinUserInfos = []
        this.atvIndexReq({id:wx.getStorageSync('uid'),idtype:1,tp:256})
      }
    }
    wx.setNavigationBarTitle({
      title: '我发布的活动'
    })
  },
  onShow(){
    console.log('onShow')
    console.log(parseInt(wx.getStorageSync('fb')))
  },
  onUnload(){
  },
  methods: {
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
    //活动信息
    atvIndexReq($da){
      // wx.setStorageSync('tnop255',0)
      // wx.setStorageSync('tnop256',0)
      wx.showLoading({ title: '加载中', mask: false })
      let $this = this
      wx.request({ //查询活动信息
        method: 'POST',
        url: ''+baseUrl+''+basePath.atvinfo+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          wx.hideLoading()
          console.log('=-=====约局信息查询=======')
          console.log(res,$da)
          console.log(res.data.data[0])
          $this.avtInfo = res.data.data[0]
          $this.gid = res.data.data[0].id
          if(res.data.data[0].uidgender == 1){
            $this.sexTxt = '女'
            $this.heTxt = '他'
          }else{
            $this.sexTxt = '男'
            $this.heTxt = '她'
          }
          //shareStr
          if(res.data.data[0].tp == 255){
            $this.shareStr =  res.data.data[0].name+'正在出租自己,陪你一起过-情人节'
          }else{
            $this.shareStr =  res.data.data[0].name+'想约个'+$this.sexTxt+'朋友,陪'+$this.heTxt+'一起过-情人节'
          }
          if(res.data.data[0].mems != 'undefined'){
            if(res.data.data[0].mems.length >= 0){
              $this.joinArry(res.data.data[0].mems,res.data.data[0].uid)
              if(res.data.data[0].tp == 255){
                // if(wx.getStorageSync('tnop255')){ //此处用于更新 推送的  form_id
                  if(parseInt(res.data.data[0].mems.length) > parseInt(wx.getStorageSync('tnop255'))){
                    $this.tnop = true
                    wx.setStorageSync('tnop255',res.data.data[0].mems.length)
                  }
                // }else{
                //   wx.setStorageSync('tnop255',res.data.data[0].mems.length)
                // }
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
                // }else{
                //   wx.setStorageSync('tnop256',res.data.data[0].mems.length)
                // }
              }
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
    //查询参加活动人信息
    joinArry(arry,uid){
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
      for(let j = 0; j < arry.length; j++){
        joinArr.uid = arry[j]
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
              console.log($this.joinUserInfos)
            }else{
              wx.removeStorage({
                key: 'token',
                success(res) {}
              })
              userLoadings(wx,baseUrl,basePath,()=>{
                // this.zjStr = opt.zj
                console.log(typeof(wx.getStorageSync('atvcreat')))
                if($this.zjStr == 1){
                  if(typeof(wx.getStorageSync('atvcreat')) != 'string' && typeof(wx.getStorageSync('atvcreat')) != 'object'){
                    console.log('初始内容')
                    console.log(typeof(wx.getStorageSync('atvcreat')))
                    console.log({id:wx.getStorageSync('atvcreat')})
                    $this.joinUserInfos = []
                    $this.atvIndexReq({id:wx.getStorageSync('atvcreat')})
                  }else{
                    console.log('初始内容idtype')
                    console.log({id:wx.getStorageSync('uid'),idtype:1,tp:255})
                    $this.joinUserInfos = []
                    $this.atvIndexReq({id:wx.getStorageSync('uid'),idtype:1,tp:255})
                  }
                }else{
                  if(typeof(wx.getStorageSync('atvcreat256')) != 'string' && typeof(wx.getStorageSync('atvcreat256')) != 'object'){
                    console.log('初始内容')
                    console.log(typeof(wx.getStorageSync('atvcreat256')))
                    console.log({id:wx.getStorageSync('atvcreat256')})
                    $this.joinUserInfos = []
                    $this.atvIndexReq({id:wx.getStorageSync('atvcreat256')})
                  }else{
                    console.log('初始内容idtype')
                    console.log({id:wx.getStorageSync('uid'),idtype:1,tp:256})
                    $this.joinUserInfos = []
                    $this.atvIndexReq({id:wx.getStorageSync('uid'),idtype:1,tp:256})
                  }
                }
              })
              //
            }
          },
          fail(){
            // wx.showLoading()
          }
        })
        $this.tmpLen = 4 - j
        console.log(j)
        console.log($this.tmpLen)
      }
    },
    navEdit(){
      let $this = this
      wx.setStorageSync('atvedit',this.avtInfo)
      console.log(this.avtInfo)
      wx.navigateTo ({
        url: '../atvcreate/main?zj='+$this.zjStr+''
      })
    },
  },
  /**
   * 转发
   * @param res
   * @returns {{title: string, path: string, imageUrl: string}}
   */
  onShareAppMessage(res){
    var $this = this
    console.log('---------------------hhhhhhhhhhhhhhhh-----------------')
    console.log('gid:'+$this.gid, 'inviter:'+wx.getStorageSync('uid'))
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
page{position:fixed; width:100%; height:100%; left:0px; top:0px;}
.container{background-color:#A32646;}
.atv-box{padding-bottom:80px;}
.avt-footer>button.editbtn{width:23.07%; margin-right:5px;}
.avt-footer>button{display:inline-block; background-color:transparent; padding:0px; margin:0px; line-height:initial;}
.avt-footer>button.sharebtn{display:inline-block; background-color:transparent; width:64.67%; padding:0px; margin:0px; line-height:initial;}
.avt-footer>button.sharebtn>image.footer-share,.avt-footer>button.editbtn>image.footer-edit{width:100%;}
input#editnickname{text-align:center; font-size:15px; width:200px;}
.atv-select-box>image{width:20px; margin-left:10px;}
.atv-select-box{padding:10px 0px; position:relative;}
.nickname-box{color:#FFDEB5; font-size:18px; font-weight:600;}
.avatar-p>image{display:inline-block; height:100%;}
.add-fird-info>ul{white-space:nowrap; -ms-word-break:keep-all; word-break:keep-all; position:relative; width:100%; overflow-x:scroll;}
.add-fird-info>ul>li{}
</style>
