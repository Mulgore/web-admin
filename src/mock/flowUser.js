const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

const Info = Mock.mock({
  info: {
    amount: 10,
    userId: '10712312312',
    permission: '审核中',
    sales: '94折',
    yLT: [{ id: 'yLT1', value: '20M/3元' }, { id: 'yLT2', value: '30M/4元' }, { id: 'yLT3', value: '50M/6元' }, { id: 'yLT4', value: '100/10元' }],
    yDX: [{ id: 'yDX1', value: '5M/1元' }, { id: 'yDX2', value: '10M/2元' }, { id: 'yDX3', value: '30M/5元' }, { id: 'yDX4', value: '50M/7元' }],
    yYD: [{ id: 'yYD1', value: '30M/5元' }, { id: 'yYD2', value: '70M/10元' }, { id: 'yYD3', value: '300M/20元' }, { id: 'yYD4', value: '1G/50元' }],
    nLT: [{ id: 'nLT1', value: '30M/5元' }, { id: 'nLT2', value: '70M/10元' }, { id: 'nLT3', value: '300M/20元' }, { id: 'nLT4', value: '1G/50元' }],
    nDX: [{ id: 'nDX1', value: '30M/5元' }, { id: 'nDX2', value: '70M/10元' }, { id: 'nDX3', value: '300M/20元' }, { id: 'nDX4', value: '1G/50元' }],
    nYD: [{ id: 'nYD1', value: '30M/5元' }, { id: 'nYD2', value: '70M/10元' }, { id: 'nYD3', value: '300M/20元' }, { id: 'nYD4', value: '1G/50元' }],
  },
})

module.exports = {
  [`GET ${apiPrefix}/flowUser`] (req, res) {
    res.json(Info)
  },
  [`POST ${apiPrefix}/flowUser`] (req, res) {
    Info.info.amount -= 100
    res.status(200).end()
  },
}
