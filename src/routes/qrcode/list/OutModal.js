import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table, Button} from 'antd'
import styles from './List.less'

const confirm = Modal.confirm

const modal = ({
                 listProps = {},
                 onDownload,
                 ...modalProps
               }) => {
  const modalOpts = {
    ...modalProps,
  }

  const onDownChange = (item)=>{
    onDownload(item.pages)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '描述',
      dataIndex: 'description',
    }, {
      title: '操作',
      render: (text, record) => {
        return <Button icon="download" onClick={e => onDownChange(record)}>导出</Button>
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
  onDownload: PropTypes.func,
}

export default modal
