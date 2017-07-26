const Mock = require('mockjs')
const config = require('../utils/config')

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (const item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}


let Id = 0
const payOrder = Mock.mock({
  'data|1000': [
    {
      id () {
        Id += 1
        return Id + 10000
      },
      realName: '@cname',
      'merchantOutNo|798123123812123123-1798123123812123123': 798123123812123123,
      'orderId|798123123812123123-1798123123812123123': 798123123812123123,
      'type|1-3': 1,
      'amount|1-1798123': 1,
      'payType|1': [10, 11, 20, 21, 22, 23, 24, 40, 41, 42, 43, 44, 50, 51, 52, 31, 13, 32],
      'status|1-5': 1,
      'comments|10-200': 1,
      'merchantNo|798123123812123123-1798123123812123123': 798123123812123123,
      createTime: '@dateTime',
      payTime: '@dateTime',
    },
  ],
}).data

const withdrawOrder = Mock.mock({
  'data|1000': [
    {
      id () {
        Id += 1
        return Id + 10000
      },
      realName: '@cname',
      'outTradeNo|798123123812123123-1798123123812123123': 798123123812123123,
      'payOrderId|798123123812123123-1798123123812123123': 798123123812123123,
      'type|1-3': 1,
      'amount|1-1798123': 1,
      'payAmount|1-1798123': 1,
      'feeRate': 0.38,
      'feeStatic': 1,
      'feeTotal': 2,
      'payType|1': [10, 11, 20, 21, 22, 23, 24, 40, 41, 42, 43, 44, 50, 51, 52, 31, 13, 32],
      'status|1-5': 1,
      'withdrawType|1-5': 1,
      withdrawAccountName: '@cname',
      'withdrawAccount|6222081001000000000-6222981001000000000': 6222081001000000000,
      createTime: '@dateTime',
      payTime: '@dateTime',
    },
  ],
}).data

const notWithdrawOrder = Mock.mock({
  'data|1000': [
    {
      id () {
        Id += 1
        return Id + 10000
      },
      realName: '@cname',
      'outTradeNo|798123123812123123-1798123123812123123': 798123123812123123,
      'payOrderId|798123123812123123-1798123123812123123': 798123123812123123,
      'type|1-3': 1,
      'amount|1-1798123': 1,
      'payAmount|1-1798123': 1,
      'feeRate': 0.38,
      'feeStatic': 1,
      'feeTotal': 2,
      'payType|1': [10, 11, 20, 21, 22, 23, 24, 40, 41, 42, 43, 44, 50, 51, 52, 31, 13, 32],
      'status|1-5': 1,
      'withdrawType|1-5': 1,
      withdrawAccountName: '@cname',
      'withdrawAccount|6222081001000000000-6222981001000000000': 6222081001000000000,
      createTime: '@dateTime',
      payTime: '@dateTime',
    },
  ],
}).data

const flowFinanceOrder = Mock.mock({
  'data|1000': [
    {
      id () {
        Id += 1
        return Id + 10000
      },
      'uid|107182322-109982322': 107182322,
      'orderId|798123123812123123-1798123123812123123': 798123123812123123,
      'tn|798123123812123123-1798123123812123123': 798123123812123123,
      'type|1-2': 1,
      'money|1-1798123': 1,
      'currentBalance|1-1798123': 1,
      'payType|1': [10, 21, 41, 0],
      'status|0-3': 1,
      description: '@csentence',
      createTime: '@dateTime',
      payTime: '@dateTime',
    },
  ],
}).data

const flowOrder = Mock.mock({
  'data|1000': [
    {
      id () {
        Id += 1
        return Id + 10000
      },
      'tn|798123123812123123-1798123123812123123': 798123123812123123,
      'orderId|798123123812123123-1798123123812123123': 798123123812123123,
      appId: 1000000,
      'agentUid|107182322-109982322': 107182322,
      'uid|107182322-109982322': 107182322,
      'type|1-3': 1,
      'role|1-5': 1,
      'mobile|18610000000-18690000000': 18610000000,
      'amount|1-1798123': 1,
      'flowCarrier|1': ['LT', 'YD', 'DX'],
      'flowType|1': ['y', 'n'],
      'flowSize|1-5': 1,
      'flowId|1-5': 1,
      'status|0-2': 0,
      description: '@csentence',
      createTime: '@dateTime',
      modifyTime: '@dateTime',
    },
  ],
}).data

const merchantRate = Mock.mock({
  'data|5': [
    {
      id () {
        Id += 1
        return Id + 10000
      },
      'status|0-1': 0,
      'settleType|-1-1': 1,
      'feeRate': 0.38,
      'payType|1': [10, 11, 20, 21, 22, 23, 24, 40, 41, 42, 43, 44, 50, 51, 52, 31, 13, 32],
      createTime: '@dateTime',
    },
  ],
}).data

const remit = Mock.mock({
  'data|1000': [
    {
      id () {
        Id += 1
        return Id + 10000
      },
      'status|0-1': 0,
      'amount|1-1798123': 1,
      'payType|1': [10, 11, 20, 21, 22, 23, 24, 40, 41, 42, 43, 44, 50, 51, 52, 31, 13, 32],
      createTime: '@dateTime',
    },
  ],
}).data

module.exports = {
  queryArray,
  NOTFOUND,
  Mock,
  withdrawOrder,
  notWithdrawOrder,
  flowFinanceOrder,
  merchantRate,
  flowOrder,
  remit,
  payOrder,
  config,
}
