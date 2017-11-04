import React from 'react'
import {Table, Button} from 'antd'
import styles from './List.less'
import {userLevelItem, userStatusItem} from '../../../utils'

const List = ({...tableProps, onUserListView}) => {

  const handleMenuClick = (item) => {
    onUserListView(item)
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'realname',
    }, {
      title: '会员等级',
      dataIndex: 'level',
      render: text => userLevelItem(text),
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '基础信息',
      dataIndex: 'authBase',
      render: text => userStatusItem(text),
    }, {
      title: '照片信息',
      dataIndex: 'authPhoto',
      render: text => userStatusItem(text),
    }, {
      title: '结算卡信息',
      dataIndex: 'authBank',
      render: text => userStatusItem(text),
    }, {
      title: '流量来源',
      dataIndex: 'source',
    }, {
      title: '注册时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 H:mm:ss') : ''),
    }, {
      title: '操作',
      width: 100,
      render: (text, record) => {
        return <Button onClick={() => handleMenuClick(record)}>查看邀请列表</Button>
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{x: 1200}}
        width={100}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}


export default List
