import modelExtend from 'dva-model-extend'
import {query, InfoById, downloadExcel} from '../../services/creditCard/creditCardOrder'
import {pageModel} from '../common'

export default modelExtend(pageModel, {

  namespace: 'creditCardOrder',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'InfoView',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/creditCardOrder') {
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
    * InfoView({payload}, {select, call, put}) {
      const id = yield select(({payOrder}) => payOrder.currentItem.id)
      const InfoView = {...payload, id}
      const data = yield call(InfoById, InfoView)
      if (data.success) {
        yield put({type: 'hideModal'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    * download({payload}, {call}) {
      yield call(downloadExcel, payload)
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
