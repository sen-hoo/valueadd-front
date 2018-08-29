const getters = {
  language: state => state.app.language,
  token: state => state.user.token,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
//   sidebar: state => state.app.sidebar,
//   device: state => state.app.device,
//   visitedViews: state => state.tagsView.visitedViews,
//   cachedViews: state => state.tagsView.cachedViews,
//   avatar: state => state.user.avatar,
//   name: state => state.user.name,
//   introduction: state => state.user.introduction,
//   status: state => state.user.status,
//   setting: state => state.user.setting,
//   errorLogs: state => state.errorLog.logs
}
export default getters
