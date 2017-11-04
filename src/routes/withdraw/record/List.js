import React from 'react'
import {Table, Button} from 'antd'
import PropTypes from 'prop-types'
import styles from './List.less'
import {
  withdrawRecordStatus,
  withdrawOrderType,
  withdrawRecordOwnerType,
  globalSettleType,
  feeRateFormat,
  amountFormat
} from '../../../utils'


const List = ({...tableProps}) => {

  const columns = [
    {
      title: '提现类型',
      dataIndex: 'type',
      render: text => withdrawOrderType(text),
    }, {
      title: '提现记录订单号',
      dataIndex: 'orderId',
    }, {
      title: '提现金额',
      dataIndex: 'amount',
      render: text => amountFormat(text),
    }, {
      title: '费率',
      dataIndex: 'feeRate',
      render: text => feeRateFormat(text),
    }, {
      title: '提现余额',
      dataIndex: 'currentBalance',
      render: text => amountFormat(text),
    }, {
      title: '结算周期',
      dataIndex: 'withdrawType',
      render: text => globalSettleType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => withdrawRecordStatus(text),
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    }, {
      title: '提现日期',
      dataIndex: 'withdrawDay',
    }, {
      title: '身份类型',
      dataIndex: 'ownerType',
      render: text => withdrawRecordOwnerType(text),
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
  location: PropTypes.object,
}

export default List
