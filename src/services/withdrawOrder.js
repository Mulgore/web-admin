import { request, config } from 'utils'
const { api } = config
const { withdrawOrder } = api

export async function query (params) {
  return request({
    url: withdrawOrder,
    method: 'get',
    data: params,
  })
}
