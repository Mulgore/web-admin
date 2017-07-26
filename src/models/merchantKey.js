import { query, update } from '../services/merchantKey';

export default {
  namespace: 'merchantKey',
  state: {
    key:{},
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
    *query ({ payload = {} }, { call, put }) {
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
    *'auto' ({ payload }, { call, put }) {
      const data = yield call(update, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data,
          },
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/merchantKey') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
};
