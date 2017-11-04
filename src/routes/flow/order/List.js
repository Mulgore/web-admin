import React from 'react'
import { Table, label } from 'antd'
import styles from './List.less'
import { amountFormat } from '../../../utils'

const status = (key) => {
  switch (key) {
    case 0:
      return <label  style={{ color: '#76d0a3' }} >处理中</label>
    case 1:
      return <label  style={{ color: '#7ec2f3' }} >充值成功</label>
    case 2:
      return <label  style={{ color: '#f79992' }} >充值失败</label>
    default:
      return <label type="danger">未知</label>
  }
}

const flowCarrier = (key) => {
  switch (key) {
    case 'DX':
      return <label style={{ color: '#7ec2f3' }} >中国电信</label>
    case 'YD':
      return <label  style={{ color: '#76d0a3' }} >中国移动</label>
    case 'LT':
      return <label  style={{ color: '#faaf76' }} >中国联通</label>
    default:
      return <label type="danger">未知</label>
  }
}

const flowType = (key) => {
  switch (key) {
    case 'y':
      return <label  style={{ color: '#76cdd3' }} >全国</label>
    case 'n':
      return <label  style={{ color: '#b3acf2' }} >本地</label>
    default:
      return <label type="danger">未知</label>
  }
}


const role = (key) => {
  switch (key) {
    case 1:
      return <label  style={{ color: '#108ee9' }} >代理商</label>
    default:
      return <label  style={{ color: '#00a854' }} >商户</label>
  }
}

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderId',
    }, {
      title: '交易流水',
      dataIndex: 'tn',
    }, {
      title: '应用号',
      dataIndex: 'appId',
    }, {
      title: '上级代理商UID',
      dataIndex: 'agentUid',
    }, {
      title: '用户UID',
      dataIndex: 'uid',
    }, {
      title: '用户角色',
      dataIndex: 'role',
      render: text => role(text),
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '消费金额',
      dataIndex: 'amount',
      render: text => amountFormat(text),
    }, {
      title: '运营商',
      dataIndex: 'flowCarrier',
      render: text => flowCarrier(text),
    }, {
      title: '漫游类型',
      dataIndex: 'flowType',
      render: text => flowType(text),
    }, {
      title: 'M值',
      dataIndex: 'flowSize',
    }, {
      title: '产品号',
      dataIndex: 'flowId',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => status(text),
    }, {
      title: '订单描述',
      dataIndex: 'description',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    }, {
      title: '修改时间',
      dataIndex: 'modifyTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 HH:mm:ss') : ''),
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default List
