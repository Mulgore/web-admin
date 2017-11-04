import React from 'react'
import {layer} from 'components'
import PropTypes from 'prop-types'
import {Button, Form, Input, Cascader} from 'antd'

const FormItem = Form.Item

const hasErrors = (amount, permission) => {
  if (amount == '') {
    return 'disabled'
  }
  if (amount == null) {
    return 'disabled'
  }
  if (amount <= 0) {
    return 'disabled'
  }
  if (permission !== 1) {
    return 'disabled'
  }
  return ''
}

const Info = ({
                info,
                flowResult=[],
                onOk,
                getFlowData,
                onEditFlowPay,
                form: {
                  getFieldDecorator,
                  getFieldsValue,
                  validateFields,
                },

              }) => {
  const {amount, sales, permission, userId} = info
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      let flowId = data.flowId[0]
      delete data.flowId
      data.flowId = flowId
      onOk(data)
    })
  }
const handleFlowData=() =>{
    const data = {
      ...getFieldsValue(),
    }
    getFlowData(data)
}

  const handleFlowPayOk = () => {
    onEditFlowPay()
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
  const Status = (status) => {
    switch (status) {
      case 1:
        return <Button type="dashed">已开通</Button>
      case 0:
        return <Button type="dashed">审核中</Button>
      case 2:
        return <Button type="dashed">已冻结</Button>
      default:
        return <Button type="primary" onClick={handleFlowPayOk}>立即申请</Button>
    }
  }

  function displayRender(label) {
    return label[label.length - 1];
  }

  return (<Form>
    <FormItem {...formItemLayout} label="账户余额">
      <label style={{color: 'red'}}>{amount} 元</label>
    </FormItem>
    <FormItem {...formItemLayout} label="充值号码" hasFeedback>
      {getFieldDecorator('mobile', {
        rules: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的电话号码!',
          },
        ],
      })(<Input size="large" style={{width: '150px'}} onBlur={handleFlowData} placeholder="请输入充值手机号"/>)}
    </FormItem>
    <FormItem {...formItemLayout} label="流量套餐">
      {getFieldDecorator('flowId', {
        rules: [
          {
            required: true,
            message: '请选择充值流量!',
          },
        ],
      })(<Cascader placeholder="请选择流量套餐" options={flowResult} style={{width: '150px'}} expandTrigger="hover" displayRender={displayRender}/>)}
    </FormItem>
    <FormItem {...tailFormItemLayout}>
      <Button type="primary" onClick={handleOk} disabled={hasErrors(amount, permission)}>立即充值</Button>
    </FormItem>
    <FormItem {...formItemLayout} label="账户">
      <label>{userId}</label>
    </FormItem>
    <FormItem {...formItemLayout} label="业务权限">
      {Status(permission)}
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
  getFlowData: PropTypes.func,
  onEditFlowPay: PropTypes.func,
  permission: PropTypes.string,
  userId: PropTypes.string,
  form: PropTypes.object,
  filter: PropTypes.object,
}

export default Form.create()(Info)

