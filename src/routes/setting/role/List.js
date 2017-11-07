import React from 'react'
import {Table, Button} from 'antd'
import styles from './List.less'

const List = ({onEditView, onDeleteView, ...tableProps}) => {
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: '角色级别',
      dataIndex: 'sort',
    }, {
      title: '备注',
      dataIndex: 'description',
    }, {
      title: '操作',
      render: (text, record) => {
        return <div>
          <Button icon="edit" type="primary" onClick={e => onEditView(record)}>编辑</Button>
          <Button icon="delete" type="primary" onClick={e => onDeleteView(record)}>删除</Button>
        </div>
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
