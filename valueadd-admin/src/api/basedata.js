import request from '@/utils/request'

export function fetchWhitelist(query) {
    return request({
        url: '/whitelist/list',
        method: 'get',
        params: query
    })
}

export function addWhitelist(data) {
    return request({
        url: '/whitelist/add',
        method: 'post',
        params: data
    })
}

export function fetchBlacklist(query) {
    return request({
        url: '/blacklist/list',
        method: 'get',
        params: query
    })
}

export function addBlacklist(data) {
    return request({
        url: '/blacklist/add',
        method: 'post',
        params: data
    })
}
