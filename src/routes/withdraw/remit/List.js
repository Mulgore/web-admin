import React from 'react'
import { Table, Button } from 'antd'
import PropTypes from 'prop-types'
import styles from './List.less'

const status = (key) => {
 switch (key){
   case 1:
     return <Button type="dashed">可用</Button>
   case 0:
     return <Button style={{ color:'#f56a00' }} type="dashed" >不可用</Button>
 }
}

const payType = (key) => {
  switch (key) {
    case 10:
      return <Button style={{ color:'#f56a00' }} type="dashed">银联快捷</Button>
    case 11:
      return <Button style={{ color:'#f56a00' }} type="dashed">银联Wap(勇易)</Button>
    case 20:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(APP)</Button>
    case 21:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(二维码)</Button>
    case 22:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(扫码)</Button>
    case 23:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(公众号)</Button>
    case 24:
      return <Button style={{ color:'#00a854' }} type="dashed">微信支付(Wap)</Button>
    case 40:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(APP)</Button>
    case 41:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(二维码)</Button>
    case 42:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(扫码)</Button>
    case 43:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(服务窗)</Button>
    case 44:
      return <Button style={{ color:'#108ee9' }} type="dashed">支付宝(Wap)</Button>
    case 50:
      return <Button style={{ color:'#f56a00' }} type="dashed">MPOS</Button>
    case 51:
      return <Button style={{ color:'#f56a00' }} type="dashed">MPOS(即富)</Button>
    case 52:
      return <Button style={{ color:'#f56a00' }} type="dashed">大POS</Button>
    case 31:
      return <Button style={{ color:'#f56a00' }} type="dashed">QQ二维码</Button>
    case 13:
      return <Button style={{ color:'#f56a00' }} type="dashed">银联快捷(摩宝)</Button>
    case 32:
      return <Button style={{ color:'#f56a00' }} type="dashed">QQ扫码</Button>
    default:
      return <Button style={{ color:'#f56a00' }} type="dashed">未知</Button>
  }
}


const List = ({ onEditItem, ...tableProps }) => {

  const onChangeAuto = (record)=>{
    onEditItem(record)
  }

  const columns = [
    {
      title: '通道余额',
      dataIndex: 'amount',
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      render: (text) => payType(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => status(text),
    }, {
      title: '上次提现时间',
      dataIndex: 'createTime',
    },{
      title: '操作',
      render: (text, record) => {
        if (record.status===1) {
          return <Button onClick={e => onChangeAuto(record)}>提现</Button>
        }
      },
  },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
