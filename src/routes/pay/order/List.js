import React from 'react'
import {Table, Button} from 'antd'
import styles from './List.less'
import {payStatus, globalPayType, payOrderType, amountFormat} from '../../../utils'

const List = ({onInfoView, ...tableProps}) => {

  const onInfoItem = (record) => {
    onInfoView(record)
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'realName',
    }, {
      title: '商户订单号',
      dataIndex: 'outTradeNo',
    }, {
      title: '平台订单号',
      dataIndex: 'orderId',
    }, {
      title: '订单类型',
      dataIndex: 'type',
      render: text => payOrderType(text),
    }, {
      title: '支付金额',
      dataIndex: 'amount',
      render: text => amountFormat(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => globalPayType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => payStatus(text),
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    }, {
      title: '支付时间',
      dataIndex: 'payTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    }, {
      title: '操作',
      render: (text, record) => {
        return <Button icon="info-circle-o" onClick={e => onInfoItem(record)}>详情</Button>
      }
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{x: 1200}}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}


export default List
