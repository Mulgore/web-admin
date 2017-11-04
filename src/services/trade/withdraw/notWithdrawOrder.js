import { request, config } from 'utils'

const { api } = config
const { notWithdrawOrder } = api

export async function query (params) {
  return request({
    url: notWithdrawOrder.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function InfoById (params) {
  return request({
    url: notWithdrawOrder,
    method: 'get',
    data: params,
  })
}

export async function downloadExcel (params) {
  return request({
    url: notWithdrawOrder.replace('/:id', '')+'/download',
    method: 'get',
    data: params,
  })
}
