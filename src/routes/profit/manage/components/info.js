import React from 'react'
import PropTypes from 'prop-types'
import {Button, Form, InputNumber} from 'antd'

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
  const {splitTotal, balance, splitWithdraw, userSplitTotal, userBalance, userSplitWithdraw} = info
  const hasErrors = (balance) => {
    if (balance == null) {
      return 'disabled'
    }
    if (balance === 0) {
      return 'disabled'
    }
    if (balance <100) {
      return 'disabled'
    }
    return ''
  }

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      data.type=1
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

  return (
    <Form>
      <FormItem {...formItemLayout} label="代理商总分润">
        <label style={{color: 'red'}}>{splitTotal != null ? splitTotal : 0} 元</label>
      </FormItem>
      <FormItem {...formItemLayout} label="已提现">
        <label style={{color: 'red'}}>{splitWithdraw != null ? splitWithdraw : 0} 元</label>
      </FormItem>
      <FormItem {...formItemLayout} label="未提现">
        <label style={{color: 'red'}}>{balance != null ? balance : 0} 元</label>
      </FormItem>
      <FormItem {...formItemLayout} label="提现金额" hasFeedback>
        {getFieldDecorator('amount', {
          rules: [
            {
              required: true,
              message: '提现金额不能为空!',
            },
          ],
        })(<InputNumber size="large"
                        min={100}
                        max={balance}
                        style={{width: '150px'}}
                        placeholder="请输入金额(100-50000)"
        />)}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" onClick={handleOk} disabled={hasErrors(balance)}>申请提现</Button>
      </FormItem>
    </Form>
  )
}


Info.propTypes = {
  form: PropTypes.object.isRequired,
  info: PropTypes.object,
  onOk: PropTypes.func,
}

export default (Form.create()(Info))

