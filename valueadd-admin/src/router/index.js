import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRouterMap = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () =>
      import ('@/views/login/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  }
]

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }

//   ]
// })

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
