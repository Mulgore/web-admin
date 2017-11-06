import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col} from 'antd'
import { agentLevelItem} from '../../../utils'

const modal = ({
                 item = {},
                 ...modalProps
               }) => {
  const {
    agentLevel,
    realName,
    company,
    leader,
    deposit,
    contractBegin,
    contractEnd,
    bankAccountNo,
    bankMobile,
    bankCity,
    bankProvince,
    idNumber,
    bankAccountName,
    bankName,
    bankSubbranch,
    provinceName,
    cityName,
    areaName,
    provinceCode,
    cityCode,
    areaCode,
    address,
    mobile,
  } = item
  const modalOpts = {
    ...modalProps,
  }

  return (
    <Modal {...modalOpts}>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>用户名:&nbsp;&nbsp;</label>
          <label>{realName}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>手机号:&nbsp;&nbsp;</label>
          <label>{mobile}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>公司:&nbsp;&nbsp;</label>
          <label>{company}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>负责人:&nbsp;&nbsp;</label>
          <label>{leader}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>保证金:&nbsp;&nbsp;</label>
          <label>{deposit/100} 元</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>代理商级别:&nbsp;&nbsp;</label>
          <label>{agentLevelItem(agentLevel)}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>代理商地址:&nbsp;&nbsp;</label>
          <label>{provinceCode != '' ? provinceCode : ''}{cityCode != '' ? '/' + cityCode : ''}{areaCode != '' ? '/' + areaCode : ''}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>运营区域:&nbsp;&nbsp;</label>
          <label>{provinceName != '' ? provinceName : ''}{cityName != '' ? '/' + cityName : ''}{areaName != '' ? '/' + areaName : ''}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>详细地址:&nbsp;&nbsp;</label>
          <label>{address}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>合同开始时间:&nbsp;&nbsp;</label>
          <label>{contractBegin != null ? new Date(contractBegin).format('yyyy年MM月dd日') : ''}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>合同结束时间:&nbsp;&nbsp;</label>
          <label>{contractEnd != null ? new Date(contractEnd).format('yyyy年MM月dd日') : ''}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>银行卡号:&nbsp;&nbsp;</label>
          <label>{bankAccountNo}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>预留手机号:&nbsp;&nbsp;</label>
          <label>{bankMobile}</label>
        </Col>
      </Row>
      <Row gutter={24} style={{marginBottom: 20}}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>身份证:&nbsp;&nbsp;</label>
          <label>{idNumber}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>开户人:&nbsp;&nbsp;</label>
          <label>{bankAccountName}</label>
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
