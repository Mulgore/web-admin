import { request, config } from 'utils'
const { api } = config
const { merchantInfo } = api

export async function query (params) {
  return request({
    url: merchantInfo,
    method: 'get',
    data: params,
  })
}
