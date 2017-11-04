import { request, config } from 'utils'

const { api } = config
const { settingRole } = api

export async function query (params) {
  return request({
    url: settingRole,
    method: 'get',
    data: params,
  })
}
