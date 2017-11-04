import { request, config } from 'utils'

const { api } = config
const { merchantManage } = api

export async function query (params) {
  return request({
    url: merchantManage.replace('/:id', ''),
    method: 'get',
    data: params,
  })

}
export async function queryPayType (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/payType',
    method: 'get',
    data: params,
  })

}

export async function removeRate (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/remove/rate/:id',
    method: 'delete',
    data: params,
  })

}

export async function addRate (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/add/rate',
    method: 'post',
    data: params,
  })

}

export async function queryBank (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/bank/:id',
    method: 'get',
    data: params,
  })

}
export async function createMerchantView (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/create/view',
    method: 'get',
    data: params,
  })

}

export async function createMerchantInfo (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/create/info',
    method: 'post',
    data: params,
  })

}

export async function createMerchantRate (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/create/rate',
    method: 'post',
    data: params,
  })

}

export async function createMerchantBank (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/create/bank',
    method: 'post',
    data: params,
  })

}
export async function getBankData (params) {
  return request({
    url: merchantManage.replace('/:id', '')+'/getBank',
    method: 'get',
    data: params,
  })

}
