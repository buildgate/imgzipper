import Vue from 'vue'
import App from './App.vue'
import zipper from './plugin/ImgZipper.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
