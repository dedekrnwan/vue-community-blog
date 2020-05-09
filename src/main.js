import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VueNoty from "vuejs-noty";
import VueDisqus from "vue-disqus";
import VueWysiwg from "vue-wysiwyg";

import 'vuejs-noty/dist/vuejs-noty.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(VueNoty)
Vue.use(VueDisqus)
Vue.use(VueWysiwg, {})

Vue.config.productionTip = false

const authData = localStorage.getItem('auth')

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {}
  },
  render: h => h(App),
}).$mount('#app')
