import { request, config } from 'utils'
import axios from 'axios'
import download from 'downloadjs'

const { api } = config
const { qrcodeList } = api

export async function query (params) {
  return request({
    url: qrcodeList.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
export async function queryOut (params) {
  return request({
    url: qrcodeList.replace('/:id', '')+'/out',
    method: 'get',
    data: params,
  })
}

export async function InfoById (params) {
  return request({
    url: qrcodeList,
    method: 'get',
    data: params,
  })
}

export async function downloadQRCode (params) {
  axios({
    url: qrcodeList.replace('/:id', '')+'/download/'+params.id,
    method: 'get',
    withCredentials: true,
    responseType: 'blob',
    headers: {
      'Accept': 'application/octet-stream',
    },
  }).then(function(response) {
    console.log(response.filename)
    download(response.data, '二维码.zip');
  });

}
