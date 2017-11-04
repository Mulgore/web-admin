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
export async function recharge (params) {
  return request({
    url: flowUser,
    method: 'post',
    data: params,
  })
}

export async function apply (params) {
  return request({
    url: flowUser,
    method: 'patch',
    data: params,
  })
}

export async function getFlows (params) {
  return request({
    url: flowUser+'/getFlows',
    method: 'get',
    data: params,
  })
}
