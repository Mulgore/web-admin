import React from 'react'
import {Table, Button} from 'antd'
import PropTypes from 'prop-types'
import styles from './List.less'
import {
  feeRateFormat,
  amountFormat,
  qrcodeActive,
} from '../../../utils'


const List = ({onInfoView, ...tableProps}) => {

  const onInfoItem = (record) => {
    onInfoView(record)
  }

  const columns = [
    {
      title: '商户号',
      dataIndex: 'merchantNo',
    }, {
      title: '真实姓名',
      dataIndex: 'realname',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '状态',
      dataIndex: 'active',
      render: text => qrcodeActive(text),
    }, {
      title: '费率',
      dataIndex: 'feeRate',
      render: text => feeRateFormat(text),
    }, {
      title: '单笔最大限额',
      dataIndex: 'max',
      render: text => amountFormat(text),
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    }, {
      title: '操作',
      render: (text, record) => {
        return <Button icon="qrcode" onClick={e => onInfoItem(record)}>二维码</Button>
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
