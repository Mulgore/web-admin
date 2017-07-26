const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Info = Mock.mock({
  'info':
    {
      'bankName': '中国工商银行',
      'bankSubbranch': '中国工商银行杭州湖滨支行',
      'cityName': '杭州市',
      'provinceName': '浙江省',
      'accountNo':'6222081001002894859',
      'mobile':'18765123821',
      'accountName':'星武',
      'isCompany':'否',
    },
})

module.exports = {
  [`GET ${apiPrefix}/merchantBank`] (req, res) {
    res.json(Info)
  },
}
