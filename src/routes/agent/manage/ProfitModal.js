import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col, Form, InputNumber, Select,} from 'antd'

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
                 item = {},
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {

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

  const modalOpts = {
    ...modalProps,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="总分润">
          <label style={{color: 'red'}}>{item.splitTotal} 元</label>
        </FormItem>
        <FormItem {...formItemLayout} label="已提现">
          <label style={{color: 'red'}}>{item.splitWithdraw} 元</label>
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
}

export default Form.create()(modal)
