import config from './config'
import request from './request'
import classnames from 'classnames'
import {color} from './theme'
import lodash from 'lodash'
import styles from './index.less'


// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 提现订单状态
 * @return  {Array}
 */
const withdrawStatus = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#faaf76'}}>创建</label>
    case 2:
      return <label style={{color: '#faaf76'}}>提交</label>
    case 3:
      return <label style={{color: '#76d0a3'}}>成功</label>
    case 4:
      return <label style={{color: '#f79992'}}>失败</label>
    case 5:
      return <label style={{color: '#76d0a3'}}>审核通过</label>
    case 6:
      return <label style={{color: '#f79992'}}>审核不通过</label>
    case 7:
      return <label style={{color: '#ffdd76'}}>需要人工对账</label>
    case 8:
      return <label style={{color: '#76cdd3'}}>T1已回盘</label>
  }
}

/**
 * 支付方式
 * @return  {Array}
 */
const globalPayType = (key) => {
  let item = Math.round(key/10);
  switch (item) {
    case 1:
      return <label  style={{color: '#bfbfbf'}}>银联快捷</label>
    case 2:
      return <label  style={{color: '#76d0a3'}}>微信支付</label>
    case 4:
      return <label  style={{color: '#7ec2f3'}}>支付宝</label>
    case 5:
      return <label  style={{color: '#b3acf2'}}>MPOS</label>
    case 6:
      return <label  style={{color: '#76cdd3'}}>百度钱包</label>
    case 3:
      return <label  style={{color: '#faaf76'}}>QQ钱包</label>
  }
}
// const globalPayType = (key) => {
//   switch (key) {
//     case 10:
//       return <label style={{color: '#bfbfbf'}}>银联快捷</label>
//     case 11:
//       return <label style={{color: '#bfbfbf'}}>银联Wap(勇易)</label>
//     case 12:
//       return <label style={{color: '#bfbfbf'}}>银行快捷</label>
//     case 13:
//       return <label style={{color: '#bfbfbf'}}>银联快捷(摩宝)</label>
//     case 14:
//       return <label style={{color: '#bfbfbf'}}>银联快捷(大额)</label>
//     case 20:
//       return <label style={{color: '#76d0a3'}}>微信支付(APP)</label>
//     case 21:
//       return <label style={{color: '#76d0a3'}}>微信支付(二维码)</label>
//     case 22:
//       return <label style={{color: '#76d0a3'}}>微信支付(扫码)</label>
//     case 23:
//       return <label style={{color: '#76d0a3'}}>微信支付(公众号)</label>
//     case 40:
//       return <label style={{color: '#7ec2f3'}}>支付宝(APP)</label>
//     case 41:
//       return <label style={{color: '#7ec2f3'}}>支付宝(二维码)</label>
//     case 42:
//       return <label style={{color: '#7ec2f3'}}>支付宝(扫码)</label>
//     case 43:
//       return <label style={{color: '#7ec2f3'}}>支付宝(服务窗)</label>
//     case 50:
//       return <label style={{color: '#b3acf2'}}>MPOS</label>
//     case 51:
//       return <label style={{color: '#b3acf2'}}>MPOS收款(插件)</label>
//     case 52:
//       return <label style={{color: '#b3acf2'}}>POS收款</label>
//     case 31:
//       return <label style={{color: '#faaf76'}}>QQ二维码</label>
//     case 32:
//       return <label style={{color: '#faaf76'}}>QQ扫码</label>
//     case 61:
//       return <label style={{color: '#76cdd3'}}>百度钱包(二维码)</label>
//     case 62:
//       return <label style={{color: '#76cdd3'}}>百度钱包(扫码)</label>
//   }
// }

/**
 * 提现周期
 * @param key
 * @returns {XML}
 */
const globalSettleType = (key) => {
  switch (key) {
    case -1:
      return <label style={{color: '#faaf76'}}>手动提现</label>
    case 0:
      return <label style={{color: '#e9e9e9'}}>D + 0</label>
    default:
      return <label style={{color: '#76cdd3'}}>T + {key - 1}</label>
  }
}

/**
 * 提现类型
 * @param key
 * @returns {XML}
 */
const withdrawOrderType = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#76cdd3'}}>收款提现</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>分润提现</label>
    case 3:
      return <label style={{color: '#faaf76'}}>大额转账</label>
    case 4:
      return <label style={{color: '#b3acf2'}}>api代付</label>
    case 5:
      return <label style={{color: '#7ec2f3'}}>信用卡还款</label>
    case 6:
      return <label style={{color: '#ffdd76'}}>通道余额提现</label>
  }
}
/**
 * 费率
 * @param key
 * @returns {string}
 */
const feeRateFormat = (key) => {
  if (key == null) {
    return ''
  }
  return `${key} %`
}

/**
 * 金额格式化
 * @param key
 * @returns {string}
 */
const amountFormat = (key) => {
  if (key == null) {
    return `0 元`
  } else {
    return `${key / 100} 元`
  }
}

/**
 * 支付订单Type
 * @param key
 * @returns {XML}
 */
const payOrderType = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#7ec2f3'}}>支付</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>会员升级</label>
    case 3:
      return <label style={{color: '#b3acf2'}}>转账</label>
    case 4:
      return <label style={{color: '#76cdd3'}}>手动生成</label>
    case 5:
      return <label style={{color: '#faaf76'}}>信用卡还款</label>
  }
}
/**
 * 分润订单Type
 * @param key
 * @returns {XML}
 */
const profitOrderType = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#7ec2f3'}}>提现分润</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>会员升级分润</label>
    case 3:
      return <label style={{color: '#b3acf2'}}>流量充值分润</label>
    case 4:
      return <label style={{color: '#b3acf2'}}>贷款分润</label>
    case 5:
      return <label style={{color: '#b3acf2'}}>办卡分润</label>
    case 6:
      return <label style={{color: '#b3acf2'}}>活动分润</label>
    case 7:
      return <label style={{color: '#b3acf2'}}>一键还款分润</label>
  }
}

/**
 * 分润订单状态
 * @param key
 * @returns {XML}
 */
const profitStatus = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#7ec2f3'}}>合伙人</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>代理商</label>
  }
}
/**
 * 支付订单状态
 * @param key
 * @returns {XML}
 */
const payStatus = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#fa90ba'}}>未支付</label>
    case 1:
      return <label style={{color: '#7ec2f3'}}>支付成功</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>支付中</label>
    case 3:
      return <label style={{color: '#f79992'}}>支付失败</label>
    case 4:
      return <label style={{color: '#7ec2f3'}}>已结算</label>
    case 5:
      return <label style={{color: '#b3acf2'}}>部分退款</label>
    case 6:
      return <label style={{color: '#b3acf2'}}>全额退款</label>
    case 7:
      return <label style={{color: '#faaf76'}}>未知</label>
    case 8:
      return <label style={{color: '#f79992'}}>退款失败</label>
    case 9:
      return <label style={{color: '#f79992'}}>删除</label>
    case 10:
      return <label style={{color: '#faaf76'}}>关闭</label>
  }
}

const agentLevelItem = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#7ec2f3'}}>全国代理</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>省级代理</label>
    case 3:
      return <label style={{color: '#f79992'}}>市级代理</label>
    case 4:
      return <label style={{color: '#7ec2f3'}}>区域代理</label>
    case 5:
      return <label style={{color: '#b3acf2'}}>快捷代理</label>
    case 6:
      return <label style={{color: '#b3acf2'}}>流量代理</label>
  }
}

const userLevelItem = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#bfbfbf'}}>普通合伙人</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>金牌合伙人</label>
    case 3:
      return <label style={{color: '#7ec2f3'}}>钻石合伙人</label>
  }
}


const withdrawRecordStatus = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#7ec2f3'}}>未合并</label>
    case 1:
      return <label style={{color: '#76d0a3'}}>已合并</label>
  }
}


const withdrawRecordOwnerType = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#b3acf2'}}>商户</label>
    case 2:
      return <label style={{color: '#7ec2f3'}}>代理商</label>
  }
}

const StatusItem = (key) => {
  switch (key) {
    case 1:
      return <label style={{color: '#7ec2f3'}}>已启用</label>
    case -1:
      return <label style={{color: '#fa90ba'}}>禁用</label>
  }
}
/**
 * 费率
 * @param key
 * @returns {string}
 */
const profitRateFormat = (key) => {
  return `${key * 100} %`
}

const qrcodeStatus = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#b3acf2'}}>未处理</label>
    case 1:
      return <label style={{color: '#7ec2f3'}}>已处理</label>
  }
}
const qrcodeActive = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#b3acf2'}}>未激活</label>
    case 1:
      return <label style={{color: '#7ec2f3'}}>已激活</label>
  }
}

const merchantStatusItem = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#faaf76'}}>未审核</label>
    case 1:
      return <label style={{color: '#7ec2f3'}}>已审核</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>不通过</label>
    case 3:
      return <label style={{color: '#fa90ba'}}>黑名单</label>
  }
}

const merchantTypeItem = (key) => {
  switch (key) {
    case 1:
      return <label style={{ color: '#7ec2f3' }}>实体</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>虚拟</label>
    case 3:
      return <label style={{color: '#fa90ba'}}>集团</label>
  }
}

const agentStatusItem = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#7ec2f3'}}>未审核</label>
    case 1:
      return <label style={{color: '#76d0a3'}}>审核通过</label>
    case 2:
      return <label style={{color: '#faaf76'}}>审核不通过</label>
    case 3:
      return <label style={{color: '#fa90ba'}}>黑名单</label>
  }
}

const userStatusItem = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#faaf76'}}>未上传</label>
    case 1:
      return <label style={{color: '#7ec2f3'}}>已上传</label>
    case 2:
      return <label style={{color: '#f79992'}}>审核不通过</label>
    case 3:
      return <label style={{color: '#76d0a3'}}>审核通过</label>
  }
}
const ccOrderStatus = (key) => {
  switch (key) {
    case 0:
      return <label style={{color: '#fa90ba'}}>未支付</label>
    case 1:
      return <label style={{color: '#7ec2f3'}}>已支付</label>
    case 2:
      return <label style={{color: '#76d0a3'}}>还款成功</label>
    case 3:
      return <label style={{color: '#f79992'}}>还款失败</label>
    case 4:
      return <label style={{color: '#7ec2f3'}}>还款失败（已退款至账户）</label>
    case 6:
      return <label style={{color: '#b3acf2'}}>未开始（针对于一键还款）</label>
  }
}
module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  agentLevelItem,
  queryArray,
  withdrawStatus,
  profitStatus,
  qrcodeStatus,
  qrcodeActive,
  arrayToTree,
  profitOrderType,
  StatusItem,
  userLevelItem,
  profitRateFormat,
  withdrawRecordStatus,
  withdrawRecordOwnerType,
  globalPayType,
  globalSettleType,
  withdrawOrderType,
  amountFormat,
  feeRateFormat,
  payOrderType,
  userStatusItem,
  payStatus,
  ccOrderStatus,
  merchantStatusItem,
  merchantTypeItem,
  agentStatusItem,
}
