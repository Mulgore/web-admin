import { request, config } from 'utils'

const { api } = config
const { settingRole } = api

export async function query (params) {
  return request({
    url: settingRole.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
export async function updateRole (params) {
  return request({
    url: settingRole.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}


export async function deleteRole (params) {
  return request({
    url: settingRole,
    method: 'delete',
    data: params,
  })
}
