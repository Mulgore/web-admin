import modelExtend from 'dva-model-extend'
import {
  query,
  queryChild,
  deletePer,
  updatePerm,
  stateChild,
  removeChild,
  addChildPerm,
  queryProfit,
  queryProfitRecord,
  queryProfitWithdraw,
} from '../../services/setting/settingPermission'
import {pageModel} from '../common'
import {message} from 'antd'

export default modelExtend(pageModel, {

  namespace: 'settingPermission',
  state: {
    currentItem: {},
    modalVisible: false,
    modalVisibleChild: false,
    modalVisibleEdit: false,
    modalVisibleAddChild: false,
    modalVisibleRate: false,
    modalVisibleProfit: false,
    modalVisibleProfitRecord: false,
    modalVisibleProfitWithdraw: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/settingPermission') {
          dispatch({
            type: 'query',
            payload: {
              ...location.query,
            }
          })
        }
        // if (location.pathname === '/settingPermission/profitRecord') {
        //   dispatch({
        //     type: 'queryProfitWithdraw',
        //     payload: {
        //       ...location.query,
        //     }
        //   })
        // }
        // if (location.pathname === '/settingPermission/profitRecord') {
        //   dispatch({
        //     type: 'query',
        //     payload: {
        //       ...location.query,
        //     }
        //   })
        // }
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
    * queryChild({payload = {}}, {call, put}) {
      const data = yield call(queryChild, payload)
      if (data.success) {
        yield put({
          type: 'showModalChild',
          payload: {
            listChild: data.data,
            pid: payload.id,
            paginationChild: {
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
    * updatePermView({payload}, {put}) {
      yield put({
        type: 'showModalEdit',
        payload: {
          modalType: 'update',
          permInfo: {
            ...payload,
          },
        }
      })
    },
    * updatePermChildView({payload}, {put}) {
      yield put({
        type: 'showModalAddChild',
        payload: {
          modalType: 'update',
          childInfo: {
            ...payload,
          },
        }
      })
    },
    * updatePerm({payload}, {call, put}) {
      const data = yield call(updatePerm, payload)
      if (data.success) {
        message.success(data.message)
        yield put({type: 'hideModalEdit'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    * stateChild({payload}, {call, put}) {
      const data = yield call(stateChild, payload)
      if (data.success) {
        message.success(data.message)
        yield put({
          type: 'queryChild',
          payload: {id: payload.pid}
        })
      } else {
        throw data
      }
    },
    * addChildPerm({payload}, {call, put}) {
      const data = yield call(updatePerm, payload)
      if (data.success) {
        message.success(data.message)
        yield put({type: 'hideModalAddChild'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    * updateChildPerm({payload}, {call, put}) {
      const data = yield call(updatePerm, payload)
      if (data.success) {
        message.success(data.message)
        yield put({type: 'hideModalAddChild'})
        console.log(payload.pid)
        yield put({
          type: 'queryChild',
          payload: {id: payload.pid}
        })
      } else {
        throw data
      }
    },
    * deletePer({payload}, {call, put}) {
      const data = yield call(deletePer, {id: payload.currentItem.id})
      if (data.success) {
        message.success(data.message)
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

    showModalChild(state, {payload}) {
      return {...state, ...payload, modalVisibleChild: true}
    },

    hideModalChild(state) {
      return {...state, modalVisibleChild: false}
    },

    showModalEdit(state, {payload}) {
      return {...state, ...payload, modalVisibleEdit: true}
    },

    hideModalEdit(state) {
      return {...state, modalVisibleEdit: false}
    },

    showModalAddChild(state, {payload}) {
      return {...state, ...payload, modalVisibleAddChild: true}
    },

    hideModalAddChild(state) {
      return {...state, modalVisibleAddChild: false}
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
