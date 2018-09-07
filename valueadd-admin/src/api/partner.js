import request from '@/utils/request'

export function fetchPartnerList(query) {
    return request({
        url: '/partner/list',
        method: 'get',
        params: query
    })
}

export function addPartner(partner) {
    return request({
        url: '/partner/add',
        method: 'post',
        params: partner
    })
}

export function editPartner(partner) {
    return request({
        url: '/partner/edit',
        method: 'post',
        params: partner
    })
}

export function deletePartner(pkId) {
    return request({
        url: '/partner/delete',
        method: 'get',
        params: pkId
    })
}