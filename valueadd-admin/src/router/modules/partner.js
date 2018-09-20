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
            path: 'smscode/index',
            component: () => import('@/views/partner/business/smscode/index'),
            name: 'smscode',
            meta: {title: 'smscode', noCache: true}
        },
        {
            path: 'mmscode',
            component: () => import('@/views/partner/business/mmscode/index'),
            name: 'mmscode',
            meta: {title: 'mmscode', noCache: true}
        },
        {
            path: 'ivrcode',
            component: () => import('@/views/partner/business/ivrcode/index'),
            name: 'ivrcode',
            meta: {title: 'ivrcode', noCache: true}
        },
        {
            path: 'netcode',
            component: () => import('@/views/partner/business/netcode/index'),
            name: 'netcode',
            meta: {title: 'netcode', noCache: true}
        },
        {
          path: 'ctrlconfig/index',
          component: ()=> import('@/views/partner/business/openCtrlConfig/index'),
          name: 'serviceCtrlConfig',
          meta: { title: 'serviceCtrlConfig', noCache: 'true'},
          hidden: true
        }
    ]
  }]
}


export default partnerRouter
