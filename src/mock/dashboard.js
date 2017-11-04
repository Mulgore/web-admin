import {color} from '../utils/theme'

const Mock = require('mockjs')
const config = require('../utils/config')

const {apiPrefix} = config

const Dashboard = Mock.mock({
  numbers: [
    {
      icon: 'pay-circle-o',
      color: color.green,
      title: '交易金额',
      decimals: 2,
      number: 2781.89,
    }, {
      icon: 'bell',
      color: color.blue,
      title: '交易笔数',
      decimals: 0,
      number: 3241,
    }, {
      icon: 'bank',
      color: color.purple,
      title: '分润金额',
      decimals: 2,
      number: 253.78,
    }, {
      icon: 'sync',
      color: color.red,
      title: '商户',
      decimals: 0,
      number: 4324,
    },
  ],
  'sales|10': [
    {
      'name|+1': 2008,
      '交易金额|200-500': 1,
      '交易笔数|180-400': 1,
    },
  ],
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`](req, res) {
    res.json(Dashboard)
  },
}
