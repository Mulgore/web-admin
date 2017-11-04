import React from 'react'
import PropTypes from 'prop-types'
import { layer } from 'components'
import { Col, Row, Button, Icon, Form, Input, InputNumber } from 'antd'

const FormItem = Form.Item

const Info = ({
  info,
  onOk,
  form: {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
  },
}) => {
  const { merchantNo, outTradeNo, notifyUrl, description } = info
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  }

  const handleOk = (type) => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        type,
      }

      onOk(data)
    })
  }

  return (<Form>
    <FormItem {...formItemLayout} label="商户号">
      {getFieldDecorator('merchantNo', { initialValue: merchantNo })(
        <label>{merchantNo}</label>
      )}
    </FormItem>
    <FormItem {...formItemLayout} label="商户订单号">
      {getFieldDecorator('outTradeNo', { initialValue: outTradeNo })(
        <label>{outTradeNo}</label>
      )}
    </FormItem>
    <FormItem {...formItemLayout} label="回调URL" hasFeedback>
      {getFieldDecorator('notifyUrl', {
        initialValue: notifyUrl,
        rules: [
          {
            required: true,
            message: '回调URL不能为空!',
          },
        ],
      })(<Input size="large" style={{ width: '200px' }} placeholder="请输入回调URL" />)}
    </FormItem>
    <FormItem {...formItemLayout} label="订单描述" hasFeedback>
      {getFieldDecorator('body', {
        initialValue: description,
        rules: [
          {
            required: true,
            message: '订单描述不能为空!',
          },
        ],
      })(<Input size="large" style={{ width: '200px' }} placeholder="请输入订单描述" />)}
    </FormItem>
    <FormItem {...formItemLayout} label="支付金额" hasFeedback>
      {getFieldDecorator('amount', {
        rules: [
          {
            required: true,
            message: '金额不能为空!',
          },
        ],
      })(<InputNumber size="large"
        min={10}
        max={50000}
        style={{ width: '200px' }}
        placeholder="请输入金额(10-50000)"
      />)}
    </FormItem>
    <FormItem {...tailFormItemLayout}>
      <Row>
        <Col xl={{span: 4}} md={{span: 10}} sm={{span: 12}}>
          <Button type="primary" onClick={e => handleOk(1)}>获取支付数据</Button>
        </Col>
        <Col xl={{span: 4}} md={{span: 10}} sm={{span: 12}}>
          <Button type="primary" onClick={e => handleOk(2)}>在线支付</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>)
}


Info.propTypes = {
  merchantNo: PropTypes.string,
  outTradeNo: PropTypes.string,
  description: PropTypes.string,
  notifyUrl: PropTypes.string,
  form: PropTypes.object,
  filter: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(Info)
