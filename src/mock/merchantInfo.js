const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Info = Mock.mock({
  'info':
    {
      'level': '大商户',
      'merchantNo': '88791831237436026880',
      'cityName': '杭州市',
      'provinceName': '浙江省',
      'shortName':'星武的Mock商户',
      'fullName':'星武的Mock商户',
      'address':'浙江省杭州市余杭区',
      'industry':'互联网金融行业',
      'mobile':'18765123821',
      'linkman':'星武',
      'bizLincenseNo':'913301060773240037',
      'servicePhone':'0571-28115155',
      'email':'service@ixiye.com',
      'remark':'测试商户',
      'orgCode':'913301060773240037',
    },
})

module.exports = {
  [`GET ${apiPrefix}/merchantInfo`] (req, res) {
    res.json(Info)
  },
}
