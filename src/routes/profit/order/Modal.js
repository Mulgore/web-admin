import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col} from 'antd'
import {profitStatus, globalPayType, profitRateFormat, profitOrderType, amountFormat} from '../../../utils'

const modal = ({
                 item = {},
                 ...modalProps
               }) => {
  const {payOrderId, payType, fromName, splitRate, splitAmount, payAmount, ownerType, type, createTime} = item
  const modalOpts = {
    ...modalProps,
  }
  return (
    <Modal {...modalOpts}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>分润用户:&nbsp;&nbsp;</label>
          <label>{fromName}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>支付订单号:&nbsp;&nbsp;</label>
          <label>{payOrderId}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>分润身份类型:&nbsp;&nbsp;</label>
          <label>{profitStatus(ownerType)}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>分润比例:&nbsp;&nbsp;</label>
          <label>{profitRateFormat(splitRate)}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>分润金额:&nbsp;&nbsp;</label>
          <label>{amountFormat(splitAmount)}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>支付金额:&nbsp;&nbsp;</label>
          <label>{amountFormat(payAmount)}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>订单类型:&nbsp;&nbsp;</label>
          <label>{profitOrderType(type)}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>支付方式:&nbsp;&nbsp;</label>
          <label>{globalPayType(payType)}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}} style={{margin: '10px 0'}}>
          <label>创建时间:&nbsp;&nbsp;</label>
          <label>{createTime != null ? new Date(createTime).format('yyyy年MM月dd HH:mm:ss') : ''}</label>
        </Col>
      </Row>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default modal
