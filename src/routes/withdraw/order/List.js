import React from 'react'
import { Table, Button } from 'antd'
import PropTypes from 'prop-types'
import styles from './List.less'

const status = (key) => {
  switch (key) {
    case 0:
      return <Button style={{ color:'#f04134' }} type="dashed">未支付</Button>
    case 1:
    case -1:
    case -2:
      return <Button style={{ color:'#00a854' }} type="dashed">支付成功</Button>
    case 2:
      return <Button style={{ color:'#FFAA33' }} type="dashed">支付中</Button>
    case 3:
      return <Button style={{ color:'#f04134' }} type="dashed">支付失败</Button>
    case 4:
      return <Button style={{ color:'#f56a00' }} type="dashed">部分退款</Button>
    case 5:
      return <Button style={{ color:'#00a854' }} type="dashed">已结算</Button>
    case 6:
      return <Button style={{ color:'#f56a00' }} type="dashed">全额退款</Button>
    case 7:
      return <Button style={{ color:'#f04134' }} type="dashed">未知</Button>
  }
}

const payType = (key) => {
  switch (key) {
    case 10:
      return <Button style={{ color:'#f56a00' }} type="dashed">银联快捷</Button>
    case 11:
      return <Button style={{ color:'#f56a00' }} type="dashed">银联Wap(勇易)</Button>
    case 20:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(APP)</Button>
    case 21:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(二维码)</Button>
    case 22:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(扫码)</Button>
    case 23:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(公众号)</Button>
    case 24:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(Wap)</Button>
    case 40:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(APP)</Button>
    case 41:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(二维码)</Button>
    case 42:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(扫码)</Button>
    case 43:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(服务窗)</Button>
    case 44:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(Wap)</Button>
    case 50:
      return <Button style={{ color:'#f56a00' }} type="dashed">MPOS</Button>
    case 51:
      return <Button style={{ color:'#f56a00' }} type="dashed">MPOS(即富)</Button>
    case 52:
      return <Button style={{ color:'#f56a00' }} type="dashed">大POS</Button>
    case 31:
      return <Button style={{ color:'#f56a00' }} type="dashed">QQ二维码</Button>
    case 13:
      return <Button style={{ color:'#f56a00' }} type="dashed">银联快捷(摩宝)</Button>
    case 32:
      return <Button style={{ color:'#f56a00' }} type="dashed">QQ扫码</Button>
    default:
      return <Button style={{ color:'#f56a00' }} type="dashed">未知</Button>
  }
}

const type = (key) => {
  switch (key){
    case 1:
      return <Button style={{ color:'#108ee9' }} type="dashed">收款</Button>
    case 2:
      return <Button style={{ color:'#00a854' }} type="dashed">分润</Button>
    case 3:
      return <Button style={{ color:'#f56a00' }} type="dashed">转账</Button>
    default:
      return <Button style={{ color:'#f56a00' }} type="dashed">未知</Button>
  }
}

const withdrawType = (key) => {
  switch (key){
    case -1:
      return <Button>手动提现</Button>
    case 0:
      return <Button>D + 0</Button>
    default:
      return <Button type="danger">T + {key -1}</Button>
  }
}

const feeRate = (key) => {
    return key +' %'
}

const amount = (key) => {
  return key/100 +' 元'
}

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'realName',
    }, {
      title: '支付订单号',
      dataIndex: 'payOrderId',
    }, {
      title: '订单类型',
      dataIndex: 'type',
      render: (text) => type(text),
    }, {
      title: '商户订单号',
      dataIndex: 'outTradeNo',
    }, {
      title: '支付金额',
      dataIndex: 'amount',
      render: (text) => amount(text),
    }, {
      title: '提现金额',
      dataIndex: 'payAmount',
      render: (text) => amount(text),
    }, {
      title: '费率',
      dataIndex: 'feeRate',
      render: (text) => feeRate(text),
    }, {
      title: '单笔',
      dataIndex: 'feeStatic',
      render: (text) => amount(text),
    }, {
      title: '总费用',
      dataIndex: 'feeTotal',
      render: (text) => amount(text),
    }, {
      title: '结算周期',
      dataIndex: 'withdrawType',
      render: (text) => withdrawType(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: (text) => payType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => status(text),
    }, {
      title: '户名',
      dataIndex: 'withdrawAccountName',
    }, {
      title: '结算账号',
      dataIndex: 'withdrawAccount',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
    },{
      title: '支付时间',
      dataIndex: 'payTime',
  },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}


List.propTypes = {
  location: PropTypes.object,
}

export default List
