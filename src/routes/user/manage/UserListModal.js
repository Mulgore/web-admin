import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table} from 'antd'
import styles from './List.less'


const modal = ({
                 listProps = {},
                 ...modalProps
               }) => {
  const modalOpts = {
    ...modalProps,
  }

  const columns = [
    {
      title: '电话',
      dataIndex: 'mobile',
    }, {
      title: '注册时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日 H:mm:ss') : ''),
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
}

export default modal
