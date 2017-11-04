import { request, config } from 'utils'

const { api } = config
const { profitOrder } = api

export async function query (params) {
  return request({
    url: profitOrder.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function InfoById (params) {
  return request({
    url: profitOrder,
    method: 'get',
    data: params,
  })
}

export async function downloadExcel (params) {
  return request({
    url: profitOrder.replace('/:id', '')+'/download',
    method: 'get',
    data: params,
  })
}
