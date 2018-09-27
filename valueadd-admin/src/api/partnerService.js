import request from '@/utils/request'

export function fetchPartnerServiceList(query) {
    return request({
        url: '/partnerService/list',
        method: 'get',
        params: query
    })
}

export function fetchAllPartnerServiceList(query) {
    return request({
        url: '/partnerService/listAll',
        method: 'get',
        params: query
    })
}

export function addPartnerService(partnerService) {
    return request({
        url: '/partnerService/add',
        method: 'post',
        params: partnerService
    })
}

export function editPartnerService(partnerService) {
    return request({
        url: '/partnerService/edit',
        method: 'post',
        params: partnerService
    })
}

export function deletePartnerService(pkId) {
    return request({
        url: '/partnerService/delete',
        method: 'get',
        params: pkId
    })
}

export function getCPSN(partnerId) {
    return request({
        url: '/partnerService/searialNumber',
        method: 'get',
        params: partnerId
    })
}

export function reloadPartnerService(partnerServicePKId) {
    return request({
        url: '/partnerService/reload',
        method: 'get',
        params: partnerServicePKId
    })
}