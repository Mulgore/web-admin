import React from 'react'
import { Table, Button, Icon } from 'antd'
import styles from './List.less'

const status = (key) => {
 switch (key){
   case 1:
     return <Icon style={{ color:'blue' }} type="check" />
   case 0:
     return <Icon style={{ color:'red' }} type="close" />
 }
}

const payType = (key) => {
  switch (key) {
    case 10:
      return <Button >银联快捷</Button>
    case 11:
      return <Button >银联Wap(勇易)</Button>
    case 20:
      return <Button >微信支付(APP)</Button>
    case 21:
      return <Button >微信支付(二维码)</Button>
    case 22:
      return <Button >微信支付(扫码)</Button>
    case 23:
      return <Button >微信支付(公众号)</Button>
    case 24:
      return <Button >微信支付(Wap)</Button>
    case 40:
      return <Button >支付宝(APP)</Button>
    case 41:
      return <Button >支付宝(二维码)</Button>
    case 42:
      return <Button >支付宝(扫码)</Button>
    case 43:
      return <Button >支付宝(服务窗)</Button>
    case 44:
      return <Button >支付宝(Wap)</Button>
    case 50:
      return <Button >MPOS</Button>
    case 51:
      return <Button >MPOS(即富)</Button>
    case 52:
      return <Button >大POS</Button>
    case 31:
      return <Button >QQ二维码</Button>
    case 13:
      return <Button >银联快捷(摩宝)</Button>
    case 32:
      return <Button >QQ扫码</Button>
    default:
      return <Button type="danger">未知</Button>
  }
}

const settleType = (key) => {
  switch (key) {
    case -1:
      return <Button type="dashed">手动提现</Button>
    case 0:
      return <Button >D + 0</Button>
    default:
      return <Button type="danger">T + {key - 1} </Button>
  }
}

const feeRate = (key) => {
      return key+' %'
}

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '支付方式',
      dataIndex: 'payType',
      render: (text) => payType(text),
    }, {
      title: '结算周期',
      dataIndex: 'settleType',
      render: (text) => settleType(text),
    }, {
      title: '费率',
      dataIndex: 'feeRate',
      render: (text) => feeRate(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => status(text),
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
