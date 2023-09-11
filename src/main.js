import Vue from 'vue'
import App from './App.vue'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
