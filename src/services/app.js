import { request, config } from 'utils';
import qs from 'qs'
const { api } = config;
const { user, userLogout, userLogin } = api;

export async function login(params) {
  return request({
    url: userLogin,
    method: 'post',
    data: qs.stringify(params),
  })
}

export async function logout(params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query(params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
