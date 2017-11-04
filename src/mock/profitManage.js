const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

const Info = Mock.mock({
  info:
    {
      'splitTotal|1-79823': 1,
      'splitWithdraw|1-79823': 1,
      'balance': 0,
    },
})

module.exports = {
  [`GET ${apiPrefix}/profitManage`] (req, res) {
    res.json(Info)
  },

  [`POST ${apiPrefix}/profitManage`] (req, res) {
    const { amount } = req.body
    Info.info.banlance -= amount
    res.json(Info)
  },
}
