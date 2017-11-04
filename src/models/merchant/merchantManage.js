import modelExtend from 'dva-model-extend'
import {
  query,
  queryPayType,
  removeRate,
  addRate,
  queryBank,
  createMerchantInfo,
  createMerchantView,
  createMerchantRate,
  createMerchantBank,
  getBankData
} from '../../services/merchant/merchantManage'
import {pageModel} from '../common'
import {message} from 'antd'

export default modelExtend(pageModel, {

  namespace: 'merchantManage',
  state: {
    currentItem: {},
    modalVisible: false,
    modalVisibleQRCode: false,
    modalVisiblePayType: false,
    modalVisibleRate: false,
    modalVisibleBank: false,
    modalVisibleCBank: false,
    modalVisibleCreate: false,
    modalVisibleCRate: false,
    modalType: 'InfoView',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/merchantManage') {
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
            },
          },
        })
      } else {
        throw data
      }
    },
    * queryPayType({payload = {}}, {call, put}) {
      const data = yield call(queryPayType, payload)
      if (data.success) {
        yield put({
          type: 'showModalPayType',
          payload: {
            listPayType: data.data,
            merchantId: payload.id,
            paginationPayType: {
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
    * queryBankInfo({payload}, {call, put}) {
      const data = yield call(queryBank, {id: payload.id})
      if (data.success) {
        yield put({
          type: 'showModalBank',
          payload: {
            merchantBankInfo: data.bankInfo,
          }
        })
      } else {
        throw data
      }
    },
    * removeRate({payload}, {call, put}) {
      const data = yield call(removeRate, {id: payload.id})
      if (data.success) {
        message.success(data.message)
        yield put({
          type: 'queryPayType',
          payload: data
        })
      } else {
        throw data
      }
    },
    * addRate({payload}, {call, put}) {
      const data = yield call(addRate, payload)
      if (data.success) {
        message.success(data.message)
        yield put({
          type: 'hideModalRate',
          payload: data
        })
        yield put({
          type: 'queryPayType',
          payload: data
        })
      } else {
        throw data
      }
    },

    * createMerchantView({payload}, {call, put}) {
      const data = yield call(createMerchantView, payload)
      if (data.success) {
        yield put({
          type: 'showModalCreate',
          payload: {
            ...data
          }
        })
      } else {
        throw data
      }
    },

    * createMerchantInfo({payload}, {call, put}) {
      const data = yield call(createMerchantInfo, payload)
      console.log(data)
      if (data.success) {
        yield put({type: 'hideModalCreate'})
        yield put({
          type: 'showModalCRate',
          payload: data,
        })
      } else {
        throw data
      }
    },

    * createMerchantRate({payload}, {call, put}) {
      const data = yield call(createMerchantRate, payload)
      if (data.success) {
        yield put({type: 'hideModalCRate'})
        yield put({
          type: 'showModalCBank',
          payload: {
            ...data
          }
        })
      } else {
        throw data
      }
    },
    * createMerchantBank({payload}, {call, put}) {
      const data = yield call(createMerchantBank, payload)
      if (data.success) {
        yield put({type: 'hideModalCBank'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    * getBankData({payload}, {call, put}) {
      const data = yield call(getBankData, payload)
      if (data.success) {
        yield put({
          type: 'showModalCBank',
          payload: {
            bankSubId: data.bankSubId,
            bankSubLists: data.bankSubLists,
          },
        })
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

    showModalQRCode(state, {payload}) {
      return {...state, ...payload, modalVisibleQRCode: true}
    },

    hideModalQRCode(state) {
      return {...state, modalVisibleQRCode: false}
    },

    showModalPayType(state, {payload}) {
      return {...state, ...payload, modalVisiblePayType: true}
    },

    hideModalPayType(state) {
      return {...state, modalVisiblePayType: false}
    },

    showModalRate(state, {payload}) {
      return {...state, currentItem: payload, modalVisibleRate: true}
    },

    hideModalRate(state) {
      return {...state, modalVisibleRate: false}
    },

    showModalBank(state, {payload}) {
      return {...state, ...payload, modalVisibleBank: true}
    },

    hideModalBank(state) {
      return {...state, modalVisibleBank: false}
    },

    showModalCreate(state, {payload}) {
      return {...state, ...payload, modalVisibleCreate: true}
    },

    hideModalCreate(state) {
      return {...state, modalVisibleCreate: false}
    },

    showModalCBank(state, {payload}) {
      return {...state, ...payload, modalVisibleCBank: true}
    },

    hideModalCBank(state) {
      return {...state, modalVisibleCBank: false}
    },

    showModalCRate(state, {payload}) {
      return {...state, ...payload, modalVisibleCRate: true}
    },

    hideModalCRate(state) {
      return {...state, modalVisibleCRate: false}
    },
  },
})
