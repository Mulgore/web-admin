import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Form, Input,InputNumber, Select} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const modal = ({
                 item,
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
      data.id = item.id;
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
        <FormItem label="角色名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '角色名称不能为空 !',
              },
            ],
          })(<Input placeholder="请输入角色名称"/>)}
        </FormItem>
        <FormItem label="角色级别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sort', {
            initialValue: item.sort,
            rules: [
              {
                required: true,
                message: '角色级别不能为空 !',
              },
            ],
          })(<InputNumber placeholder="请输入角色级别" style={{width:'100%'}}/>)}
        </FormItem>
        <FormItem label="角色备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '角色备注不能为空 !',
              },
            ],
          })(<Input placeholder="请输入角色备注"/>)}
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
