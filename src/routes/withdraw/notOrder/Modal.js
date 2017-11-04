import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col} from 'antd'
import {
  withdrawStatus,
  globalPayType,
  withdrawOrderType,
  amountFormat,
  feeRateFormat,
  globalSettleType
} from '../../../utils'
const modal = ({
                 item = {},
                 ...modalProps
               }) => {
  const {amount, payAmount, feeRate, feeStatic, remitOrderId, payOrderId, feeTotal, tn, outTradeNo, orderId, payType, realName, withdrawAccount, withdrawAccountName, withdrawCityName, withdrawProvinceName, withdrawBank, settleOrg, withdrawType, status, type, createTime, payTime} = item
  const modalOpts = {
    ...modalProps,
  }
  const settleOrgItem = (item) => {
    switch (item) {
      case 1:
        return '平台'
      case 2:
        return '银行'
    }
  }
  return (
    <Modal {...modalOpts}>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>用户名:&nbsp;&nbsp;</label>
          <label>{realName}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>交易流水:&nbsp;&nbsp;</label>
          <label>{tn}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>平台订单号:&nbsp;&nbsp;</label>
          <label>{orderId}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>商户订单号:&nbsp;&nbsp;</label>
          <label>{outTradeNo}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>代付订单号:&nbsp;&nbsp;</label>
          <label>{remitOrderId}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>支付订单号:&nbsp;&nbsp;</label>
          <label>{payOrderId}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>状态:&nbsp;&nbsp;</label>
          <label>{withdrawStatus(status)}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>支付金额:&nbsp;&nbsp;</label>
          <label>{amountFormat(amount)}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>提现金额:&nbsp;&nbsp;</label>
          <label>{amountFormat(payAmount)}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>费率:&nbsp;&nbsp;</label>
          <label>{feeRateFormat(feeRate)}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>单笔固定:&nbsp;&nbsp;</label>
          <label>{amountFormat(feeStatic)}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>总费用:&nbsp;&nbsp;</label>
          <label>{amountFormat(feeTotal)}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>户名:&nbsp;&nbsp;</label>
          <label>{withdrawAccountName}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>结算账号:&nbsp;&nbsp;</label>
          <label>{withdrawAccount}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>结算银行:&nbsp;&nbsp;</label>
          <label>{withdrawBank}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>银行省份:&nbsp;&nbsp;</label>
          <label>{withdrawProvinceName}</label>
        </Col>
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>银行城市:&nbsp;&nbsp;</label>
          <label>{withdrawCityName}</label>
        </Col>
      </Row>
      <Row gutter={24} >
         <Col xl={{ span: 12 }} md={{ span: 10 }} sm={{ span: 12 }} style={{margin: '10px 0'}}>
          <label>订单类型:&nbsp;&nbsp;</label>
          <label>{withdrawOrderType(type)}</label>
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
          <label>{globalSettleType(withdrawType)}</label>
        </Col>
      </Row>
      <Row gutter={24} >
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
