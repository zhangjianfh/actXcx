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