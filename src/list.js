import App from './list.vue'
import router from './router'
import mixins from './mixins'
import store from './vuexStore'
import { sync } from 'vuex-router-sync'
import buiweex  from 'bui-weex';



const stream = weex.requireModule('stream')
Vue.fetch = stream.fetch;
Vue.prototype.$fetch = stream.fetch;


import * as filters from './filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


sync(store, router)
Vue.mixin(mixins)
var vm = new Vue(Vue.util.extend({
    el: '#root',
    store,
    router,
}, App))

router.push('/')