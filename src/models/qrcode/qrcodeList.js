import modelExtend from 'dva-model-extend'
import {query, InfoById, downloadQRCode, queryOut} from '../../services/qrcode/qrcodeList'
import {pageModel} from '../common'

export default modelExtend(pageModel, {

  namespace: 'qrcodeList',
  state: {
    currentItem: {},
    modalVisible: false,
    modalVisibleOut: false,
    modalType: 'InfoView',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/qrcodeList') {
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
              payload,
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
              statPay: data.statPay,
              statTotal: data.statTotal,
            },
          },
        })
      } else {
        throw data
      }
    },
    * queryOut({ payload={} }, {call, put}) {
      const data = yield call(queryOut, payload)
      if (data.success) {
        yield put({
          type: 'showModalOut',
          payload: {
            listOut: data.data,
            paginationOut: {
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
    * InfoView({payload}, {select, call, put}) {
      const id = yield select(({qrcodeList}) => qrcodeList.currentItem.id)
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
      yield call(downloadQRCode, {id:payload.id})
    },
  },

  reducers: {

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },

    showModalOut(state, {payload}) {
      return {...state, ...payload, modalVisibleOut: true}
    },

    hideModalOut(state) {
      return {...state, modalVisibleOut: false}
    },

  },
})
