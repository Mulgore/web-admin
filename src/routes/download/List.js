import React from 'react'
import {Table, Button} from 'antd'
import styles from './List.less'

const List = ({onDownload, ...tableProps}) => {

  const onDownloadItem = (record) => {
    onDownload(record)
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    }, {
      title: '文件名称',
      dataIndex: 'title',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日') : ''),
    }, {
      title: '操作',
      render: (text, record) => {
        return <Button icon="download" onClick={e => onDownloadItem(record)}>下载</Button>
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


export default List
