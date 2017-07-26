import { request, config } from 'utils'
const { api } = config
const { flowOrder } = api

export async function query (params) {
  return request({
    url: flowOrder,
    method: 'get',
    data: params,
  })
}
