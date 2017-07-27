import React from 'react'
import {layer} from 'components'
import PropTypes from 'prop-types'
import {Button, Form, Input, Radio} from 'antd'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item

const hasErrors = (amount)=>{
  if (amount == ''){
    return 'disabled'
  }
  if (amount == null){
    return 'disabled'
  }
  if (amount <= 0){
    return 'disabled'
  }
  return ''
}

const Info = ({
                info,
                onOk,
                form: {
                  getFieldDecorator,
                  getFieldsValue,
                  validateFields,
                },

              }) => {
  const {amount, sales, permission, userId,  yDX = [], yLT = [], yYD = [], nDX = [], nLT = [], nYD = []} = info

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
  const Arr = (flows) => {
    if (flows != null) {
      const menu = flows.map(item => <RadioButton value={item.id}>{item.value}</RadioButton>)
      return <RadioGroup size="large">{menu}</RadioGroup>
    }
  }

  const mobile = '';
  const payType = '21';

  return (<Form>
    <FormItem {...formItemLayout} label="账户余额">
      <label style={{color: 'red'}}>{amount} 元</label>
    </FormItem>
    <FormItem {...formItemLayout} label="充值号码" hasFeedback>
      {getFieldDecorator('mobile', {
        initialValue: mobile,
        rules: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的电话号码!',
          },
        ],
      })(<Input size="large" style={{width: '150px'}} placeholder="请输入充值手机号"></Input>)}
    </FormItem>
    <FormItem {...formItemLayout} label="支付方式" hasFeedback>
      {getFieldDecorator('payType', {
        initialValue: payType,
        rules: [
          {
            required: true,
            message: '请选择支付方式!',
          },
        ],
      })(<RadioGroup size="large">
        <RadioButton value="21">微信支付</RadioButton>
        <RadioButton value="41">支付宝</RadioButton>
        <RadioButton value="11" disabled>银行卡</RadioButton>
      </RadioGroup>)}
    </FormItem>
    <FormItem {...formItemLayout} label="全国流量">
    </FormItem>
    <FormItem {...formItemLayout} label="移动" hasFeedback>
      {getFieldDecorator('pay', {
        rules: [
          {
            required: true,
            message: '请选择充值流量!',
          },
        ]
      })(Arr(yYD))}
    </FormItem>
    <FormItem {...formItemLayout} label="联通" hasFeedback>
      {getFieldDecorator('pay',{
        rules: [
          {
            required: true,
            message: '请选择充值流量!',
          },
        ]
      })(Arr(yLT))}
    </FormItem>
    <FormItem {...formItemLayout} label="电信" hasFeedback>
      {getFieldDecorator('pay',{
        rules: [
          {
            required: true,
            message: '请选择充值流量!',
          },
        ]
      })(Arr(yDX))}
    </FormItem>
    <FormItem {...formItemLayout} label="省内流量">
    </FormItem>
    <FormItem {...formItemLayout} label="移动" hasFeedback>
      {getFieldDecorator('pay',{
        rules: [
          {
            required: true,
            message: '请选择充值流量!',
          },
        ]
      })(Arr(nYD))}
    </FormItem>
    <FormItem {...formItemLayout} label="联通" hasFeedback>
      {getFieldDecorator('pay',{
        rules: [
          {
            required: true,
            message: '请选择充值流量!',
          },
        ]
      })(Arr(nLT))}
    </FormItem>
    <FormItem {...formItemLayout} label="电信" hasFeedback>
      {getFieldDecorator('pay',{
        rules: [
          {
            required: true,
            message: '请选择充值流量!',
          },
        ]
      })(Arr(nDX))}
    </FormItem>
    <FormItem {...tailFormItemLayout}>
      <Button type='primary' onClick={handleOk} disabled={hasErrors(amount)}>立即充值</Button>
    </FormItem>
    <FormItem {...formItemLayout} label="账户">
      <label>{userId}</label>
    </FormItem>
    <FormItem {...formItemLayout} label="业务权限">
      <Button type='dashed'>{permission}</Button>
    </FormItem>
    <FormItem {...formItemLayout} label="折扣">
      <label style={{color: 'red'}}>{sales}</label>
    </FormItem>

  </Form>)

}

Info.propTypes = {
  amount: PropTypes.number,
  sales: PropTypes.string,
  onOk: PropTypes.func,
  permission: PropTypes.string,
  userId: PropTypes.string,
  form: PropTypes.object,
  filter: PropTypes.object,
  yDX: PropTypes.array.isRequired,
  yLT: PropTypes.array.isRequired,
  yYD: PropTypes.array.isRequired,
  nDX: PropTypes.array.isRequired,
  nLT: PropTypes.array.isRequired,
  nYD: PropTypes.array.isRequired,
}

export default Form.create()(Info)


