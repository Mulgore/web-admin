import React from 'react'
import {Table, Button} from 'antd'
import styles from './List.less'
import {ccOrderStatus, globalPayType, amountFormat} from '../../../utils'

const List = ({...tableProps}) => {

  const columns = [
    {
      title: '用户名',
      dataIndex: 'bankCardName',
    }, {
      title: '账户名',
      dataIndex: 'bankCardNo',
    }, {
      title: '平台订单号',
      dataIndex: 'orderId',
    }, {
      title: '支付金额',
      dataIndex: 'totalFee',
      render: text => amountFormat(text),
    }, {
      title: '到账金额',
      dataIndex: 'amount',
      render: text => amountFormat(text),
    }, {
      title: '手续费',
      dataIndex: 'counterFee',
      render: text => amountFormat(text),
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => globalPayType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => ccOrderStatus(text),
    }, {
      title: '订单类型',
      render: (text, record) => {
        if (record.steps === 1) {
          return "普通还款";
        } else if (record.steps > 1) {
          return "一键还款";
        } else if (record.steps === 0) {
          return "预约还款";
        }
      }
    }, {
      title: '还款步骤',
      dataIndex: 'steps',
      render: text => "总计: " + text + " 次",
    }, {
      title: '当前步骤',
      dataIndex: 'nowSteps',
      render: text => "当前: 第 " + text + " 次",
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    }, {
      title: '支付时间',
      dataIndex: 'payTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
      // }, {
      //   title: '操作',
      //   render: (text, record) => {
      //     return <Button icon="info-circle-o" onClick={e => onInfoItem(record)}>详情</Button>
      //   }
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
