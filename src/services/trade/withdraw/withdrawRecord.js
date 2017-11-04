import { request, config } from 'utils'

const { api } = config
const { withdrawRecord } = api

export async function query (params) {
  return request({
    url: withdrawRecord.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function InfoById (params) {
  return request({
    url: withdrawRecord,
    method: 'get',
    data: params,
  })
}
