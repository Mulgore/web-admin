import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table, Button} from 'antd'
import styles from './List.less'

const confirm = Modal.confirm

const modal = ({
                 listProps = {},
                  onRemoveChild,
                  onEditChild,
                 onDeleteView,
                  onStartChild,
                 ...modalProps
               }) => {
  const modalOpts = {
    ...modalProps,
  }

  const remove = (item)=>{
    confirm({
      title: '确定禁用权限菜单吗 ?',
      onOk() {
        onRemoveChild(item)
      },
    })
  }
  const onDelete = (item)=>{
    confirm({
      title: '确定删除权限菜单吗 ?',
      onOk() {
        onDeleteView(item)
      },
    })
  }
  const start = (item)=>{
    onStartChild(item)
  }
  const edit = (item)=>{
    onEditChild(item)
  }
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
        switch (record.state){
          case 0:
            return "禁用";
          case 1:
            return "启用";
        }
      },
    }, {
      title: '链接',
      dataIndex: 'url',
    }, {
      title: '备注',
      dataIndex: 'description',
    }, {
      title: '操作',
      render: (text, record) => {
        if (record.state == 0) {
          return <div><Button icon="check" type="primary" onClick={e =>start(record)}>启用</Button><Button icon="delete" type="primary" onClick={e =>onDelete(record)}>删除</Button></div>
        } else if (record.state == 1) {
          return <div><Button icon="edit" onClick={e => edit(record)}>编辑</Button><Button icon="close" onClick={e => remove(record)}>禁用</Button><Button icon="delete" type="primary" onClick={e =>onDelete(record)}>删除</Button></div>
        }
      }
    },
  ]

  return (
    <Modal  {...modalOpts}>
      <div>
        <Table
          {...listProps}
          bordered
          // scroll={{x: '80%'}}
          columns={columns}
          simple
          className={styles.table}
          rowKey={record => record.id}
        />
      </div>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  listProps: PropTypes.object,
  onOk: PropTypes.func,
  onRemoveRate: PropTypes.func,
  onAddRate: PropTypes.func,
}

export default modal
