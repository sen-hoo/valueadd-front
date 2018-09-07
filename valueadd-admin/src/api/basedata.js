import request from '@/utils/request'
// 获取白名单列表
export function fetchWhitelist(query) {
    return request({
        url: '/whitelist/list',
        method: 'get',
        params: query
    })
}
// 添加白名单
export function addWhitelist(data) {
    return request({
        url: '/whitelist/add',
        method: 'post',
        params: data
    })
}
// 删除白名单
export function deleteWhitelist(pkid) {
    return request({
        url: '/whitelist/delete',
        method: 'get',
        params: pkid
    })
}
// 获取黑名单列表
export function fetchBlacklist(query) {
    return request({
        url: '/blacklist/list',
        method: 'get',
        params: query
    })
}
// 添加黑名单
export function addBlacklist(data) {
    return request({
        url: '/blacklist/add',
        method: 'post',
        params: data
    })
}
/** 删除黑名单 */
export function deleteBlacklist(pkid) {
    return request({
        url: '/blacklist/delete',
        method: 'get',
        params: pkid
    })
}
