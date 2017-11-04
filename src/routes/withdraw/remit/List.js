import React from 'react'
import {Table, Button} from 'antd'
import PropTypes from 'prop-types'
import styles from './List.less'
import {globalPayType, amountFormat} from '../../../utils'

const status = (key) => {
  switch (key) {
    case 1:
      return <label className={styles.btn} style={{backgroundColor: '#7ec2f3', color: '#FFFFFF'}}>可用</label>
    case 0:
      return <label className={styles.btn} style={{backgroundColor: '#f79992', color: '#FFFFFF'}}>不可用</label>
  }
}

const List = ({onEditItem, ...tableProps}) => {
  const onChangeAuto = (record) => {
    onEditItem(record)
  }


  const columns = [
    {
      title: '通道余额',
      dataIndex: 'balance',
      render: text => amountFormat(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => globalPayType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => status(text),
    }, {
      title: '上次提现时间',
      dataIndex: 'modifyTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd HH:mm:ss') : ''),
    }, {
      title: '操作',
      render: (text, record) => {
        if (record.status === 1) {
          return <Button icon="pay-circle-o" onClick={e => onChangeAuto(record)}>提现</Button>
        }
      },
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
  onEditItem: PropTypes.func,
}

export default List
