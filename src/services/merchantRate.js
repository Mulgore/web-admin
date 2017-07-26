import { request, config } from 'utils'
const { api } = config
const { merchantRate } = api

export async function query (params) {
  return request({
    url: merchantRate,
    method: 'get',
    data: params,
  })
}
