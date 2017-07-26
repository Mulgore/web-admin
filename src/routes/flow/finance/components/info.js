import React from 'react'
import {layer} from 'components'
import PropTypes from 'prop-types'
import {Button, Form, InputNumber, Radio} from 'antd'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item

const Info = ({
                info,
                onOk,
                form: {
                  getFieldDecorator,
                  validateFields,
                  getFieldsValue,
                },
              }) => {
  const {amount, userId} = info

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 14},
    },
  };
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
  };

  return (<Form>
    <FormItem {...formItemLayout} label="账户余额" hasFeedback>
      <label style={{color: 'red'}}>&nbsp;&nbsp;{amount} 元</label>
    </FormItem>
    <FormItem {...formItemLayout} label="账户">
      {getFieldDecorator('userId', {initialValue: userId})(
        <label>{userId}</label>
      )}
    </FormItem>
    <FormItem {...formItemLayout} label="充值金额">
      {getFieldDecorator('amount', {
        rules: [
          {
            required: false,
          },
        ],
      })(
        <RadioGroup size="large">
          <RadioButton value="500">500</RadioButton>
          <RadioButton value="1000">1000</RadioButton>
          <RadioButton value="5000">5000</RadioButton>
        </RadioGroup>
      )}
    </FormItem>
    <FormItem {...tailFormItemLayout} hasFeedback>
      {getFieldDecorator('amount', {
        rules: [
          {
            required: true,
            message: '提现金额不能为空!'
          },
        ],
      })(<InputNumber size="large" min={5} max={50000} style={{width: '150px'}}
                      placeholder="请输入金额(5-50000)"></InputNumber>)}
    </FormItem>
    <FormItem {...formItemLayout} label="支付方式" hasFeedback>
      {getFieldDecorator('payType',{
        rules: [
          {
            required: true,
            message: '支付方式不能为空!'
          },
        ],
      })(
        <RadioGroup defaultValue="21" size="large">
          <RadioButton value="21">微信支付</RadioButton>
          <RadioButton value="41">支付宝</RadioButton>
          <RadioButton value="11" disabled>银行卡</RadioButton>
        </RadioGroup>
      )}
    </FormItem>
    <FormItem {...tailFormItemLayout} hasFeedback>
      <Button type='primary' onClick={handleOk}>立即充值</Button>
    </FormItem>
  </Form>)


}


Info.propTypes = {
  form: PropTypes.object.isRequired,
  info: PropTypes.object,
  onOk: PropTypes.func,
}

export default (Form.create()(Info))

