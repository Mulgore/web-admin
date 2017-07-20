import { query } from '../services/dashboard'
import { parse } from 'qs'


export default {
  namespace: 'dashboard',
  state: {
    sales: [],
    numbers: [],
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'queryWeather' })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      yield put({ type: 'queryWeather', payload: { ...data } })
    },
    *queryWeather ({
      payload,
    }, { call, put }) {
    },
  },
  reducers: {
    queryWeather (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
