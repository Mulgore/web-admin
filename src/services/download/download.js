import { request, config } from 'utils'
import axios from 'axios'
import download from 'downloadjs'

const { api } = config
const { downloadFile } = api

export async function query (params) {
  return request({
    url: downloadFile.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function downloadExcel (params) {
  let url='?path='+params.title
  axios({
    url: downloadFile.replace('/:id', '')+'/out'+url,
    method: 'get',
    withCredentials: true,
    responseType: 'blob',
    headers: {
      'Accept': 'application/vnd.openxmlformats-officedocument'
      + '.spreadsheetml.sheet',
    },
  }).then(function(response) {
    download(response.data, params.title);
  });
}
