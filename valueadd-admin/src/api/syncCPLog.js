import request from '@/utils/request'

export function fetchSyncCPLogList(query) {
    return request({
        url: '/syncCPLog/list',
        method: 'get',
        params: query
    })
}