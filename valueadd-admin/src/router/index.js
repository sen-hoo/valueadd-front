import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";
/* Router Modules */
import partnerRouter from './modules/partner'

export const constantRouterMap = [{
    path: "/login",
    component: () =>
      import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/401",
    component: () =>
      import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "/404",
    component: () =>
      import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'welcome',
    children: [{
      path: 'welcome',
      component: () =>
        import('@/views/welcome/index'),
      name: 'welcome',
      meta: {
        title: 'welcome',
        icon: 'guide',
        noCache: true
      }
    }]
  }
];

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [{
  path: "/permission",
  component: Layout,
  redirect: "/permission/index",
  alwaysShow: true, // will always show the root menu
  meta: {
    title: "permission",
    icon: "lock",
    roles: ["admin", "editor"] // you can set roles in root nav
  },
  children: [{
      path: "page",
      component: () =>
        import("@/views/permission/page"),
      name: "pagePermission",
      meta: {
        title: "pagePermission",
        roles: ["admin"] // or you can only set roles in sub nav
      }
    },
    {
      path: "directive",
      component: () =>
        import("@/views/permission/directive"),
      name: "directivePermission",
      meta: {
        title: "directivePermission"
        // if do not set roles, means: this page does not require permission
      }
    }
  ]
},
{
  path: '/databoard',
  component: Layout,
  redirect: '/databoard/index',
  meta: {
    title: "dashboard",
    icon: "dashboard",
    noCache: true
  },
  children: [{
    path: 'spcode/index',
    component: () =>
      import('@/views/databoard/spcode/index'),
    name: 'spboard',
    meta: {
      title: 'spboard',
      //icon: 'chart',
      noCache: true
    }
  },
  {
    path: "cpservice/index",
    component: () =>
      import("@/views/databoard/cpservice/index"),
    name: "cpserviceboard",
    meta: {
      title: "cpserviceboard",
      //icon: 'table',
      // if do not set roles, means: this page does not require permission
    }
  }]
},
//基础数据
{
  path: '/basedata',
  component: Layout,
  redirect: '/basedata/index',
  meta: {
    title: "basedata",
    icon: "clipboard",
    noCache: true
  },
  children: [{
    path: 'blackuser/index',
    component: () =>
      import('@/views/basedata/blackuser/index'),
    name: 'blackuser',
    meta: {
      title: 'blackuser',
      //icon: 'chart',
      noCache: true
    }
  },
  {
    path: "freeuser/index",
    component: () =>
      import("@/views/basedata/freeuser/index"),
    name: "freeuser",
    meta: {
      title: "freeuser",
      //icon: 'table',
      // if do not set roles, means: this page does not require permission
    }
  }]
},
//网关路由
{
  path: '/sp',
  component: Layout,
  redirect: '/sp/index',
  meta: {
    title: "sp",
    icon: "international",
    noCache: true
  },
  children: [{//网关
    path: 'gateway/index',
    component: () =>
      import('@/views/sp/gateway/index'),
    name: 'gateway',
    meta: {
      title: 'gateway',
      //icon: 'chart',
      noCache: true
    }
  },
  {//业务代码
    path: 'code/index',
    component: () =>
      import('@/views/sp/code/index'),
    name: 'serviceCode',
    meta: {
      title: 'serviceCode',
      //icon: 'table',
      // if do not set roles, means: this page does not require permission
    }
  },
  {
    path: 'openconfig/edit/:sCodeName/:sCodePKId(\\d+)',
    component: ()=> import('@/views/sp/code/directives/index'),
    name: 'editDirectives',
    meta: { title: 'editDirectives', noCache: 'true'},
    hidden: true
  }]
},
//合作方
partnerRouter,
//账单路由
{
  path: '/bill',
  component: Layout,
  redirect: '/bill/index',
  meta: {
    title: "bill",
    icon: "table",
    noCache: true
  },
  children: [{//按网关代码维度路由
    path: 'spcode/index',
    component: () =>
      import('@/views/bill/spcode/index'),
    name: 'billSpCode',
    meta: {
      title: 'billSpCode',
      //icon: 'chart',
      noCache: true
    }
  },
  {//按合作方维度路由
    path: "cpcode/index",
    component: () =>
      import("@/views/bill/cpcode/index"),
    name: "billCpCode",
    meta: {
      title: "billCpCode",
      //icon: 'table',
      // if do not set roles, means: this page does not require permission
    }
  }]
},
//搜索查询
{
  path: '/search',
  component: Layout,
  redirect: '/search/index',
  meta: {
    title: "search",
    icon: "example",
    noCache: true
  },
  children: [{//搜索订购记录
    path: 'order/index',
    component: () =>
      import('@/views/search/order/index'),
    name: 'searchOrder',
    meta: {
      title: 'searchOrder',
      //icon: 'chart',
      noCache: true
    }
  },
  {//搜索同步日志
    path: "synclog/index",
    component: () =>
      import("@/views/search/synclog/index"),
    name: "synclog",
    meta: {
      title: "synclog",
      //icon: 'table',
      // if do not set roles, means: this page does not require permission
    }
  }]
}
]
