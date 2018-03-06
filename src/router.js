import Router from 'vue-router'
import Hello from './views/Hello.vue'
import index from './index.vue'
import vuexStore from './views/vuexStore.vue'

Vue.use(Router)
export default new Router({
  mode: 'abstract',
  routes: [
    { path: '/hello', component: Hello },
    { path: '/vuexStore', component: vuexStore },
    { path: '/', redirect: '/index' }
  ]
})