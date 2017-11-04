import React from 'react'
import {Table, Icon} from 'antd'
import styles from './List.less'
import {globalPayType, globalSettleType, feeRateFormat} from '../../../utils'
const status = (key) => {
  switch (key) {
    case 1:
      return <Icon style={{color: 'blue'}} type="check"/>
    case 0:
      return <Icon style={{color: 'red'}} type="close"/>
  }
}

const List = ({...tableProps}) => {
  const columns = [
    {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => globalPayType(text),
    }, {
      title: '结算周期',
      dataIndex: 'settleType',
      render: text => globalSettleType(text),
    }, {
      title: '费率',
      dataIndex: 'feeRate',
      render: text => feeRateFormat(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => status(text),
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
