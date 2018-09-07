import request from '@/utils/request'

export function fetchServiceCodeList(query) {
    return request({
        url: '/serviceCode/list',
        method: 'get',
        params: query
    })
}

export function addServiceCode(serviceCode) {
    return request({
        url: '/serviceCode/add',
        method: 'post',
        params: serviceCode
    })
}

export function editServiceCode(serviceCode) {
    return request({
        url: '/serviceCode/edit',
        method: 'post',
        params: serviceCode
    })
}

export function deleteServiceCode(pkId) {
    return request({
        url: '/serviceCode/delete',
        method: 'get',
        params: pkId
    })
}