import { request, config } from 'utils'

const { api } = config
const { creditCardOrder } = api

export async function query (params) {
  return request({
    url: creditCardOrder.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function InfoById (params) {
  return request({
    url: creditCardOrder,
    method: 'get',
    data: params,
  })
}

export async function downloadExcel (params) {
  return request({
    url: creditCardOrder.replace('/:id', '')+'/download',
    method: 'get',
    data: params,
  })
}
