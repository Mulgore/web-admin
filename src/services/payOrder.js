import { request, config } from 'utils'
const { api } = config
const { payOrder } = api

export async function query (params) {
  return request({
    url: payOrder,
    method: 'get',
    data: params,
  })
}
