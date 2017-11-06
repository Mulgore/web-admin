import { query } from '../../services/agent/agentInfo'

export default {
  namespace: 'agentInfo',
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
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/agentInfo') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
}
