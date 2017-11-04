import {query,querySales } from '../services/dashboard'
import {parse} from 'qs'


export default {
  namespace: 'dashboard',
  state: {
    sales: [],
    numbers: [],
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'query'})
    },
  },
  effects: {
    * query ({payload,}, {call, put}) {
      const data = yield call(query, parse(payload))
      yield put({type: 'querySuccess', payload: {...data}})
    },
  },
  reducers: {
    querySuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
