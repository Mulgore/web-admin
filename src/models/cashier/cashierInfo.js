import { query, payInfo } from '../../services/cashier/cashierInfo'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'cashierInfo',
  state: {
    info: {},
    payInfo: {},
    modalType: 'payInfo',
    modalVisible: false,
  },
  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        ...data,
      }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
  },
  effects: {
    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data,
          },
        })
      }
    },

    * payInfo ({ payload }, { call, put }) {
      const data = yield call(payInfo, payload)
      console.log(data)
      if (data.success) {
        yield put({ type: 'query', payload: data })
        if (data.type === 1) {
          yield put({ type: 'showModal', payload: data })
        } else {
          window.location.href = data.redirectUrl
        }
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/cashierInfo') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
}
