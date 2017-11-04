import { request, config } from 'utils'

const { api } = config
const { dashboard } = api

export async function query (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}

export async function querySales (params) {
  return request({
    url: dashboard+'/sales',
    method: 'get',
    data: params,
  })
}
