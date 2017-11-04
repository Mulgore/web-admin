import React from 'react'
import { Table, label } from 'antd'
import styles from './List.less'
import { amountFormat } from '../../../utils'
const status = (key) => {
  switch (key) {
    case 0:
      return <label  style={{ color: '#b3acf2' }} >未支付</label>
    case 1:
      return <label  style={{ color: '#7ec2f3' }} >支付成功</label>
    case 2:
      return <label  style={{ color: '#faaf76' }} >用户取消</label>
    case 3:
      return <label  style={{ color: '#f79992' }} >交易关闭</label>
    default:
      return <label  style={{ color: '#fa90ba' }} >未知</label>
  }
}

const payType = (key) => {
  switch (key) {
    case 10:
      return <label  style={{ color: '#e9e9e9' }} >银联快捷</label>
    case 21:
      return <label  style={{ color: '#76d0a3' }} >微信支付(二维码)</label>
    case 41:
      return <label  style={{ color: '#7ec2f3' }} >支付宝(二维码)</label>
    case 0:
      return <label  style={{ color: '#76cdd3' }} >账户余额</label>
    default:
      return <label  style={{ color: '#faaf76' }} >未知</label>
  }
}

const type = (key) => {
  switch (key) {
    case 1:
      return <label  style={{ color: '#b3acf2' }} >充值</label>
    case 2:
      return <label  style={{ color: '#7ec2f3' }} >消费</label>
    default:
      return <label  style={{ color: '#faaf76' }} >未知</label>
  }
}

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '用户',
      dataIndex: 'uid',
    }, {
      title: '订单号',
      dataIndex: 'orderId',
    }, {
      title: '交易流水',
      dataIndex: 'tn',
    }, {
      title: '订单类型',
      dataIndex: 'type',
      render: text => type(text),
    }, {
      title: '金额',
      dataIndex: 'money',
      render: text => amountFormat(text),
    }, {
      title: '账户余额',
      dataIndex: 'currentBalance',
      render: text => amountFormat(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => payType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => status(text),
    }, {
      title: '备注',
      dataIndex: 'description',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    }, {
      title: '支付时间',
      dataIndex: 'payTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
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

export default List
