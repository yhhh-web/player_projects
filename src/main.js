import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import discovery from './components/03.discovery.vue'
import playlists from './components/04.playlists.vue'
import songs from './components/05.songs.vue'
import mvs from './components/06.mvs.vue'
import result from './components/07.result.vue'
import playlist from './components/08.playlist.vue'
import mv from './components/09.mv.vue'
//导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

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