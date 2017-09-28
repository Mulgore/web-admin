import {query} from '../services/dashboard';

export default {
  namespace: 'dashboard',
  state: {
    sales: [],
    numbers: [],
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'query'})
    },
  },
  effects: {
    * query({payload}, {call, put}) {
      const data = yield call(query, payload)
      yield put({type: 'querySuccess', payload: {...data}})
    },
  },
  reducers: {
    querySuccess(state, payload) {
      return {...state, ...payload}
    },
  },
}
