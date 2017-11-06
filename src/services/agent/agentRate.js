import { request, config } from 'utils'

const { api } = config
const { agentRate } = api

export async function query (params) {
  return request({
    url: agentRate,
    method: 'get',
    data: params,
  })
}
