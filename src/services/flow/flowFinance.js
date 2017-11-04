import { request, config } from 'utils'

const { api } = config
const { flowFinance } = api

export async function query (params) {
  return request({
    url: flowFinance,
    method: 'get',
    data: params,
  })
}
export async function recharge (params) {
  return request({
    url: flowFinance,
    method: 'post',
    data: params,
  })
}
