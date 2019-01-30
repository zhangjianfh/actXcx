<template>
  <div class="container">
    <div class="box">
      <div class="cur-position">
        <p>
          <image :src="siteIcon" mode="aspectFit"></image>
          <label>当前定位</label>
        </p>
        <div class="positioning">
          <label @tap="currCitys(selectedSite.id, selectedSite.name, 0)">{{selectedSite.name}}</label>
          <div class="ptg-c" @tap="reLocate"><image :src="ptgC" mode="aspectFit"></image><label>重新定位</label></div>
        </div>
      </div>
      <div class="history-ptn">
        <p>
          <image :src="historySite" mode="aspectFit"></image>
          <label>历史记录</label>
        </p>
        <div class="history-city">
          <ul>
            <li v-for="(city,index) in historyCitys" :key="index" @tap="currCitys(city.id, city.name, 0)" :class="{'currcity': currCityId == city.id}"><label>{{city.name}}</label></li>
          </ul>
        </div>
      </div>
      <div class="hot-ptn">
        <p>
          <image :src="hotSite" mode="aspectFit"></image>
          <label>热门城市</label>
        </p>
        <div class="hot-city">
          <ul>
            <li v-for="(city,index) in tempHotCityArry" :key="index" @tap="currCitys(city.id, city.name, 0)" :class="{'currcity': currCityId == city.id}"><label>{{city.name}}</label></li>
          </ul>
        </div>
      </div>
      <div class="city-sort-list" id="csl">
        <ul>
          <!-- cityList-->
          <li v-for="(sort, index) in citySortList" :key="index">
            <p class="city-sort-zimu">{{sort.char}}</p>
            <p class="city-sort-hanz" v-for="(sortArr, items) in sort.item" :key="items" @tap="currCitys(sortArr.id, sortArr.name, 1)">{{sortArr.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-box">
      <view class="section section-search">
        <icon type="search" size="14" />
        <input type="search" confirm-type="search" v-model="searchVal" placeholder="城市搜索" />
      </view>
      <div class="city-sort-list">
        <ul>
          <!-- cityList-->
          <li v-for="(sort, index) in searchCityArry" :key="index">
            <p class="city-sort-zimu">{{sort.char}}</p>
            <p class="city-sort-hanz" v-for="(sortArr, items) in sort.item" :key="items" @tap="currCitys(sortArr.id, sortArr.name, 1)">{{sortArr.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import siteIcon from '../../../static/img/site_icon.png'
import ptgC from '../../../static/img/btn_position_site.png'
import historySite from '../../../static/img/history_site.png'
import hotSite from '../../../static/img/hot_site.png'
import { baseUrl, basePath }  from '../../../static/js/httpUrl'
import { chineseLetter } from '../../../static/js/each'
import { ConvertPinyin } from '../../../static/js/py'
import { getSiteInfos } from '../../../static/js/getSiteInfo'
export default {
  name: "切换城市",
  data(){
    return{
      msg: '切换城市',
      siteIcon:siteIcon,
      ptgC:ptgC,
      historySite:historySite,
      hotSite:hotSite,
      tempHotCityArry:[
        {name:'成都市', id:510100},{name:'上海市', id:310100},{name:'深圳市', id:440300},
        {name:'广州市', id:440100},{name:'北京市', id:110100}
      ],
      tempHistoryCityArry:[
        {name:'成都', id:123},{name:'上海', id:321},{name:'广州', id:213},
        {name:'北京', id:312},{name:'长沙', id:132}
      ],
      currCityId:'0',
      citySortList:[],
      selectedSite: {id:'', name:''},
      pinyList: [],
      historyCitys: [],
      searchVal: '',
      searchCityArry:[]
    }
  },
  onLoad(){
    if(wx.getStorageSync('historyCitys')){
      this.historyCitys = wx.getStorageSync('historyCitys')
      console.log('选择的城市历史记录')
      console.log(this.historyCitys)
    }
    wx.setNavigationBarTitle({
      title: '切换城市',
    })
    //获取选择的城市
    if(wx.getStorageSync('cityinfo')){
      this.selectedSite = wx.getStorageSync('cityinfo')
    }else{
      this.selectedSite = wx.getStorageSync('currcity')
    }
    // this.getCityList()
  },
  created(){
    this.getCityList()
  },
  watch:{
    searchVal(val) {
      this.searchCityArry = []
      let scArry = {} //声明一个空数组来存放数据
      if(val == ''){
        this.searchCityArry = []
      }else{
        for (let i = 0; i < this.citySortList.length; i++) {
          if(this.citySortList[i].char.search(val) != -1){
            scArry = this.citySortList[i]
          }else{
            for(let j = 0; j < this.citySortList[i].item.length; j++){
              //for循环数据中的每一项（根据name值）
              if (this.citySortList[i].item[j].name.search(val) != -1) {
                scArry = this.citySortList[i]
              }
            }
          }
        }
        // this.searchCityArry = scArry
        if(scArry.char){
          this.searchCityArry.push(scArry)
          console.log(JSON.stringify(this.searchCityArry))
        }
      }
    }
  },
  methods:{
    /**
     * 历史，热门（位置）城市选择
     * @param id ：城市ID
     * @param name ： 城市名
     * @param type ： 类型 0=热门、历史选择   1=列表城市选择
     */
    currCitys(id,name,type){
      this.selectedSite = {id:id, name:name}
      if(parseInt(type) == 0){
        this.currCityId = id
      }
      wx.setStorageSync('cityinfo', {id:id,name:name})
      console.log(wx.getStorageSync('cityinfo'))
      wx.setStorageSync('citysearch', 's')




      if(wx.getStorageSync('historyCitys')){
        if(wx.getStorageSync('historyCitys').length < 6){
          this.historyCitys.push({id:id,name:name})
          this.historyCitys = this.ditto(this.historyCitys)
          wx.setStorageSync('historyCitys', this.historyCitys)
        }else{
          this.historyCitys.pop()
          this.historyCitys.unshift({id:id,name:name})
          this.historyCitys = this.ditto(this.historyCitys)
          wx.setStorageSync('historyCitys', this.historyCitys)
        }
      }else{
        this.historyCitys.push({id:id,name:name})
        this.historyCitys = this.ditto(this.historyCitys)
        wx.setStorageSync('historyCitys', this.historyCitys)
      }
      console.log('11111111111')
      console.log(JSON.stringify(this.historyCitys))

      // wx.setStorageSync('historycitys', push(wx.getStorageSync('cityinfo')))
      wx.navigateBack({
        url: '/pages/home/main'
      })
    },
    /**
     * 获取城市列表
     */
    getCityList(){
      let $this = this
      wx.request({
        method: 'GET',
        url: ''+baseUrl+''+basePath.citylist+'',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          $this.citySort(res.data.data)
        },
        fail: function (f) {
          console.log(f)
        }
      })
    },
    /**
     * 城市拼音排序
     * @param cityArry ： 城市列表
     */
    citySort(cityArry){
      let tmpCitySortList = []
      tmpCitySortList = cityArry
      for(let i in tmpCitySortList){
        tmpCitySortList[i].piny = ConvertPinyin(tmpCitySortList[i].name)[0].toUpperCase()
      }
      chineseLetter(tmpCitySortList, 'piny')


      let tmpSort = []
      let awaitArr = []
      let obj = {}
      for(let i = 0; i < tmpCitySortList.length; i++){
        let tmpData = {}
        tmpData.item = []
        if(!obj[tmpCitySortList[i].piny]){
          this.pinyList.push(tmpCitySortList[i].piny)
          tmpData.char = tmpCitySortList[i].piny
          tmpData.item.push(tmpCitySortList[i])
          obj[tmpCitySortList[i].piny] = true
          tmpSort.push(tmpData)
        }else{
          awaitArr.push(tmpCitySortList[i])
        }
      }
      for(let i in tmpSort){
        for(let j in awaitArr){
          if(awaitArr[j].piny == tmpSort[i].char){
            tmpSort[i].item.push(awaitArr[j])
          }
        }
      }
      this.citySortList = tmpSort

    },

    /**
     * 重新定位
     */
    reLocate(){
      this.selectedSite = {id:'', name:'--'}
      let $this = this
      wx.getLocation({ //定位授权
        type: 'wgs84',
        success: function(res){
          console.log(res)
          getSiteInfos(wx,res.longitude, res.latitude).then((site)=>{
            console.log(site)
            let adcode = site.data.regeocode.addressComponent.adcode
            adcode = parseInt(adcode.substring(0, adcode.length-2))*100
            wx.setStorageSync('currcity', {id:adcode, name:site.data.regeocode.addressComponent.city})
            $this.selectedSite = {id:adcode, name:site.data.regeocode.addressComponent.city}
          })
        },
        fail: resf => {
          $this.selectedSite = {id:'', name:wx.getStorageSync('city')}
        }
      })
    },

    ditto(arr){
      var result = [];
      var obj = {};
      for(var i =0; i<arr.length; i++){
        if(!obj[arr[i].id]){
          result.push(arr[i]);
          obj[arr[i].id] = true;
        }
      }
      return result
    }

  },
}
</script>

<style scoped>
.container,.box{background-color:#f3f4f8; padding-top:26px; -webkit-overflow-scrolling:touch;}

.history-city,.history-city ul,.city-sort-list,.city-sort-list ul,.city-sort-list ul li{position:relative; width:100%;}
.cur-position,.history-ptn,.hot-ptn{position:relative; width:100%; background-color:#fff; margin-top:20px; padding:15px;}
.cur-position p,.history-ptn p,.hot-ptn p{display:flex; align-items:center; justify-content:flex-start; margin-bottom:20px;}
.cur-position p image,.history-ptn p image,.hot-ptn p image{width:24px; height:24px;}
.cur-position p label,.history-ptn p label,.hot-ptn p label{margin-left:10px; font-size:16px; font-family:MicrosoftYaHei;}
.positioning{padding-left:34px; font-size:18px; font-weight:500; display:flex; align-items:center; justify-content:space-between; font-family:MicrosoftYaHei;}
.ptg-c{display:flex; align-items:center; justify-content:flex-start; color:#007EFA;}
.ptg-c>image{width:30px; height:30px;}
.ptg-c>label{margin-left:10px;}
/*justify-content:space-between;*/
.history-city ul,.hot-city ul{display:flex; align-items:flex-start; justify-content:flex-start; flex-wrap:wrap;}
.history-city ul li,.hot-city ul li{width:32%; text-align:center; background-color:#F3F4F8; color:#000; padding:10px 5px; border-radius:3px;
margin-bottom:6.7px; margin-right:6.7px; font-size:16px;}
.history-city ul li:nth-child(3n),.hot-city ul li:nth-child(3n){margin-right:0px;}
.currcity{background-color:#007EFA !important; color:#fff !important;}
.city-sort-list{font-size:16px;}
.city-sort-list ul li>p.city-sort-zimu{padding:10px 15px; color:#C7C7C7;}
.city-sort-list ul li>p.city-sort-hanz{padding:15px; background-color:#fff; border-bottom:1px solid #F3F4F8;}
.selcitys{position:fixed; z-index:9; right:0px; top:0px; height:100%; display:flex; align-items:center; justify-content:center;}
ul.selcitys-list-ul li{padding:2.5px 5px;}
.history-city ul li label{overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;}

.search-box{position:fixed; width:100%; top:0px; left:0px; max-height:100%; overflow-y:auto; background-color:#f3f4f8;}
.section-search{padding:0px 15px; background-color:#fff; position:relative; padding-bottom:15px;}
.section-search>icon{position:absolute; left:28px; top:15px;}
.section-search>input{background-color:#F3F4F8; height:40px; padding-left:40px; border-radius:3px; font-size:16px;}

</style>
