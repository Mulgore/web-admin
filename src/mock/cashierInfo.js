const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

const Info = Mock.mock({
  info: {
    merchantNo: '798879812731823791',
    orderId: '913301060773240037',
    notifyUrl: 'https://mch.fulapay.com',
  },
})

const Pay = Mock.mock({
  payInfo: {
    url: 'https://cash.fulapay.com/cashier/index',
    payUrl: 'https://cash.fulapay.com/cashier/index?app_id%3D1000000%26body%3D12%26mch_create_ip%3D220.184.130.27%26mch_id%3D88791831237436026880%26notify_url%3Dhttps%3A%2F%2Fmch.fulapay.com%26out_trade_no%3D201707271719341001749526e883d%26sign%3D16872e5005d14c9ded6d0cb235ce01d2%26total_fee%3D1200',
    payMap: 'app_id=1000000&body=12&mch_create_ip=220.184.130.27&mch_id=88791831237436026880¬ify_url=https://mch.fulapay.com&out_trade_no=201707271719341001749526e883d&sign=16872e5005d14c9ded6d0cb235ce01d2&total_fee=1200',
  },
})

module.exports = {
  [`GET ${apiPrefix}/cashierInfo`] (req, res) {
    res.json(Info)
  },

  [`POST ${apiPrefix}/cashierInfo`] (req, res) {
    const { type } = req.body
    switch (type) {
      case 1:
        res.json(Pay)
        break
      case 2:
        res.json(Pay)
    }
  },
}
