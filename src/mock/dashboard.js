import { color } from '../utils/theme'
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Dashboard = Mock.mock({
  'sales|10': [
    {
      'name|+1': 2008,
      'Amount|200-500': 1,
      'Number|180-400': 1,
    },
  ],
  numbers: [
    {
      icon: 'pay-circle-o',
      color: color.green,
      title: '交易额',
      number: 2781,
    }, {
      icon: 'bell',
      color: color.blue,
      title: '交易笔数',
      number: 3241,
    }, {
      icon: 'bank',
      color: color.purple,
      title: '结算金额',
      number: 253,
    }, {
      icon: 'sync',
      color: color.red,
      title: '退款笔数',
      number: 4324,
    },
  ],
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`] (req, res) {
    res.json(Dashboard)
  },
}
