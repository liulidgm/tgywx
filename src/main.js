// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/css/public.css'
import '../node_modules/swiper/dist/css/swiper.min.css'
import 'swiper'

import 'mint-ui/lib/style.css'
import router from './router'
//import axios from 'axios'
import mint from 'mint-ui'

//Vue.use(axios)
Vue.use(mint)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
