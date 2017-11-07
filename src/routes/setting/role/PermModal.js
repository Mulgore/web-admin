import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table, Button} from 'antd'
import styles from './List.less'

const confirm = Modal.confirm

const modal = ({
                 listProps = {},
                 onRemovePerm,
                 onStartPerm,
                 ...modalProps
               }) => {
  const modalOpts = {
    ...modalProps,
  }

  const remove = (item)=>{
    confirm({
      title: '确定禁用权限菜单吗 ?',
      onOk() {
        onRemovePerm(item)
      },
    })
  }
  const start = (item)=>{
    onStartPerm(item)
  }
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'title',
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
      title: '备注',
      dataIndex: 'description',
    }, {
      title: '操作',
      render: (text, record) => {
        if (record.state == 0) {
          return <Button icon="check" type="primary" onClick={e =>start(record)}>启用</Button>
        } else if (record.state == 1) {
          return <Button icon="delete" onClick={e => remove(record)}>禁用</Button>
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
