import request from '@/utils/request'

export function fetchKefuValueaddOrderList(query) {
    return request({
        url: '/kefu/list',
        method: 'get',
        params: query
    })
}