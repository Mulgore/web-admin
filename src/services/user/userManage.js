import { request, config } from 'utils'

const { api } = config
const { userManage } = api

export async function query (params) {
  return request({
    url: userManage.replace('/:id', ''),
    method: 'get',
    data: params,
  })

}
export async function queryUserList (params) {
  return request({
    url: userManage.replace('/:id', '')+'/userList',
    method: 'get',
    data: params,
  })

}
