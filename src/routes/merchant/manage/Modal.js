import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col} from 'antd'

const modal = ({
                 item = {},
                 ...modalProps
               }) => {
  const modalOpts = {
    ...modalProps,
  }
  return (
    <Modal {...modalOpts}>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>商户号:&nbsp;&nbsp;</label>
          <label>{item.merchantNo}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>简称:&nbsp;&nbsp;</label>
          <label>{item.shortName}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>全称:&nbsp;&nbsp;</label>
          <label>{item.fullName}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>省份:&nbsp;&nbsp;</label>
          <label>{item.provinceName}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>城市:&nbsp;&nbsp;</label>
          <label>{item.cityName}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>行业:&nbsp;&nbsp;</label>
          <label>{item.industry}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>地址:&nbsp;&nbsp;</label>
          <label>{item.address}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>联系电话:&nbsp;&nbsp;</label>
          <label>{item.mobile}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>联系人:&nbsp;&nbsp;</label>
          <label>{item.linkman}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>备注:&nbsp;&nbsp;</label>
          <label>{item.remark}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>是否自助:&nbsp;&nbsp;</label>
          <label>{item.isSelfApply === 0 ? '否' : '是'}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>商户机构号:&nbsp;&nbsp;</label>
          <label>{item.acqCode}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>邮箱:&nbsp;&nbsp;</label>
          <label>{item.email}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>客服电话:&nbsp;&nbsp;</label>
          <label>{item.servicePhone}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>组织机构号:&nbsp;&nbsp;</label>
          <label>{item.orgCode}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>营业执照号:&nbsp;&nbsp;</label>
          <label>{item.bizLincenseNo}</label>
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
