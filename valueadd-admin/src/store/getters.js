const getters = {
  language: state => state.app.language,
  //user vuex 
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  setting: state => state.user.setting,
  //权限
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  //系统设置
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  //标签
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  //错误日志
  errorLogs: state => state.errorLog.logs
}
export default getters
