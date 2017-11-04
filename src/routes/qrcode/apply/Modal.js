import React from 'react'
import PropTypes from 'prop-types'
import { Form, InputNumber, Modal } from 'antd'

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
                 onOk,
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
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="申请个数" hasFeedback {...formItemLayout}>
          {getFieldDecorator('applyCount', {
            rules: [
              {
                required: true,
                message: '申请个数不能为空!',
              },
            ],
          })(<InputNumber size="large" min={0} max={1000000} style={{ width: 200 }} placeholder="请输入申请个数"/>)}
        </FormItem>
        <FormItem label="商户费率" hasFeedback {...formItemLayout}>
          {getFieldDecorator('applyRate', {
            rules: [
              {
                required: true,
                message: '商户费率不能为空!',
              },
            ],
          })(<InputNumber size="large" min={0} max={10} style={{ width: 200 }} placeholder="请输入商户费率"/>)}
        </FormItem>
        <FormItem label="单笔最高限额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('max', {
            rules: [
              {
                required: true,
                message: '单笔最高限额不能为空!',
              },
            ],
          })(<InputNumber size="large" min={0} max={1000000} style={{ width: 200 }} placeholder="请输入单笔最高限额"/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
