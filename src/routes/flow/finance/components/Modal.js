import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal,Row,Col } from 'antd'
const QRCode = require('qrcode.react');

const modal = ({ payValue, ...modalProps }) => {

  const modalOpts = { ...modalProps }
  const { url, amount } = payValue

  return (
    <Modal {...modalOpts}>
      <div style={{width:260,margin:'0 auto'}}>
        <Row style={{margin:'10px 0'}}>
          <Col span={16} offset={6}>
          <label style={{fontSize:16, color:'#108ee9'}}>支付金额:{amount != null ? amount : 0}元</label>
          </Col>
        </Row>
      <QRCode size='260' value={url}/>
      </div>
    </Modal>
  )
}

modal.propTypes = {
  item: PropTypes.object,
}

export default Form.create()(modal)
