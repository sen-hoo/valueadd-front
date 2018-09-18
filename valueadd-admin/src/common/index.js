export const ServerCodeEnum = {
    Username_Password_Error: 20001,//用户登名或密码异常
    Token_Expired: 20002,//token 过期或非法
    Be_Logout: 20003    //被登出
}
/**代码类型 */
export const ServiceCodeEnum = [{type: 1, label: '短信'}, {type: 2, label: '彩信'}, {type: 3, label: 'IVR'}, {type: 4, label: '联网'}]
/**路由匹配类型 */
export const RouteTypeOptionsEnum = [{type: 1, label: '精确'}, {type: 2, label: '模糊'}, { type: 3, label:'正则'}]

export const CPServiceStatus = {
    ACTIVATED: 1,
    SYNC_HALT: 2,
    SUSPEND: 3
}
