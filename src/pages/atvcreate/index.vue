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
          <image v-if="userInfos.avatarUrl != ''" :src="userInfos.avatarUrl" mode="widthFix"></image>
          <image v-else src="https://www.woyue.com/xcximg/default_avatar.png" mode="widthFix"></image>
        </div>
      </div>

      <div class="atv-select">
        <div class="atv-select-b">
          <image src="https://www.woyue.com/xcximg/bg_chunjie_username.png" mode="widthFix"></image>
          <div class="asi-box"><image @tap="editName" class="atv-select-ico" src="https://www.woyue.com/xcximg/btn_chunjie_edit.png" mode="widthFix"></image></div>
          <div class="atv-select-box">
            <!--:disabled="edit" :focus="focusState" @blur="blurFun"-->
            <input id="editnickname" :focus="focusState"  v-model="userInfos.nickName" maxlength="12">
          </div>
        </div>
        <!--v-if="userInfos.gender != 1 && userInfos.gender != 2"-->
        <!--<div v-if="isEdit">-->
          <!--<div class="atv-select-b crt-edit-b">-->
            <!--<image class="crt-edit-img" src="https://www.woyue.com/xcximg/bg_chunjie_username.png" mode="widthFix"></image>-->
            <!--&lt;!&ndash;<image class="atv-select-ico" src="https://www.woyue.com/xcximg/btn_chunjie_arrow.png" mode="widthFix"></image>&ndash;&gt;-->
            <!--<div class="atv-select-box crt-edit-acb">-->
              <!--<label v-if="userInfos.gender == 1">男</label>-->
              <!--<label v-else>女</label>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div v-else>-->
          <div class="atv-select-b" v-if="isGneder">
            <image src="https://www.woyue.com/xcximg/bg_chunjie_username.png" mode="widthFix"></image>
            <div class="asi-box"><image class="atv-select-ico" src="https://www.woyue.com/xcximg/btn_chunjie_arrow.png" mode="widthFix"></image></div>
            <div class="atv-select-box">
              <picker @change="sexSelect" :value="index" :range="sArry">
                <!--请选择自己的性别-->
                <div class="picker" id="sex-sel"><input v-model="temp" placeholder="请选择自己的性别" placeholder-style="font-size:16px;" disabled="true" /></div>
              </picker>
            </div>
          </div>
        <!--</div>-->

      </div>

      <div class="recruit-y">
        <div class="recruit-y-1" v-if="zj">
          <hr />
          <label v-if="userInfos.gender == 1">男</label>
          <label v-else-if="userInfos.gender == 2">女</label>
          <label v-else>对</label>

          <label v-if="userInfos.gender == 1">友</label>
          <label v-else-if="userInfos.gender == 2">友</label>
          <label v-else>象</label>
          <label>出</label> <label>租</label>
          <hr />
        </div>
        <div class="recruit-y-1" v-else>
          <hr />
          <label v-if="userInfos.gender == 1">女</label>
          <label v-else-if="userInfos.gender == 2">男</label>
          <label v-else>对</label>
          <label v-if="userInfos.gender == 1">友</label>
          <label v-else-if="userInfos.gender == 2">友</label>
          <label v-else>象</label>
          <label>招</label> <label>募</label>
          <hr />
        </div>
        <div class="recruit-y-2">
          <image src="https://www.woyue.com/vdimg/img_chunjie_lanterns.png" mode="widthFix"></image>
          <div class="recruit-y-2-1" v-if="zj">
            <h1>本人出租</h1>
            <h4 class="bnew">一起过-情人节</h4>
          </div>
          <div class="recruit-y-2-1" v-else>
            <h1 v-if="userInfos.gender == 1">约个女友</h1>
            <h1 v-else-if="userInfos.gender == 2">约个男友</h1>
            <h1 v-else>约个对象</h1>
            <h4>一起过-情人节</h4>
          </div>
        </div>
        <div class="recruit-info">
          <image src="https://www.woyue.com/xcximg/bg_chunjie_index.png" mode="widthFix"></image>
          <textarea @blur="traBlur" v-if="traShow" auto-focus="{autoFocus}" focus="{true}"  class="ritxt" maxlength="200" type="text" v-model="recruitInfo"></textarea>
          <text v-else="!traShow" class="ritxt" @tap="traFocus">{{recruitInfo}}</text>
        </div>
      </div>
      <!--<p class="download-prompt">更多精彩约局请下载 我约APP</p>-->
      <navigator url="../home/main" hover-class="none" open-type="redirect" class="download-prompt">点击查看更多约局活动或下载我约APP</navigator>
    </div>
    </scroll-view>
    <div class="avt-footer">
      <image v-if="isEdit" @tap="release" src="https://www.woyue.com/xcximg/btn_chunjie_i-post.png" mode="widthFix"></image>

      <form report-submit="true" @submit="subInfo" v-else>
        <button form-type="submit"><image src="https://www.woyue.com/xcximg/btn_chunjie_post.png" mode="widthFix"></image></button>
      </form>
      <!--<image v-else @tap="release" src="https://www.woyue.com/xcximg/btn_chunjie_post.png" mode="widthFix"></image>-->
    </div>
    <Isreg @myevent="onMyevent" :is-loading="isLoadingShow" />
  </div>
</template>

<script>
import '../../../static/activity/css/main.css'
import Isreg from '../../components/Isreg.vue'
import { userLoadings } from '../../../static/js/Landing'
import { hexMD5 }  from '../../../static/js/MD5'
import { isNull }  from '../../../static/js/verify'
import { baseUrl, basePath }  from '../../../static/js/httpUrl'
import { actJudge } from '../../../static/js/judgeLogin'
export default {
  components: {Isreg:Isreg},
  template: '<Isreg/>',
  data () {
    return {
      msg: '招募对象',
      isLoadingShow: false,
      userInfos:{},
      zj: false,
      edit:true,
      focusState:false,
      sArry:['男','女'],
      sexArry: [{id:1,name:'男'},{id:2,name:'女'}],
      isGneder: false,
      temp:'',
      index:0,
      recruitInfo: '要求：女，单身，活的，演技好 \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我妈一激动说不定还会把祖传的玉坠子送给你',
      createData:{
        name:'',
        avatar:'',
        uidgender: '',
        decription:'', //描述
        tp:255,
        xcx:{form_id:''},
        user:{uid: 0, token: '', tm:0}
      },
      isEdit:false,
      idtype:0,
      urlTp:0,
      urlOpt:{},
      traShow:false,
      autoFocus: false,
      formId:''
    }
  },
  onLoad(opt){
    this.urlTp = opt.zj
    this.urlOpt = opt
    console.log(opt)
    wx.showLoading({ title: '加载中', mask: false })
    if(wx.getStorageSync('token')){

      if(parseInt(opt.zj) == 1){
        if(parseInt(wx.getStorageSync('userinfos').gender) == 1){
          this.recruitInfo = '年龄：23岁 身高：173CM 婚史：未婚 \n产地：四川 成都 职业：IT男  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
        }else{
          this.recruitInfo = '年龄：23岁 身高：163CM 婚史：未婚 \n产地：四川 成都 职业：HR  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
        }

      }else{
        if(parseInt(wx.getStorageSync('userinfos').gender) == 1){
          this.recruitInfo = '要求：女，单身，活的，演技好 \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我妈一激动说不定还会把祖传的玉坠子送给你'
        }else{
          this.recruitInfo = '要求：男，单身，活的，演技好 \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我爸一激动说不定还会封你一个大红包'
        }

      }

      this.isLoadingShow = false
      actJudge(wx,(isls)=>{
        if(isls){
          this.isLoadingShow = true
        }else{
          this.isLoadingShow = false
        }
      })
      console.log(wx.getStorageSync('userinfos'))
      if(wx.getStorageSync('atvedit')){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(wx.getStorageSync('atvedit'))
        this.userInfos.avatarUrl = wx.getStorageSync('atvedit').avatar
        this.userInfos.gender = wx.getStorageSync('atvedit').uidgender
        this.userInfos.nickName = wx.getStorageSync('atvedit').name
        this.recruitInfo = wx.getStorageSync('atvedit').decription
        this.isEdit = true
        this.panDun(opt,true)
      }else{
        this.isEdit = false
        this.panDun(opt,false)
      }
      console.log(wx.getStorageSync('atvedit').uid,wx.getStorageSync('userinfos').id)
      if(wx.getStorageSync('atvedit').uid == wx.getStorageSync('userinfos').id){
        this.idtype =  0
      }else{
        this.idtype =  1
      }
      wx.hideLoading()

      //情人节从新登陆判断
      if(wx.getStorageSync('tnop255') != 0){
        this.isLoadingShow = true
      }else{
        this.isLoadingShow = false
      }
      if(wx.getStorageSync('tnop256') != 0){
        this.isLoadingShow = true
      }else{
        this.isLoadingShow = false
      }
      //情人节从新登陆判断

    }else{
      this.isLoadingShow = true
      wx.hideLoading()
    }
  },
  onShow(){
    wx.setStorageSync('avtlogin',1)
    console.log("？？？？？？？？？？？？？？？？？？？？")
    console.log(wx.getStorageSync('atvedit'))
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(wx.getStorageSync('userinfos'))

    if(wx.getStorageSync('userinfos')){
      if(wx.getStorageSync('userinfos').gender == 0){
        this.isGneder = true
      }
    }
    // this.isGneder
  },
  methods: {
    onMyevent(e){
      let $this = this
      if(e){
        userLoadings(wx,baseUrl,basePath,(res)=>{
          if(res){
            if(wx.getStorageSync('token')){


              if(parseInt(this.urlTp) == 1){
                if(parseInt(wx.getStorageSync('userinfos').gender) == 1){
                  this.recruitInfo = '年龄：23岁 身高：173CM 婚史：未婚 \n产地：四川 成都 职业：IT男  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
                }else{
                  this.recruitInfo = '年龄：23岁 身高：163CM 婚史：未婚 \n产地：四川 成都 职业：HR  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
                }

              }else{
                if(parseInt(wx.getStorageSync('userinfos').gender) == 1){
                  this.recruitInfo = '要求：女，单身，活的，演技好 \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我妈一激动说不定还会把祖传的玉坠子送给你'
                }else{
                  this.recruitInfo = '要求：男，单身，活的，演技好 \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我爸一激动说不定还会封你一个大红包'
                }

              }

              this.isLoadingShow = false
              console.log(wx.getStorageSync('userinfos'))
              if(wx.getStorageSync('atvedit')){
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
                console.log(wx.getStorageSync('atvedit'))
                this.userInfos.avatarUrl = wx.getStorageSync('atvedit').avatar
                this.userInfos.gender = wx.getStorageSync('atvedit').uidgender
                this.userInfos.nickName = wx.getStorageSync('atvedit').name
                this.recruitInfo = wx.getStorageSync('atvedit').decription
                this.isEdit = true
                this.panDun(this.urlOpt,true)
              }else{
                this.isEdit = false
                this.panDun(this.urlOpt,false)
              }

              if(wx.getStorageSync('atvedit')){
                console.log(wx.getStorageSync('atvedit').uid,wx.getStorageSync('userinfos').id)
                if(wx.getStorageSync('atvedit').uid == wx.getStorageSync('userinfos').id){
                  this.idtype =  0
                }else{
                  this.idtype =  1
                }
              }

              $this.isLoadingShow = false
            }else{
              $this.isLoadingShow = true
            }
          }
        })
      }else{
        // this.adactav = []
      }
    },
    //点击text 标签  textarea获得焦点
    traFocus(){
      this.traShow = true
      setTimeout(()=>{
        this.autoFocus = true
      },200)
    },
    //textarea 失去焦点
    traBlur(){
      this.traShow = false
      this.autoFocus = false
    },
    /**
     * 页面 内容逻辑 填充
     * @param opt : 链接里的状态
     * @param flag ： 是否是编辑
     */
    panDun(opt,flag){
      if(!flag){
        this.userInfos = wx.getStorageSync('userinfos')
      }
      if(this.userInfos.avatarUrl == ''){
        this.createData.avatar = 'https://www.woyue.com/xcximg/default_avatar.png'
      }else{
        this.createData.avatar = this.userInfos.avatarUrl
      }
      this.createData.uidgender = this.userInfos.gender
      this.createData.name = this.userInfos.nickName
      this.createData.decription = this.recruitInfo
      console.log(this.recruitInfo)
      if(parseInt(opt.zj) == 1){
        this.zj = true
        this.createData.tp = 255
        if(!flag){
          if(this.userInfos.gender == 1){
            this.recruitInfo = '年龄：23岁 身高：173CM 婚史：未婚 \n产地：四川 成都 职业：IT男  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
          }
          if(this.userInfos.gender == 2){
            this.recruitInfo = '年龄：23岁 身高：163CM 婚史：未婚 \n产地：四川 成都 职业：HR  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
          }
        }
        wx.setNavigationBarTitle({
          title: '出租自己'
        })
      }else{
        this.zj = false
        this.createData.tp = 256
        if(this.userInfos.gender == 1){
          wx.setNavigationBarTitle({
            title: '约个女友'
          })
        }else if(this.userInfos.gender == 2){
          wx.setNavigationBarTitle({
            title: '约个男友'
          })
        }
      }
    },
    sexSelect(e){
      this.index = e.mp.detail.value
      this.userInfos.gender = this.sexArry[e.mp.detail.value].id
      this.createData.uidgender = this.sexArry[e.mp.detail.value].id
      this.temp = this.sexArry[e.mp.detail.value].name
      if(parseInt(this.urlTp) == 1){
        if(parseInt(this.sexArry[e.mp.detail.value].id) == 1){
          this.recruitInfo = '年龄：23岁 身高：173CM 婚史：未婚 \n产地：四川 成都 职业：IT男  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
        }else{
          this.recruitInfo = '年龄：23岁 身高：163CM 婚史：未婚 \n产地：四川 成都 职业：HR  \n出租范围：看电影 吃饭 聊天 压马路 参加聚会'
        }

      }else {
        if (parseInt(this.sexArry[e.mp.detail.value].id) == 1) {
          this.recruitInfo = '要求：女，单身，活的，演技好 \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我妈一激动说不定还会把祖传的玉坠子送给你'
        } else {
          this.recruitInfo = '要求：男，单身，活的，演技好 \n待遇：包吃包住，伙食按年夜饭标准，红包随机，我爸一激动说不定还会封你一个大红包'
        }
      }
      console.log(this.sexArry[e.mp.detail.value].id)
    },
    //编辑活动描述
    editName(){
      console.log(111)
      this.edit = false
      this.focusState = true
    },
    //昵称框 失去焦点
    blurFun(){
      this.edit = true
      this.createData.name = this.userInfos.name
    },
    //活动描述 获得焦点
    ritxtFocus(){
    },
    //活动描述 失去焦点
    ritxtBlur(){
      if(this.recruitInfo != ''){
        this.createData.decription = this.recruitInfo
      }else{
        wx.showToast({ title: '请填写招募描述', icon: 'none', duration: 1500 })
      }
    },
    subInfo(e){
      console.log(e)
      console.log(e.mp.detail.value)
      console.log('=========formId=======')
      console.log(e.mp.detail.formId)
      this.createData.xcx.form_id = e.mp.detail.formId
      this.release()
    },
    //发布
    release(){
      if(!isNull(this.userInfos.nickName)){
        wx.showToast({ title: '请填写你的昵称', icon: 'none', duration: 1500 })
      }else if(this.createData.uidgender != 1 && this.createData.uidgender != 2){
        wx.showToast({ title: '请填选择你的性别', icon: 'none', duration: 1500 })
      }else if(!isNull(this.recruitInfo)){
        wx.showToast({ title: '请填写招募描述', icon: 'none', duration: 1500 })
      }else{
        if(this.userInfos.avatarUrl == ''){
          this.createData.avatar = 'https://www.woyue.com/xcximg/default_avatar.png'
        }else{
          this.createData.avatar = this.userInfos.avatarUrl
        }


        this.createData.decription = this.recruitInfo
        this.createData.name = this.userInfos.nickName
        this.createData.user.uid = wx.getStorageSync('uid')
        this.createData.user.tm = Date.parse(new Date()) / 1000
        this.createData.user.token = hexMD5(Date.parse(new Date()) / 1000+'Token'+wx.getStorageSync('token'))
        console.log(this.createData)
        wx.showLoading({ title: '正在发布', mask: true })
        this.createActive(this.createData)
      }
    },
    //创建活动
    createActive($data){
      let url = ''+baseUrl+''+basePath.atvcreate+''
      if(this.isEdit){
        url = ''+baseUrl+''+basePath.atvupdata+''
        $data.id = wx.getStorageSync('atvedit').id
        $data.tp = wx.getStorageSync('atvedit').tp
        $data.gender = $data.uidgender
        $data.idtype = this.idtype
        delete $data.uidgender
      }else{
        wx.setStorageSync('fb',0)
        url = ''+baseUrl+''+basePath.atvcreate+''
      }
      console.log('创建活动内容')
      console.log(url)
      console.log($data)
      let $this = this
      wx.request({ //发布
        method: 'POST',
        url: url,
        data: $data,
        header: { 'content-type': 'application/json' },
        success (res) {
          wx.hideLoading()
          if($this.isEdit){
            console.log('修改活动')
          }else{
            console.log('创建活动')
          }
          console.log(res)
          console.log(wx.getStorageSync('atvcreat'))
          if(parseInt($this.urlTp) == 1){
            wx.setStorageSync('atvcreat', res.data.data)
          }
          if(parseInt($this.urlTp) == 0){
            wx.setStorageSync('atvcreat256', res.data.data)
          }
          if(res.data.status == 0){
            wx.redirectTo ({
              url: '../atvme/main?zj='+$this.urlTp+''
            })
          }else{
            wx.showToast({ title: '登陆过期', icon: 'none', duration: 1500 })
            userLoadings(wx,baseUrl,basePath,(res)=>{
              if(res){
                if(wx.getStorageSync('token')){
                  $this.isLoadingShow = false
                }else{
                  $this.isLoadingShow = true
                }
              }
            })
          }
        },
        fail(){
          wx.hideLoading()
          wx.showToast({ title: '网络超时', icon: 'none', duration: 1500 })
        }
      })
    },
  }
}
</script>


<style scoped>
/*.atv-box{}*/
.container{background-color:#A32646;}
#sex-sel{position:relative; display:inline-block; width:360px !important; text-align:center;}
input#editnickname{text-align:center; font-size:15px; width:200px;}
image.atv-select-ico{z-index:2;}
textarea.ritxt{font-size:16px;}
.scroll-view{position:relative; width:100%; height:100%; padding-bottom:80px;}
.recruit-info>image{margin-top:10px !important;}
image.crt-edit-img{width:100%;}
.crt-edit-b{position:relative;}
.crt-edit-acb{position:absolute; top:0px; left:0px; width:100%; height:100%; text-align:center; font-size:16px;}
</style>
