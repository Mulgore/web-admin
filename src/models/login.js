import {login, sendSms, forgot} from '../services/app'
import {routerRedux} from 'dva/router'
import {queryURL} from 'utils'
import {message} from 'antd'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    loadingCheck: false,
    modalVisible: false,
  },

  effects: {
    * login({payload}, {put, call}) {
      yield put({type: 'showLoginLoading'})
      const data = yield call(login, payload)
      yield put({type: 'hideLoginLoading'})
      if (data.success) {
        const from = queryURL('from')
        yield put({type: 'app/query'})
        if (from !== '/') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
    * forgot({payload}, {put, call}) {
      const data = yield call(forgot, payload)
      if (data.success) {
        message.success(data.message)
        yield put({type: 'hideModal'})
      } else {
        throw data
      }
    },
    * sendSms({payload}, {put, call}) {
      yield put({type: 'showSmsLoading'})
      const data = yield call(sendSms, payload)
      if (data.success) {
        message.success(data.message)
        yield put({type: 'showModal', payload: {...data}})
      } else {
        yield put({type: 'hideSmsLoading'})
        throw data
      }
    },
  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false,
      }
    },

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },

    showSmsLoading(state) {
      return {...state, loadingCheck: true,
      }
    },

    hideSmsLoading(state) {
      return { ...state, loadingCheck: false,
      }
    },
  },
}
