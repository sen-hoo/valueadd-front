import request from '@/utils/request'

/**更新 */
export function editSCodeCtrl(scodeCtrl) {
    return request({
        url: '/serviceCodeCtrl/edit',
        method: 'post',
        params: scodeCtrl
    })
}
/** 查询 */
export function fetchSCodeCtrlList(query) {
    return request({
        url: '/serviceCodeCtrl/list',
        method: 'get',
        params: query
    })
}