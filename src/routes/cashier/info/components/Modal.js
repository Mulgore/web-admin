import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Input } from 'antd'

const { TextArea } = Input
const modal = ({ payInfo, ...modalProps }) => {
  const modalOpts = { ...modalProps }
  const { url, payUrl, payMap } = payInfo

  return (
    <Modal {...modalOpts} >
      <div>
        <Row gutter={16}>
          <Col span={12} push={4}>支付请求参数:</Col>
          <Col span={12} pull={3}><TextArea autosize>{payMap}</TextArea></Col>
        </Row>
        <div style={{ margin: '24px 0' }} />
        <Row gutter={16}>
          <Col span={12} push={4}>收银台URL:</Col>
          <Col span={12} pull={3}> <TextArea autosize>{url}</TextArea></Col>
        </Row>
        <div style={{ margin: '24px 0' }} />
        <Row gutter={16}>
          <Col span={12} push={4}>收款数据示例:</Col>
          <Col span={12} pull={3}><TextArea autosize>{payUrl}</TextArea></Col>
        </Row>
        <div style={{ margin: '24px 0' }} />
        <Row gutter={16}>
          <Col span={12} push={4}>支付数据解析:</Col>
          <Col span={12} pull={3}>
            <TextArea autosize>
            1 请求参数:
            该支付请求方式为GET请求方式,该请求格式为String类型.
            </TextArea>
          </Col>
        </Row>
        <div style={{ margin: '24px 0' }} />
        <Row gutter={16}>
          <Col span={12} push={4} />
          <Col span={12} pull={3}>
            <TextArea autosize>
            2 请求url:
          该支url为:https://cash.fulapay.com/cashier/index
            </TextArea>
          </Col>
        </Row>
        <div style={{ margin: '24px 0' }} />
        <Row gutter={16}>
          <Col span={12} push={4} />
          <Col span={12} pull={3}>
            <TextArea autosize>
            3 请求示例:
          该请求必须要对GET请求的参数进行URL编码。
            </TextArea>
          </Col>
        </Row>
        <div style={{ margin: '24px 0' }} />
        <Row gutter={16}>
          <Col span={12} push={4} />
          <Col span={12} pull={3}>
            <TextArea autosize>
           4 sign:
          sign签名的生成String sign = "appId=" + 所属应用id + "&mchId=" + 商户号 + "&privateKey=" + 商户私钥;
            </TextArea>
          </Col>
        </Row>
        <div style={{ margin: '24px 0' }} />
        <Row gutter={16}>
          <Col span={12} push={4} />
          <Col span={12} pull={3}>
            <TextArea autosize>
            5 请求指导:
          商户通过该收银台线下收款时可以修改相应的请求参数如:app_id,mch_id,notify_url,private_key,out_trade_no...，然后对请求的参数进行URL编码，向收银台发起支付请求。
            </TextArea>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

modal.propTypes = {
  payInfo: PropTypes.object,
}

export default modal
