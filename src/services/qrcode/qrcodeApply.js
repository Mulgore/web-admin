import { request, config } from 'utils'

const { api } = config
const { qrcodeApply } = api

export async function query (params) {
  return request({
    url: qrcodeApply,
    method: 'get',
    data: params,
  })
}

export async function qrcodeApplyAdd (params) {
  return request({
    url: qrcodeApply,
    method: 'post',
    data: params,
  })
}

