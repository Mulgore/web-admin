const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

const Info = Mock.mock({
  info:
    {
      agentLevel: '省级代理',
      agentAddress:'浙江省/杭州市/余杭区',
      operationAddress:'浙江省/杭州市/余杭区',
      address: '浙江省杭州市余杭区',
      mobile: '18765123821',
      realName: '星武',
      company: '细叶科技',
      leader:'细叶',
      deposit:'5000 元',
      contractBegin:'@dateTime',
      contractEnd:'@dateTime',
      bankAccountNo: '91330106077324121',
      bankCity: '杭州市',
      bankProvince: '浙江省',
      bankMobile:'18765123821',
      idNumber:'339005198302165613',
      bankAccountName:'星武',
      bankName:'中国银行',
      bankSubbranch:'中国银行股份有限公司如皋白蒲支行',
    },
})

module.exports = {
  [`GET ${apiPrefix}/agentInfo`] (req, res) {
    res.json(Info)
  },
}
