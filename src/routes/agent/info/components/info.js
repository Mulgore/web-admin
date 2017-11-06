import React from 'react'
import PropTypes from 'prop-types'
import {layer} from 'components'
import {Col, Row, Form} from 'antd'

const FormItem = Form.Item

function Info({
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
                agentAddress,
                operationAddress,
                address,
                mobile,
              }) {

  const Layout = {
    labelCol: {
      xs: {label: 24},
      sm: {label: 8},
    },
    wrapperCol: {
      xs: {label: 24},
      sm: {label: 16},
    },
  }

  return (<Form>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>用户名:&nbsp;&nbsp;</label>
          <label>{realName}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>手机号:&nbsp;&nbsp;</label>
          <label>{mobile}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>公司:&nbsp;&nbsp;</label>
          <label>{company}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>负责人:&nbsp;&nbsp;</label>
          <label>{leader}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>保证金:&nbsp;&nbsp;</label>
          <label>{deposit}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>代理商级别:&nbsp;&nbsp;</label>
          <label>{agentLevel}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>代理商地址:&nbsp;&nbsp;</label>
          <label>{agentAddress}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>代理区域:&nbsp;&nbsp;</label>
          <label>{operationAddress}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>详细地址:&nbsp;&nbsp;</label>
          <label>{address}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>合同开始时间:&nbsp;&nbsp;</label>
          <label>{contractBegin}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>合同结束时间:&nbsp;&nbsp;</label>
          <label>{contractEnd}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>银行卡号:&nbsp;&nbsp;</label>
          <label>{bankAccountNo}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>预留手机号:&nbsp;&nbsp;</label>
          <label>{bankMobile}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>身份证:&nbsp;&nbsp;</label>
          <label>{idNumber}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>开户人:&nbsp;&nbsp;</label>
          <label>{bankAccountName}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>银行:&nbsp;&nbsp;</label>
          <label>{bankName}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>支行:&nbsp;&nbsp;</label>
          <label>{bankSubbranch}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row gutter={24}>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>支行省份:&nbsp;&nbsp;</label>
          <label>{bankProvince}</label>
        </Col>
        <Col xl={{span: 12}} md={{span: 10}} sm={{span: 12}}>
          <label>支行城市:&nbsp;&nbsp;</label>
          <label>{bankCity}</label>
        </Col>
      </Row>
    </FormItem>
  </Form>)
}

Info.propTypes = {
  agentLevel: PropTypes.string,
  agentAddress: PropTypes.string,
  operationAddress: PropTypes.string,
  address: PropTypes.string,
  mobile: PropTypes.string,
  realName: PropTypes.string,
  company: PropTypes.string,
  leader: PropTypes.string,
  deposit: PropTypes.string,
  contractBegin: PropTypes.string,
  contractEnd: PropTypes.string,
  bankAccountNo: PropTypes.string,
  bankCity: PropTypes.string,
  bankProvince: PropTypes.string,
  bankMobile: PropTypes.string,
  idNumber: PropTypes.string,
  bankAccountName: PropTypes.string,
  bankName: PropTypes.string,
  bankSubbranch: PropTypes.string,
}

export default Info
