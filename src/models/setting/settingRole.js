import modelExtend from 'dva-model-extend'
import {query, updateRole, deleteRole, queryPerm, statusPerm} from '../../services/setting/settingRole'
import {pageModel} from '../common'
import {message} from 'antd'

export default modelExtend(pageModel, {

  namespace: 'settingRole',
  state: {
    currentItem: {},
    modalVisible: false,
    modalVisiblePerm: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/settingRole') {
          dispatch({
            type: 'query',
            payload: location.query,
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
    * queryPerm({payload = {}}, {call, put}) {
      const data = yield call(queryPerm, payload)
      if (data.success) {
        yield put({
          type: 'showModalPerm',
          payload: {
            listPerm: data.data,
            level: payload.level,
            paginationPerm: {
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
    * updateRoleView({payload}, {put}) {
      yield put({
        type: 'showModal',
        payload: {
          modalType: 'update',
          roleInfo: {
            ...payload,
          },
        }
      })
    },
    * updateRole({payload}, {call, put}) {
      const data = yield call(updateRole, payload)
      if (data.success) {
        message.success(data.message)
        yield put({type: 'hideModal'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    * deleteRole({payload}, {call, put}) {
      const data = yield call(deleteRole, {id: payload.currentItem.id})
      if (data.success) {
        message.success(data.message)
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    * statusPerm({payload}, {call, put}) {
      const data = yield call(statusPerm, payload)
      if (data.success) {
        message.success(data.message)
        yield put({
          type: 'queryPerm',
          payload: {
            level: payload.level
          }
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

    showModalPerm(state, {payload}) {
      return {...state, ...payload, modalVisiblePerm: true}
    },

    hideModalPerm(state) {
      return {...state, modalVisiblePerm: false}
    },

  },
})
