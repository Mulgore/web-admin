import { request, config } from 'utils'
const { api } = config
const { notWithdrawOrder } = api

export async function query (params) {
  return request({
    url: notWithdrawOrder,
    method: 'get',
    data: params,
  })
}
