import Vue from 'vue'
import colors from 'vuetify/lib/util/colors'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  theme: {
    themes: {
      light: {
        background: colors.blueGrey,
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
