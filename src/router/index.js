import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'

Vue.use(Router)

export default new Router({
    base: '/social-ui/',
    routes: [
      {
        path: '/',
        component: Home
      }
    ]
})