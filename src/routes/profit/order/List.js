import React from 'react'
import {Table, Button} from 'antd'
import styles from './List.less'
import {profitOrderType, globalPayType, profitStatus, profitRateFormat, amountFormat} from '../../../utils'

const List = ({onInfoView, ...tableProps}) => {

  const onInfoItem = (record) => {
    onInfoView(record)
  }

  const columns = [
    {
      title: '分润用户',
      dataIndex: 'fromName',
    }, {
      title: '支付订单号',
      dataIndex: 'payOrderId',
    }, {
      title: '分润类型',
      dataIndex: 'type',
      render: text => profitOrderType(text),
    }, {
      title: '分润比例',
      dataIndex: 'splitRate',
      render: text => profitRateFormat(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => globalPayType(text),
    }, {
      title: '分润金额',
      dataIndex: 'splitAmount',
      render: text => amountFormat(text),
    }, {
      title: '支付金额',
      dataIndex: 'payAmount',
      render: text => amountFormat(text),
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
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
