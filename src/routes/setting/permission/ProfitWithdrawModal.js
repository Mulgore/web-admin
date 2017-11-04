import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table,} from 'antd'
import styles from './List.less'
import {withdrawStatus, feeRateFormat, amountFormat} from '../../../utils'

const modal = ({
                 listProps = {},
                 ...modalProps
               }) => {
  const modalOpts = {
    ...modalProps,
  }

  const columns = [
    {
      title: '平台订单号',
      dataIndex: 'orderId',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => withdrawStatus(text),
    }, {
      title: '提现金额',
      dataIndex: 'amount',
      render: text => amountFormat(text),
    }, {
      title: '提现账号',
      dataIndex: 'withdrawAccount',
    }, {
      title: '提现户名',
      dataIndex: 'withdrawAccountName',
    }, {
      title: '提现银行',
      dataIndex: 'withdrawBank',
    }, {
      title: '提现费率',
      dataIndex: 'feeRate',
      render: text => feeRateFormat(text),
    }, {
      title: '提款后余额',
      dataIndex: 'currentBalance',
      render: text => amountFormat(text),
    },
  ]

  return (
    <Modal  {...modalOpts}>
      <div>
        <Table
          {...listProps}
          bordered
          // scroll={{x: '80%'}}
          columns={columns}
          simple
          className={styles.table}
          rowKey={record => record.id}
        />
      </div>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  listProps: PropTypes.object,
}

export default modal
