import Vue from 'vue'
import App from './App'
import '../static/css/main.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

/*eslint-disable*/
export default {
  config: {
    "pages":[
      "pages/home/main",
      "pages/atvindex/main",
      "pages/atvcreate/main",
      "pages/atvme/main",
      "pages/avtfriend/main",
      "pages/citys/main",
      "pages/release/main",
      "pages/invites/main",
      "pages/sucrel/main",
      "pages/actinfo/main",
      "pages/addin/main",
      "pages/friend/main",
      "pages/signup/main",
      "pages/my/main",
      "pages/theme/main",
      "pages/msg/main",
      "pages/download/main",
      "pages/index/main",
      "pages/test/main"
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: '我约Lite',
      backgroundColor: '#eeeeee',
      navigationBarTextStyle: 'black'
      // 'navigationStyle':'custom'
    }
  }
}
