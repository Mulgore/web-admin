import { request, config } from 'utils'

const { api } = config
const { remit } = api

export async function query (params) {
  return request({
    url: remit.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
export async function autoById (params) {
  return request({
    url: remit,
    method: 'post',
    data: params,
  })
}

export async function autoAll (params) {
  return request({
    url: remit.replace('/:id', ''),
    method: 'patch',
    data: params,
  })
}
