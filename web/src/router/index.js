import Vue from 'vue'
import Router from 'vue-router'


/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/regist',
      component: () => import('@/pages/regist'),
    },
    {
      path: '/search',
      component: () => import('@/pages/search'),
    },
    {
      path: '/',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/pages/home'),
        },
        {
          path: '/game',
          component: () => import('@/pages/game'),
        },
        {
          path: '/anim',
          component: () => import('@/pages/anim'),
        },
        {
          path: '/cartoon',
          component: () => import('@/pages/cartoon'),
        },
        {
          path: '/novel',
          component: () => import('@/pages/novel'),
        },
        {
          path: '/other',
          component: () => import('@/pages/other'),
        },
        {
          path: '/topic',
          component: () => import('@/pages/topic'),
        },
        {
          path: '/account',
          component: () => import('@/pages/account'),
        },
        {
          path: '/message',
          component: () => import('@/pages/message'),
        },
        {
          path: '/blacklist',
          component: () => import('@/pages/blacklist'),
        },
        {
          path: '/collect',
          component: () => import('@/pages/collect'),
        },
        {
          path: '/publish',
          component: () => import('@/pages/publish'),
        },
      ]
    },
  ]
})
