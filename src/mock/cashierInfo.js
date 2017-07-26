const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Info = Mock.mock({
  'info':
    {
      'merchantNo': '798879812731823791',
      'orderId':'913301060773240037',
      'notifyUrl':'https://mch.fulapay.com',
    },
})

module.exports = {
  [`GET ${apiPrefix}/cashierInfo`] (req, res) {
    res.json(Info)
  },
}
