import { request, config } from 'utils'

const { api } = config
const { agentManage } = api

export async function query (params) {
  return request({
    url: agentManage.replace('/:id', ''),
    method: 'get',
    data: params,
  })

}

export async function queryPayType (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/payType',
    method: 'get',
    data: params,
  })

}

export async function update (params) {
  return request({
    url: agentManage,
    method: 'get',
    data: params,
  })

}

export async function updateEdit (params) {
  return request({
    url: agentManage.replace('/:id', ''),
    method: 'post',
    data: params,
  })

}

export async function disabledAgent (params) {
  return request({
    url: agentManage,
    method: 'delete',
    data: params,
  })

}

export async function getBankData (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/getBank',
    method: 'get',
    data: params,
  })

}

export async function create (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/create',
    method: 'get',
    data: params,
  })

}

export async function removeRate (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/remove/rate/:id',
    method: 'delete',
    data: params,
  })

}

export async function addRate (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/add/rate',
    method: 'post',
    data: params,
  })

}
export async function queryProfit (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/profit/:id',
    method: 'get',
    data: params,
  })

}

export async function queryProfitWithdraw (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/profit/withdraw',
    method: 'get',
    data: params,
  })

}

export async function queryProfitRecord (params) {
  return request({
    url: agentManage.replace('/:id', '')+'/profit/record',
    method: 'get',
    data: params,
  })

}
