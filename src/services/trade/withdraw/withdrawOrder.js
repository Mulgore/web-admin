import { request, config } from 'utils'

const { api } = config
const { withdrawOrder } = api

export async function query (params) {
  return request({
    url: withdrawOrder.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function InfoById (params) {
  return request({
    url: withdrawOrder,
    method: 'get',
    data: params,
  })
}

export async function downloadExcel (params) {
  return request({
    url: withdrawOrder.replace('/:id', '')+'/download',
    method: 'get',
    data: params,
  })
}
