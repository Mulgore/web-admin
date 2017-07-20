const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: '管理中心',
    route: '/dashboard',
  },
  {
    id: '8',
    bpid: '1',
    name: '商户管理',
    route: '/merchant',
    icon: 'user',
  },
  {
    id: '81',
    bpid: '8',
    mpid: '8',
    name: '基本信息',
    route: '/merchant/info',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
