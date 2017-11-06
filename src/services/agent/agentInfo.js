import { request, config } from 'utils'

const { api } = config
const { agentInfo } = api

export async function query (params) {
  return request({
    url: agentInfo,
    method: 'get',
    data: params,
  })
}
