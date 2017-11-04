import { request, config } from 'utils'

const { api } = config
const { flowFinanceOrder } = api

export async function query (params) {
  return request({
    url: flowFinanceOrder,
    method: 'get',
    data: params,
  })
}
