import request from '@/utils/request'

export function addPartnerServiceRoute(serviceRoute) {
    return request({
        url: '/partnerServiceRoute/add',
        method: 'post',
        params: serviceRoute
    })
}

export function editPartnerServiceRoute(serviceRoute) {
    return request({
        url: '/partnerServiceRoute/edit',
        method: 'post',
        params: serviceRoute
    })
}

export function deletePartnerServiceRoute(pkId) {
    return request({
        url: '/partnerServiceRoute/delete',
        method: 'get',
        params: pkId
    })
}