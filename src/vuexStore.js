import Vuex from 'vuex'
// Vue.use(Vuex)
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}
// export default new Vuex.Store({
//     state: {
//         dic: {}
//     },
//     mutations: {
//         addDic(state, dics) {
//            state.dic=Object.assign(state.dic, dics);           
//         },
//         addAllDic(state,stateObject){
//             state=stateObject;
//         }
//     },
//     getters: {             
//         getDic: (state) => (group) => {
//         	 // return `${state.dic}`;
//             return state.dic;
//         }

//     }
// })
// // export {  vuexStore as    default};
// // dic = store.state.dic[group],
// // // store.commit("addDic",group);


const storage = weex.requireModule('storage')
var state = {
   dic: {}
}
// 从storage里加载数据
storage.getItem('STORAGE_KEY', event => {
  if (event.result == "success" && event.data){
      // 这里可以使用extend等方法，这里仅举例说明
      var data = JSON.parse(event.data);
      state.dic = data.dic;
  }
})

// 存储plugin，存储感兴趣的数据，store里数据太多，没必要全持久化
const storagePlugin = store => {
  store.subscribe((mutation, {dic}) => {
    storage.setItem('STORAGE_KEY', JSON.stringify({dic}),event => {
      console.log('cache success');
    })
  })
}


export default new Vuex.Store({
     plugins:[storagePlugin],
 
  state: state,
    mutations: {
        addDic(state, dics) {
           state.dic=Object.assign(state.dic, dics);           
        },
        addAllDic(state,stateObject){
            state=stateObject;
        }
    },
    getters: {             
        getDic: (state) => (group) => {
             // return `${state.dic}`;
            return state.dic;
        }

    }
})


