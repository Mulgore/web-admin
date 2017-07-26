import { request, config } from 'utils'
const { api } = config
const { merchantKey } = api

export async function query (params) {
  return request({
    url: merchantKey,
    method: 'get',
    data: params,
  })
}

export async function update () {
  return request({
    url: merchantKey,
    method: 'patch',
  })
}
