import request from '@/utils/request'

export function fetchPartnerServiceCtrlList(query) {
    return request({
        url: '/partnerServiceCtrl/list',
        method: 'get',
        params: query
    })
}

export function editpartnerServiceCtrl(partnerServiceCtrl) {
    return request({
        url: '/partnerServiceCtrl/edit',
        method: 'post',
        params: partnerServiceCtrl
    })
}
// 修改合作方业务控制状态
export function changeStatus(status) {
    return request({
        url: '/partnerServiceCtrl/changeStatus',
        method: 'get',
        params: status
    })
}