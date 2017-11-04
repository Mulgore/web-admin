import { query, recharge } from '../../services/flow/flowFinance'
import { message } from 'antd'

export default {
  namespace: 'flowFinance',

  state: {
    info: {},
    pay: {},
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
    * query ({ payload }, { call, put }) {
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

    * recharge ({ payload }, { call, put }) {
      const data = yield call(recharge, payload)
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'query', payload: data })
        yield put({ type: 'showModal', payload: data })
      } else {
        throw data
      }
    },

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/flowFinance') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
}
