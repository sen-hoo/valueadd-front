import request from '@/utils/request'

export function fetchValueaddList(query) {
    return request({
        url: '/valueaddRecord/list',
        method: 'get',
        params: query
    })
}