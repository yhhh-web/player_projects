import Vue from 'vue'
Vue.config.productionTip = false
Vue.use(VueRouter);
import discovery from './components/discovery.vue'
import playlists from './components/playlists.vue'
import songs from './components/songs.vue'
import mvs from './components/mvs.vue'
import result from './components/result.vue'
import playlist from './components/playlist.vue'
import mv from './components/mv.vue'
//导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueRouter from 'vue-router'
let router = new VueRouter({
routes:[
{
    path:"/discovery",
    component:discovery
},
{
    path:"/",
    component:discovery
},
{
    path:"/playlists",
    component:playlists
},
{
    path:"/songs",
    component:songs
},
{
    path:"/mvs",
    component:mvs
},
{
    path:"/result",
    component:result
},
{
    path:"/playlist",
    component:playlist
},
{
    path:"/mv",
    component:mv
}
]
})

Vue.use(ElementUI);
new Vue({
    render: h => h(App),
    router
}).$mount('#app')



import './assets/index.css'