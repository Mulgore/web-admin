import React from 'react'
import {Table, Modal} from 'antd'
import styles from './List.less'
import {DropOption} from 'components'

const confirm = Modal.confirm

const List = ({onEditView, onChildView, onAddChildView, onDeleteView, ...tableProps}) => {

  const handleMenuClick = (item, e) => {
    switch (e.key) {
      case '1':
        onEditView(item)
        break;
      case '2':
        onAddChildView(item)
        break;
      case '3':
        onChildView(item)
        break;
      case '4':
        if (item.status != 3) {
          confirm({
            title: '确定要删除菜单吗 ?',
            onOk() {
              onDeleteView(item)
            },
          })
        }
    }
  }
  const menuOptionsData = [
    {
      key: '1',
      name: '编辑菜单'
    }, {
      key: '2',
      name: '添加菜单'
    }, {
      key: '3',
      name: '下级菜单'
    }, {
      key: '4',
      name: '删除菜单'
    },
  ]
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'title',
    }, {
      title: '菜单图标',
      dataIndex: 'icon',
    }, {
      title: '状态',
      dataIndex: 'state',
      render: (text, record) => {
        switch (record.state) {
          case 0:
            return "禁用";
          case 1:
            return "启用";
        }
      },
    }, {
      title: '操作',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={menuOptionsData}/>
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


export default List
