import modelExtend from 'dva-model-extend'
import {query, downloadExcel} from '../../services/download/download'
import {pageModel} from '../common'

export default modelExtend(pageModel, {

  namespace: 'downloadFile',
  state: {
    currentItem: {},
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/downloadFile') {
          dispatch({
            type: 'query',
            payload: {
              ...location.query,
            }
          })
        }
      })
    },
  },

  effects: {
    * query({payload = {}}, {call, put}) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
              statPay: data.statPay,
              statTotal: data.statTotal,
              merchantUid:data.merchants,
            },
          },
        })
      } else {
        throw data
      }
    },
    * download({payload}, { call, put}) {
      yield call(downloadExcel, payload)
      yield put({type: 'query'})
    },
  },
})
