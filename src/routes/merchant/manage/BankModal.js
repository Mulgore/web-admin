import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col} from 'antd'

const modal = ({
                 item = {},
                 ...modalProps
               }) => {
  const {
    accountNo,
    bankMobile,
    bankCity,
    bankProvince,
    accountName,
    bankName,
    bankSubbranch,
  } = item
  const modalOpts = {
    ...modalProps,
  }
  return (
    <Modal {...modalOpts}>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>银行卡号:&nbsp;&nbsp;</label>
          <label>{accountNo}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>预留手机号:&nbsp;&nbsp;</label>
          <label>{bankMobile}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>开户人:&nbsp;&nbsp;</label>
          <label>{accountName}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>银行:&nbsp;&nbsp;</label>
          <label>{bankName}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>支行:&nbsp;&nbsp;</label>
          <label>{bankSubbranch}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>支行省份:&nbsp;&nbsp;</label>
          <label>{bankProvince}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>支行城市:&nbsp;&nbsp;</label>
          <label>{bankCity}</label>
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
