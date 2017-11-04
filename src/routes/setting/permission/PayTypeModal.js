import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table, Button, Icon} from 'antd'
import styles from './List.less'
import {globalPayType, globalSettleType, feeRateFormat, amountFormat} from '../../../utils'

const confirm = Modal.confirm

const modal = ({
                 listProps = {},
                  onRemoveRate,
                  onAddRate,
                 ...modalProps
               }) => {
  const modalOpts = {
    ...modalProps,
  }
  const status = (key) => {
    switch (key) {
      case 1:
        return <Icon style={{color: 'blue'}} type="check"/>
      case 0:
        return <Icon style={{color: 'red'}} type="close"/>
    }
  }
  const remove = (item)=>{
    confirm({
      title: '确定取消费率吗 ?',
      onOk() {
        onRemoveRate(item)
      },
    })
  }
  const add = (item)=>{
        onAddRate(item)
  }
  const columns = [
    {
      title: '支付方式',
      dataIndex: 'payType',
      render: text => globalPayType(text),
    }, {
      title: '结算周期',
      dataIndex: 'settleType',
      render: text => globalSettleType(text),
    }, {
      title: '成本费率',
      dataIndex: 'cFeeRate',
      render: text => feeRateFormat(text),
    }, {
      title: '费率',
      dataIndex: 'feeRate',
      render: text => feeRateFormat(text),
    }, {
      title: '商户最低费率',
      dataIndex: 'merchantMinRate',
      render: text => feeRateFormat(text),
    }, {
      title: '商户最低单笔固定',
      dataIndex: 'merchantMinStatic',
      render: text => amountFormat(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => status(text),
    }, {
      title: '操作',
      render: (text, record) => {
        if (record.status == 0) {
          return <Button icon="check" type="primary" onClick={e =>add(record)}>开通</Button>
        } else if (record.status == 1) {
          return <Button icon="close" onClick={e => remove(record)}>取消</Button>
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
