import React from 'react'
import {Table, Modal} from 'antd'
import styles from './List.less'
import {agentLevelItem, agentStatusItem} from '../../../utils'
import {DropOption} from 'components'

const confirm = Modal.confirm

const List = ({onInfoView, onEditView, onPayTypeView, onProfitView, onProfitRecord, onProfitWithdraw, onDisabledView, ...tableProps}) => {

  const handleMenuClick = (item, e) => {
    switch (e.key) {
      case '1':
        onInfoView(item)
        break;
      case '2':
        onEditView(item)
        break;
      case '3':
        onPayTypeView(item)
        break;
      case '4':
        onProfitView(item)
        break;
      case '6':
        onProfitRecord(item)
        break;
      case '7':
        onProfitWithdraw(item)
        break;
      case '5':
        if (item.status != 3) {
          confirm({
            title: '确定要禁用代理商吗 ?',
            onOk() {
              onDisabledView(item)
            },
          })
        }
    }
  }
  const menuOptionsData = [
    {
      key: '1',
      name: '详情'
    }, {
      key: '2',
      name: '编辑'
    }, {
      key: '3',
      name: '支付配置'
    }, {
      key: '4',
      name: '分润清算'
    }, {
      key: '6',
      name: '分润明细'
    }, {
      key: '7',
      name: '分润提现'
    }, {
      key: '5',
      name: '禁用'
    },
  ]
  const columns = [
    {
      title: '用户名',
      dataIndex: 'realName',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '代理等级',
      dataIndex: 'agentLevel',
      render: text => agentLevelItem(text),
    }, {
      title: '负责人',
      dataIndex: 'leader',
    }, {
      title: '运营省份',
      dataIndex: 'provinceName',
    }, {
      title: '运营城市',
      dataIndex: 'cityName',
    }, {
      title: '合同开始时间',
      dataIndex: 'contractBegin',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日') : ''),
    }, {
      title: '合同结束时间',
      dataIndex: 'contractEnd',
      render: text => (text != null ? new Date(text).format('yyyy年MM月dd日') : ''),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => agentStatusItem(text),
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
