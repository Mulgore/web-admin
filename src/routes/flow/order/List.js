import React from 'react'
import {Table, Button} from 'antd'
import styles from './List.less'

const status = (key) => {
  switch (key) {
    case 0:
      return <Button style={{ color:'#f56a00' }} type="dashed">处理中</Button>
    case 1:
      return <Button style={{ color:'#00a854' }} type="dashed">充值成功</Button>
    case 2:
      return <Button style={{ color:'#f04134' }} type="dashed">充值失败</Button>
    default:
      return <Button type="danger">未知</Button>
  }
}

const flowCarrier = (key) => {
  switch (key) {
    case 'DX':
      return <Button style={{ color:'#108ee9' }} type="dashed">中国电信</Button>
    case 'YD':
      return <Button style={{ color:'#00a854' }} type="dashed">中国移动</Button>
    case 'LT':
      return <Button style={{ color:'#f56a00' }} type="dashed">中国联通</Button>
    default:
      return <Button type="danger">未知</Button>
  }
}

const flowType = (key) => {
  switch (key) {
    case 'y':
      return <Button style={{ color:'#108ee9' }} type="dashed">全国</Button>
    case 'n':
      return <Button style={{ color:'#00a854' }} type="dashed">本地</Button>
    default:
      return <Button type="danger">未知</Button>
  }
}


const role = (key) => {
  switch (key) {
    case 1:
      return <Button style={{ color:'#108ee9' }} type="dashed">代理商</Button>
    default:
      return <Button style={{ color:'#00a854' }} type="dashed">商户</Button>
  }
}

const amount = (key) => {
  return key/100 +' 元'
}

const List = ({...tableProps}) => {
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
      render: (text) => role(text),
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '消费金额',
      dataIndex: 'amount',
      render: (text) => amount(text),
    }, {
      title: '运营商',
      dataIndex: 'flowCarrier',
      render: (text) => flowCarrier(text),
    }, {
      title: '漫游类型',
      dataIndex: 'flowType',
      render: (text) => flowType(text),
    }, {
      title: 'M值',
      dataIndex: 'flowSize',
    }, {
      title: '产品号',
      dataIndex: 'flowId',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => status(text),
    }, {
      title: '订单描述',
      dataIndex: 'description',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
    }, {
      title: '修改时间',
      dataIndex: 'modifyTime',
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
