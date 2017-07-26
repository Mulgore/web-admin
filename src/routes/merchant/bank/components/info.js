import React from 'react'
import PropTypes from 'prop-types'
import {layer} from 'components'
import {Col, Row, Form} from 'antd'
const FormItem = Form.Item;

function Info({bankName, bankSubbranch, cityName, provinceName, isCompany, accountNo, mobile, accountName}) {

  const Layout = {
    labelCol: {
      xs: {label: 24},
      sm: {label: 8},
    },
    wrapperCol: {
      xs: {label: 24},
      sm: {label: 16},
    },
  };

  return (<Form>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>银行名称:&nbsp;&nbsp;</label>
          <label>{bankName}</label>
        </Col>
        <Col span={10} offset={2}>
          <label>支行名称:&nbsp;&nbsp;</label>
          <label>{bankSubbranch}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>银行户名:&nbsp;&nbsp;</label>
          <label>{ accountName }</label>
        </Col>
        <Col span={10} offset={2}>
          <label>银行卡号:&nbsp;&nbsp;</label>
          <label>{ accountNo }</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>银行省份:&nbsp;&nbsp;</label>
          <label>{ provinceName }</label>
        </Col>
        <Col span={10} offset={2}>
          <label>银行城市:&nbsp;&nbsp;</label>
          <label>{ cityName }</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>预留电话:&nbsp;&nbsp;</label>
          <label>{ mobile }</label>
        </Col>
        <Col span={10} offset={2}>
          <label>是否对公:&nbsp;&nbsp;</label>
          <label>{ isCompany }</label>
        </Col>
      </Row>
    </FormItem>
  </Form>)
}

Info.propTypes = {
  accountNo: PropTypes.string,
  bankName: PropTypes.string,
  provinceName: PropTypes.string,
  bankSubbranch: PropTypes.string,
  cityName: PropTypes.string,
  mobile: PropTypes.string,
  accountName: PropTypes.string,
  isCompany: PropTypes.string,
}

export default Form.create()(Info)
