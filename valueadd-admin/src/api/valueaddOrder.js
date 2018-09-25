import request from '@/utils/request'

export function fetchValueaddList(query) {
    request({
        url: '/valueaddRecord/list',
        method: 'get',
        params: query
    })
}