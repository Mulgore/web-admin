const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Info = Mock.mock({
  'info':
    {
      'amount': '123122',
      'userId': '10619283712',
    },
})

const Pay = Mock.mock({
  'pay':
    {
      'url': 'https://weixin.fulapay.com/wxpay/input.html?merchantNo=88791831237436026880',
      'amount':0
    },
})

module.exports = {
  [`GET ${apiPrefix}/flowFinance`] (req, res) {
    res.json(Info)
  },

  [`POST ${apiPrefix}/flowFinance`] (req, res) {
    const { amount } = req.body
    Info.info.amount += amount
    Pay.pay.amount = amount
    res.json(Pay)
  },
}
