import { query, recharge } from '../../../services/trade/profit/profitManage'
import { message } from 'antd'

export default {
  namespace: 'profitManage',

  state: {
    info: {},
  },
  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        ...data,
      }
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
        yield put({ type: 'query'})
      } else {
        throw data
      }
    },

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/profitManage') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
}
