import React from 'react'
import {Table} from 'antd'
import styles from './List.less'
import {qrcodeActive, merchantStatusItem, merchantTypeItem} from '../../../utils'
import {DropOption} from 'components'

const List = ({onInfoView, onPayTypeView, onQRCodeView, onBankView, ...tableProps}) => {

  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onInfoView(record)
        break;
      case '2':
        onQRCodeView(record)
        break;
      case '3':
        onPayTypeView(record)
        break;
      case '4':
        onBankView(record)
        break;
    }
  }
  const menuOptionsData = [
    {
      key: '1',
      name: '详情'
    }, {
      key: '2',
      name: '二维码'
    }, {
      key: '3',
      name: '支付配置'
    }, {
      key: '4',
      name: '结算信息'
    }
  ]
  const columns = [
    {
      title: '商户号',
      dataIndex: 'merchantNo',
    }, {
      title: '联系人',
      dataIndex: 'linkman',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '类型',
      dataIndex: 'type',
      render: text => merchantTypeItem(text),
    }, {
      title: '简称',
      dataIndex: 'shortName',
    }, {
      title: '激活',
      dataIndex: 'active',
      render: text => qrcodeActive(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => merchantStatusItem(text),
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日') : ''),
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
