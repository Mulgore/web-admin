import { query } from '../services/merchantInfo';

export default {
  namespace: 'merchantInfo',
  state: {
    info:{},
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
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/merchantInfo') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
};
