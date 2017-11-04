import { request, config } from 'utils'

const { api } = config
const { profitManage } = api

export async function query (params) {
  return request({
    url: profitManage,
    method: 'get',
    data: params,
  })
}
export async function recharge (params) {
  return request({
    url: profitManage,
    method: 'post',
    data: params,
  })
}

