import React from 'react'
import PropTypes from 'prop-types'
import {layer} from 'components'
import {Col, Row, Button, Icon, Form, Input,InputNumber} from 'antd'
const FormItem = Form.Item;

const Info = ({ merchantNo,
                orderId,
                notifyUrl,
                form: {
                  getFieldDecorator,
                  getFieldsValue,
                  setFieldsValue,
                },
              }) => {

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


  const handleFields = (fields) => {
    const { mobile, payType } = fields
    console.log(fields)
    if (mobile.length) {
      console.log(mobile)
    }
    if (payType) {
      console.log(payType)
    }
    return fields
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
  }

  const showViewChange = () =>{
  }
  const url = notifyUrl;
  return (<Form>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>商户号:&nbsp;&nbsp;</label>
          <label>{merchantNo}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>商户订单号:&nbsp;&nbsp;</label>
          <label>{orderId}</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={12} offset={2}>
          <label>回调URL:&nbsp;&nbsp;</label>
          {getFieldDecorator('notifyUrl', {initialValue: url })(<Input size="large" style={{width: '200px'}}
                                                                      placeholder="请输入回调URL"></Input>)}
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={12} offset={2}>
          <label>订单描述:&nbsp;&nbsp;</label>
          {getFieldDecorator('desc')(<Input size="large" style={{width: '200px'}}
                                                                         placeholder="请输入订单描述"></Input>)}
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>支付金额:&nbsp;&nbsp;</label>
        <InputNumber size="large" min={10} max={50000} style={{width: '200px'}} placeholder="请输入金额(10-50000)"></InputNumber>
      </Col>
    </Row>
    </FormItem>
  </Form>)
}


Info.propTypes = {
  merchantNo: PropTypes.string,
  orderId: PropTypes.string,
  notifyUrl: PropTypes.string,
  form: PropTypes.object,
  filter: PropTypes.object,
}

export default Form.create()(Info)
