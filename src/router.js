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
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'settingRole',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/setting/settingRole'))
              cb(null, require('./routes/setting/role/'))
            }, 'settingRole')
          },
        }, {
          path: 'settingPermission',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/setting/settingPermission'))
              cb(null, require('./routes/setting/permission/'))
            }, 'settingPermission')
          },
        }, {
          path: 'merchantManage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/merchant/merchantManage'))
              cb(null, require('./routes/merchant/manage/'))
            }, 'merchantManage')
          },
        }, {
          path: 'userManage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user/userManage'))
              cb(null, require('./routes/user/manage/'))
            }, 'merchantManage')
          },
        }, {
          path: 'payOrder',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trade/pay/payOrder'))
              cb(null, require('./routes/pay/order/'))
            }, 'payOrder')
          },
        }, {
          path: 'profitOrder',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trade/profit/profitOrder'))
              cb(null, require('./routes/profit/order/'))
            }, 'profitOrder')
          },
        }, {
          path: 'profitManage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trade/profit/profitManage'))
              cb(null, require('./routes/profit/manage/'))
            }, 'profitManage')
          },
        }, {
          path: 'withdrawOrder',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trade/withdraw/withdrawOrder'))
              cb(null, require('./routes/withdraw/order/'))
            }, 'withdrawOrder')
          },
        }, {
          path: 'notWithdrawOrder',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trade/withdraw/notWithdrawOrder'))
              cb(null, require('./routes/withdraw/notOrder/'))
            }, 'notWithdrawOrder')
          },
        }, {
          path: 'withdrawRecord',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trade/withdraw/withdrawRecord'))
              cb(null, require('./routes/withdraw/record/'))
            }, 'withdrawRecord')
          },
        }, {
          path: 'qrcodeApply',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/qrcode/qrcodeApply'))
              cb(null, require('./routes/qrcode/apply/'))
            }, 'qrcodeApply')
          },
        }, {
          path: 'qrcodeList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/qrcode/qrcodeList'))
              cb(null, require('./routes/qrcode/list/'))
            }, 'qrcodeList')
          },
        }, {
          path: 'remit',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trade/withdraw/remit'))
              cb(null, require('./routes/withdraw/remit/'))
            }, 'notWithdrawOrder')
          },
        }, {
          path: 'flowUser',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/flow/flowUser'))
              cb(null, require('./routes/flow/user/'))
            }, 'flowUser')
          },
        }, {
          path: 'flowFinance',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/flow/flowFinance'))
              cb(null, require('./routes/flow/finance/'))
            }, 'flowFinance')
          },
        }, {
          path: 'flowFinanceOrder',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/flow/flowFinanceOrder'))
              cb(null, require('./routes/flow/financeOrder/'))
            }, 'flowFinanceOrder')
          },
        }, {
          path: 'flowOrder',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/flow/flowOrder'))
              cb(null, require('./routes/flow/order/'))
            }, 'flowOrder')
          },
        }, {
          path: 'cashierInfo',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/cashier/cashierInfo'))
              cb(null, require('./routes/cashier/info/'))
            }, 'cashierInfo')
          },
        }, {
          path: 'downloadFile',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/download/download'))
              cb(null, require('./routes/download/'))
            }, 'downloadFile')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
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
