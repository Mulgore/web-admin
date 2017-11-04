import { request, config } from 'utils'

const { api } = config
const { payOrder } = api

export async function query (params) {
  return request({
    url: payOrder.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function InfoById (params) {
  return request({
    url: payOrder,
    method: 'get',
    data: params,
  })
}

export async function downloadExcel (params) {
  return request({
    url: payOrder.replace('/:id', '')+'/download',
    method: 'get',
    data: params,
  })
}
