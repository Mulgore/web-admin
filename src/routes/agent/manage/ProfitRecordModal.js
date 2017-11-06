import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table} from 'antd'
import styles from './List.less'
import {profitRateFormat, profitOrderType, amountFormat} from '../../../utils'


const modal = ({
                 listProps = {},
                 ...modalProps

               }) => {
  const modalOpts = {
    ...modalProps,
  }

  const columns = [
    {
      title: '下级UID',
      dataIndex: 'fromUid',
    }, {
      title: '分润所占的比例%',
      dataIndex: 'splitRate',
      render: text => profitRateFormat(text),
    }, {
      title: '分润金额',
      dataIndex: 'splitAmount',
      render: text => amountFormat(text),
    }, {
      title: '分润方式',
      dataIndex: 'type',
      render: text => profitOrderType(text),
    }, {
      title: '分润时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日') : ''),
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
