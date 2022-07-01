import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// 引入全部样式
import 'vant/lib/index.less'

const Home = () => import('@/views/Home')
const MessAge = () => import('@/views/MessAge')
const My = () => import('@/views/My')
const FindHome = () => import('@/views/FindHome')
const getCityList = () => import('@/components/CityLIst.vue')

Vue.use(VueRouter)
Vue.use(Vant)
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'message', component: MessAge },
      { path: 'findhome', component: FindHome },
      { path: 'my', component: My }
    ]
  },
  { path: '/login', component: Login },
  { path: '/citylist', component: getCityList }
]

const router = new VueRouter({
  routes
})

export default router
