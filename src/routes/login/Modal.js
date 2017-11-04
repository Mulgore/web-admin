import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Form, Input, Button, Icon} from 'antd'

const FormItem = Form.Item


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const modal = ({
                 loadingCheck,
                 onOk,
                 onHandleSms,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {

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
  const handleSms = () => {
      const data = {
        ...getFieldsValue(),
      }
      onHandleSms(data)
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '输入的电话号码格式不正确 !',
              },
            ],
          })(<Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="请输入手机号"/>)}
        </FormItem>
        <FormItem label="新密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入新密码 !',
              },
            ],
          })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码"/>)}
        </FormItem>
        <FormItem label="验证码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('smsCode', {
            rules: [
              {
                required: true,
                message: '输入短信验证码 !',
              },
            ],
          })(<Input prefix={<Icon type="message" style={{ fontSize: 13 }} />} style={{width:'46%',marginRight:20}} placeholder="输入验证码"/>)}
          <Button size="small" onClick={handleSms} loading={loadingCheck} disabled={loadingCheck}>发送验证码</Button>
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
