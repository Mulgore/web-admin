import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col} from 'antd'
import {payStatus, globalPayType, payOrderType, amountFormat, globalSettleType} from '../../../utils'
const modal = ({
                 item = {},
                 ...modalProps
               }) => {
  const {amount, tn, outTradeNo, orderId, payType, realName, settleOrg, settleType, status, type, createTime, payTime} = item
  const modalOpts = {
    ...modalProps,
  }
  const settleOrgItem = (item) => {
    switch (item) {
      case 1:
        return'平台'
      case 2:
        return '银行'
    }
  }
  return (
    <Modal {...modalOpts}>
      <Row gutter={24}>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12}} style={{margin: '10px 0'}}>
          <label>用户名:&nbsp;&nbsp;</label>
          <label>{realName}</label>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>交易流水:&nbsp;&nbsp;</label>
          <label>{tn}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>平台订单号:&nbsp;&nbsp;</label>
          <label>{orderId}</label>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>商户订单号:&nbsp;&nbsp;</label>
          <label>{outTradeNo}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>状态:&nbsp;&nbsp;</label>
          <label>{payStatus(status)}</label>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>支付金额:&nbsp;&nbsp;</label>
          <label>{amountFormat(amount)}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>订单类型:&nbsp;&nbsp;</label>
          <label>{payOrderType(type)}</label>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>支付方式:&nbsp;&nbsp;</label>
          <label>{globalPayType(payType)}</label>
        </Col>
      </Row>
      <Row gutter={24} >
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>清算机构:&nbsp;&nbsp;</label>
          <label>{settleOrgItem(settleOrg)}</label>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>结算类型:&nbsp;&nbsp;</label>
          <label>{globalSettleType(settleType)}</label>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>创建时间:&nbsp;&nbsp;</label>
          <label>{createTime != null ? new Date(createTime).format('yyyy年MM月dd HH:mm:ss') : ''}</label>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>支付时间:&nbsp;&nbsp;</label>
          <label>{payTime != null ? new Date(payTime).format('yyyy年MM月dd HH:mm:ss') : ''}</label>
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
