import Layout from "@/views/layout/Layout";

const partnerRouter = {
  path: '/partner',
  component: Layout,
  redirect: '/partner/partners/index',
  name: 'partner',
  meta: {
    title: 'partner',
    icon: 'peoples',
    noCache: true
  },
  children: [{ //合作方管理
    path: 'partners/index',
    component: () =>
      import('@/views/partner/partners/index'),
    name: 'partners',
    meta: {
      title: 'partners',
      //icon: 'chart',
      noCache: true
    }
  },
  {
    path: 'business',
    component: () => import('@/views/partner/business/index'), // Parent router-view
    name: 'business',
    meta: {title: 'business'},
    redirect: '/partner/business/smscode/index',
    children: [
        {
            path: 'smscode',
            component: () => import('@/views/partner/business/smscode'),
            name: 'smscode',
            meta: {title: 'smscode'}
        },
        {
            path: 'mmscode',
            component: () => import('@/views/partner/business/mmscode'),
            name: 'mmscode',
            meta: {title: 'mmscode'}
        },
        {
            path: 'ivrcode',
            component: () => import('@/views/partner/business/ivrcode'),
            name: 'ivrcode',
            meta: {title: 'ivrcode'}
        },
        {
            path: 'netcode',
            component: () => import('@/views/partner/business/netcode'),
            name: 'netcode',
            meta: {title: 'netcode'}
        }
    ]
  }]
}


export default partnerRouter
