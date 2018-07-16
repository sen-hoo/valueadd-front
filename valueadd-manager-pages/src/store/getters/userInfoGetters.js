export const displayName = state => state.userInfo.realName;
export const username = state => state.userInfo.loginName;
export const token = state => state.userInfo.token;
export const authTimeOut = state => state.userInfo.isTimeOut;