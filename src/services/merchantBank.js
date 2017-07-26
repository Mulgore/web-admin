import { request, config } from 'utils'
const { api } = config
const { merchantBank } = api

export async function query (params) {
  return request({
    url: merchantBank,
    method: 'get',
    data: params,
  })
}
