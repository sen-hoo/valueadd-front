import request from '@/utils/request'
// 查询列表
export function fetchGatewaylist(query) {
  return request({
    url: '/gateway/list',
    method: 'get',
    params: query
  })
}
// 删除网关信息
export function deleteGateway(pkId) {
  return request({
    url: '/gateway/delete',
    method: 'get',
    params: pkId
  })
}
// 添加网关信息
export function addGateway(gateway) {
  return request({
    url: '/gateway/add',
    method: 'post',
    params: gateway
  })
}
// 修改网关信息
export function editGateway(gateway) {
    return request({
        url: '/gateway/edit',
        method: 'post',
        params: gateway
    })
}
