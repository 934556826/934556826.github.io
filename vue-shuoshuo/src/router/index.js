import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Searching from '../views/Searching.vue'
import SearchList from '../views/SearchList.vue'
import Homemale from '../views/Homemale.vue'
import Player from '../views/Player.vue'
import routerr from '../views/routerr.vue'
import read from '../views/read.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Homemale',
    name: 'Homemale',
    component: Homemale
  },
  {
    path: '/read',
    name: 'read',
    component: read
  },
  {
    path: '/routerr',
    name: 'routerr',
    component: routerr
  },
  {
    path: '/Player',
    name: 'Player',
    component: Player
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    children: [{
        path: '/',
        component: SearchList
      },
      {
        path: 'searching',
        component: Searching
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router