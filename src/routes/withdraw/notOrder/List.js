import React from 'react'
import {Table, Button} from 'antd'
import PropTypes from 'prop-types'
import styles from './List.less'
import {
  withdrawStatus,
  globalPayType,
  globalSettleType,
  withdrawOrderType,
  feeRateFormat,
  amountFormat
} from '../../../utils'


const List = ({onInfoView, ...tableProps}) => {

  const onInfoItem = (record) => {
    onInfoView(record)
  }

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
      render: text => withdrawOrderType(text),
    }, {
      title: '支付金额',
      dataIndex: 'amount',
      render: text => amountFormat(text),
    }, {
      title: '提现金额',
      dataIndex: 'payAmount',
      render: text => amountFormat(text),
    }, {
      title: '费率',
      dataIndex: 'feeRate',
      render: text => feeRateFormat(text),
    }, {
      title: '单笔',
      dataIndex: 'feeStatic',
      render: text => amountFormat(text),
    }, {
      title: '总费用',
      dataIndex: 'feeTotal',
      render: text => amountFormat(text),
    }, {
      title: '结算周期',
      dataIndex: 'withdrawType',
      render: text => globalSettleType(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => globalPayType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => withdrawStatus(text),
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

List.propTypes = {
  onInfoView: PropTypes.func,
  location: PropTypes.object,
}

export default List
