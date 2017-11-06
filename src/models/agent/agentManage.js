import modelExtend from 'dva-model-extend'
import {
  query,
  queryPayType,
  disabledAgent,
  create,
  update,
  updateEdit,
  getBankData,
  removeRate,
  addRate,
  queryProfit,
  queryProfitRecord,
  queryProfitWithdraw,
} from '../../services/agent/agentManage'
import {pageModel} from '../common'
import {message} from 'antd'

export default modelExtend(pageModel, {

  namespace: 'agentManage',
  state: {
    currentItem: {},
    modalVisible: false,
    modalVisiblePayType: false,
    modalVisibleEdit: false,
    modalVisibleBank: false,
    modalVisibleRate: false,
    modalVisibleProfit: false,
    modalVisibleProfitRecord: false,
    modalVisibleProfitWithdraw: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/agentManage') {
          dispatch({
            type: 'query',
            payload: {
              ...location.query,
            }
          })
        }
        if (location.pathname === '/agentManage/profitRecord') {
          dispatch({
            type: 'queryProfitWithdraw',
            payload: {
              ...location.query,
            }
          })
        }
        if (location.pathname === '/agentManage/profitRecord') {
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
            agentUid: payload.uid,
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
    * updateAgentView({payload}, {call, put}) {
      const data = yield call(update, {id: payload.id})
      if (data.success) {
        yield put({
          type: 'showModalEdit',
          payload: {
            modalType: 'update',
            agentInfo: {
              ...data.agentInfo,
              realName: data.realName,
              idNumber: data.idNumber,
            },
            agentLevelData: data.agentLevelData,
            addressData: data.addressData,
          }
        })
      } else {
        throw data
      }
    },
    * updateAgent({payload}, {call, put}) {
      const data = yield call(updateEdit, payload)
      if (data.success) {
        yield put({type: 'hideModalEdit'})
        yield put({
          type: 'showModalBank',
          payload: {
            agentBank: {
              ...data.agentBank,
              bankId: data.bankId,
            },
            agentUid: data.agentBank.uid,
            bankSubId: data.bankSubId,
            bankLists: data.bankLists,
            bankSubLists: data.bankSubLists,
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
        })
      } else {
        throw data
      }
    },
    * updateBank({payload}, {call, put}) {
      const data = yield call(updateEdit, payload)
      if (data.success) {
        yield put({type: 'hideModalBank'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    * createAgentView({payload}, {call, put}) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({
          type: 'showModalEdit',
          payload: {
            modalType: 'create',
            addressData: data.addressData,
            agentLevelData:data.agentLevelData,
          }
        })
      } else {
        throw data
      }
    },
    * queryProfit({payload}, {call, put}) {
      const data = yield call(queryProfit, {id: payload.id})
      if (data.success) {
        yield put({
          type: 'showModalProfit',
          payload: {
            ...data
          }
        })
      } else {
        throw data
      }
    },
    * disabledAgent({payload}, {call, put}) {
      const data = yield call(disabledAgent, {id: payload.currentItem.id})
      if (data.success) {
        message.success(data.message)
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

    * getBankData({payload}, {call, put}) {
      const data = yield call(getBankData, payload)
      if (data.success) {
        yield put({
          type: 'showModalBank',
          payload: {
            bankSubId: data.bankSubId,
            bankSubLists: data.bankSubLists,
          },
        })
      } else {
        throw data
      }
    },
    * queryProfitWithdraw({payload = {}}, {call, put}) {
      const data = yield call(queryProfitWithdraw, payload)
      if (data.success) {
        yield put({
          type: 'showModalProfitWithdraw',
          payload: {
            listProfitWithdraw: data.data,
            agentUid: payload.uid,
            paginationProfitWithdraw: {
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
    * queryProfitRecord({payload = {}}, {call, put}) {
      const data = yield call(queryProfitRecord, payload)
      if (data.success) {
        yield put({
          type: 'showModalProfitRecord',
          payload: {
            listProfitRecord: data.data,
            agentUid: payload.uid,
            paginationProfitRecord: {
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
  },

  reducers: {

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },

    showModalPayType(state, {payload}) {
      return {...state, ...payload, modalVisiblePayType: true}
    },

    hideModalPayType(state) {
      return {...state, modalVisiblePayType: false}
    },

    showModalEdit(state, {payload}) {
      return {...state, ...payload, modalVisibleEdit: true}
    },

    hideModalEdit(state) {
      return {...state, modalVisibleEdit: false}
    },

    showModalBank(state, {payload}) {
      return {...state, ...payload, modalVisibleBank: true}
    },

    hideModalBank(state) {
      return {...state, modalVisibleBank: false}
    },

    showModalRate(state, {payload}) {
      return {...state, currentItem: payload, modalVisibleRate: true}
    },

    hideModalRate(state) {
      return {...state, modalVisibleRate: false}
    },

    showModalProfit(state, {payload}) {
      return {...state, currentItem: payload, modalVisibleProfit: true}
    },

    hideModalProfit(state) {
      return {...state, modalVisibleProfit: false}
    },

    showModalProfitWithdraw(state, {payload}) {
      return {...state, ...payload, modalVisibleProfitWithdraw: true}
    },

    hideModalProfitWithdraw(state) {
      return {...state, modalVisibleProfitWithdraw: false}
    },

    showModalProfitRecord(state, {payload}) {
      return {...state, ...payload, modalVisibleProfitRecord: true}
    },

    hideModalProfitRecord(state) {
      return {...state, modalVisibleProfitRecord: false}
    },

  },
})
