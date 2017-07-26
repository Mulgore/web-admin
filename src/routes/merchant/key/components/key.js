import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Input, Button, Popconfirm} from 'antd'
const {TextArea} = Input;

function Key({item, onOk}) {

  const {publicKey, privateKey, fulaPublicKey} = item

  const autoKey = () => {
    onOk()
  }

  return (<div>
    <Row gutter={32}>
      <Col span={16} offset={2}>
        <div style={{margin: '16px 0'}}>
          <span>商户公钥: </span>
          <span><TextArea rplaceholder="Autosize" value={ publicKey }/></span>
        </div>
      </Col>
    </Row>
    <Row gutter={32}>
      <Col span={16} offset={2}>
        <div style={{margin: '16px 0'}}>
          <span>商户私钥: </span>
          <span><TextArea rows={7} value={ privateKey }/></span>
        </div>
      </Col>
    </Row>
    <Row gutter={32}>
      <Col span={16} offset={2}>
        <Popconfirm title={'确定要重新生成公钥吗?'} placement="top" onConfirm={autoKey}>
          <Button type="primary">重新生成公钥</Button>
        </Popconfirm>
      </Col>
    </Row>
    <Row gutter={32}>
      <Col span={16} offset={2}>
        <div style={{margin: '16px 0'}}>
          <span>付啦公钥: </span>
          <span><TextArea rplaceholder="Autosize" value={ fulaPublicKey }/></span>
        </div>
      </Col>
    </Row>
  </div>)
}

Key.propTypes = {
  publicKey: PropTypes.string,
  privateKey: PropTypes.string,
  fulaPublicKey: PropTypes.string,
  onOk: PropTypes.func,
}

export default Key
