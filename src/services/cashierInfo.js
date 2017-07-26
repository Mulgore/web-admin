import { request, config } from 'utils'
const { api } = config
const { cashierInfo } = api

export async function query (params) {
  return request({
    url: cashierInfo,
    method: 'get',
    data: params,
  })
}
