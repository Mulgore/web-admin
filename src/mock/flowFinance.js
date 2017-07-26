const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Info = Mock.mock({
  'info':
    {
      'amount': 612371,
      'userId': '10619283712',
    },
})

module.exports = {
  [`GET ${apiPrefix}/flowFinance`] (req, res) {
    res.json(Info)
  },

  [`POST ${apiPrefix}/flowFinance`] (req, res) {
    const { amount } = req.body
    Info.info.amount += amount
    res.status(200).end()
  },
}
