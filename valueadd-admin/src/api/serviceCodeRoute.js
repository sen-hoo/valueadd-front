import request from '@/utils/request'

/**查询列表 */
export function fetchServiceCodeRouteList(query) {
    return request({
        url: '/serviceCodeRoute/list',
        method: 'get',
        params: query
    })
}
/**增加 */
export function addServiceCodeRoute(serviceCodeRoute) {
    return request({
        url: '/serviceCodeRoute/add',
        method: 'post',
        params: query
    })
}
/**删除 */
export function deleteServiceCodeRoute(pkId) {
    return request({
        url: '/serviceCodeRoute/delete',
        method: 'get',
        params: pkId
    })
}
/** 修改 */
export function editServiceCodeRoute(serviceCodeRoute) {
    return request({
        url: '/serviceCodeRoute/update',
        method: 'post',
        params: serviceCodeRoute
    })
}

