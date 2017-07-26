import { request, config } from 'utils'
const { api } = config
const { flowUser } = api

export async function query (params) {
  return request({
    url: flowUser,
    method: 'get',
    data: params,
  })
}
