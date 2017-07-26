import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'merchantInfo',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/merchantInfo'))
              cb(null, require('./routes/merchant/info/'))
            }, 'merchantInfo')
          },
        }, {
          path: 'merchantBank',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/merchantBank'))
              cb(null, require('./routes/merchant/bank/'))
            }, 'merchantBank')
          },
        }, {
          path: 'merchantKey',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/merchantKey'))
              cb(null, require('./routes/merchant/key/'))
            }, 'merchantKey')
          },
        }, {
          path: 'merchantRate',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/merchantRate'))
              cb(null, require('./routes/merchant/rate/'))
            }, 'merchantRate')
          },
        }, {
          path: 'payOrder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/payOrder'))
              cb(null, require('./routes/pay/order/'))
            }, 'payOrder')
          },
        }, {
          path: 'withdrawOrder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/withdrawOrder'))
              cb(null, require('./routes/withdraw/order/'))
            }, 'withdrawOrder')
          },
        }, {
          path: 'notWithdrawOrder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/notWithdrawOrder'))
              cb(null, require('./routes/withdraw/notOrder/'))
            }, 'notWithdrawOrder')
          },
        }, {
          path: 'remit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/remit'))
              cb(null, require('./routes/withdraw/remit/'))
            }, 'notWithdrawOrder')
          },
        }, {
          path: 'flowUser',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/flowUser'))
              cb(null, require('./routes/flow/user/'))
            }, 'flowUser')
          },
        }, {
          path: 'flowFinance',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/flowFinance'))
              cb(null, require('./routes/flow/finance/'))
            }, 'flowFinance')
          },
        }, {
          path: 'flowFinanceOrder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/flowFinanceOrder'))
              cb(null, require('./routes/flow/financeOrder/'))
            }, 'flowFinanceOrder')
          },
        }, {
          path: 'flowOrder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/flowOrder'))
              cb(null, require('./routes/flow/order/'))
            }, 'flowOrder')
          },
        }, {
          path: 'cashierInfo',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/cashierInfo'))
              cb(null, require('./routes/cashier/info/'))
            }, 'cashierInfo')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
