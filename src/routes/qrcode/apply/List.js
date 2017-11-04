import React from 'react'
import {Table, Button} from 'antd'
import PropTypes from 'prop-types'
import styles from './List.less'
import {
  qrcodeStatus,
  feeRateFormat,
  amountFormat
} from '../../../utils'


const List = ({...tableProps}) => {

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    }, {
      title: '申请数',
      dataIndex: 'applyCount',
    }, {
      title: '费率',
      dataIndex: 'applyRate',
      render: text => feeRateFormat(text),
    }, {
      title: '单笔最大限额',
      dataIndex: 'max',
      render: text => amountFormat(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => qrcodeStatus(text),
    }, {
      title: '申请时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd HH:mm:ss') : ''),
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
