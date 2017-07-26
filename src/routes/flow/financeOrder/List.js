import React from 'react'
import { Table, Button } from 'antd'
import styles from './List.less'

const status = (key) => {
 switch (key){
   case 0:
     return <Button style={{ color:'#00a2ae' }} type="dashed">未支付</Button>
   case 1:
     return <Button style={{ color:'#00a854' }} type="dashed">支付成功</Button>
   case 2:
     return <Button style={{ color:'#f56a00' }} type="dashed">用户取消</Button>
   case 3:
     return <Button style={{ color:'#f56a00' }} type="dashed">交易关闭</Button>
   default:
     return <Button style={{ color:'#f56a00' }} type="dashed">未知</Button>
 }
}

const payType = (key) => {
  switch (key){
    case 10:
      return <Button style={{ color:'#f56a00' }} type="dashed">银联快捷</Button>
    case 21:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(二维码)</Button>
    case 41:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(二维码)</Button>
    case 0:
      return <Button style={{ color:'#00a2ae' }} type="dashed">账户余额</Button>
    default:
      return <Button style={{ color:'#f56a00' }} type="dashed">未知</Button>
  }
}

const type = (key) => {
  switch (key){
    case 1:
      return <Button style={{ color:'#108ee9' }} type="dashed">充值</Button>
    case 2:
      return <Button style={{ color:'#00a854' }} type="dashed">消费</Button>
    default:
      return <Button style={{ color:'#00a2ae' }} type="dashed">未知</Button>
  }
}

const amount = (key) => {
  return key/100 +' 元'
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
      render: (text) => type(text),
    }, {
      title: '金额',
      dataIndex: 'money',
      render: (text) => amount(text),
    }, {
      title: '账户余额',
      dataIndex: 'currentBalance',
      render: (text) => amount(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: (text) => payType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => status(text),
    }, {
      title: '备注',
      dataIndex: 'description',
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

export default List
