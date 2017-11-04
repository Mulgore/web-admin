import modelExtend from 'dva-model-extend'
import {query, qrcodeApplyAdd} from '../../services/qrcode/qrcodeApply'
import {pageModel} from '../common'

export default modelExtend(pageModel, {

  namespace: 'qrcodeApply',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'InfoView',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/qrcodeApply') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    * query({
              payload={},
            }, {call, put}) {
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
            },
          },
        })
      } else {
        throw data
      }
    },
    * QRCodeAdd({payload}, {call, put}) {
      const data = yield call(qrcodeApplyAdd, payload)
      if (data.success) {
        yield put({type: 'hideModal'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
  },

  reducers: {

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },

  },
})
