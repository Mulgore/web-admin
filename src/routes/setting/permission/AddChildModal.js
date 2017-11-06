import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Form, Input, Select} from 'antd'

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
                 onUpdate,
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
      data.pid = item.pid;
      if (item.id) {
        data.id = item.id;
        onUpdate(data)
      } else {
        onOk(data)
      }
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
            rules: [
              {
                required: true,
                message: '菜单名称不能为空 !',
              },
            ],
          })(<Input placeholder="请输入菜单名称"/>)}
        </FormItem>
        <FormItem label="菜单图标" hasFeedback {...formItemLayout}>
          {getFieldDecorator('icon', {
            initialValue: item.icon,
            rules: [
              {
                required: true,
                message: '菜单图标不能为空',
              },
            ],
          })(<Input placeholder="请输入菜单图标"/>)}
        </FormItem>
        <FormItem label="菜单链接" hasFeedback {...formItemLayout}>
          {getFieldDecorator('url', {
            initialValue: item.url,
            rules: [
              {
                required: true,
                message: '菜单链接不能为空',
              },
            ],
          })(<Input placeholder="请输入菜单链接"/>)}
        </FormItem>
        <FormItem label="菜单备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '菜单备注不能为空 !',
              },
            ],
          })(<Input placeholder="请输入菜单备注"/>)}
        </FormItem>
        <FormItem label="菜单状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: item.state ? item.state : 1,
          })(<Select placeholder="菜单状态">
            <Option value={0}>禁用</Option>
            <Option value={1}>启用</Option>
          </Select>)}
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
