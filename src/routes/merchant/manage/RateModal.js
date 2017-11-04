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
                 onOk,
                 item = {},
                 merchantId,
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
        merchantId: merchantId,
        payType: item.payType,
      }
      data.max = data.max*100
      data.feeMin = data.feeMin*100
      data.feeStatic = data.feeStatic*100
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
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="结算周期" hasFeedback {...formItemLayout}>
              {getFieldDecorator('settleType', {initialValue: item.settleType}, {
                rules: [
                  {
                    required: true,
                    message: '请选择结算周期!',
                  },
                ],
              })(<Select placeholder="请选择结算周期" style={{width: '100%'}} size="large">
                <option value={1}>T + 0</option>
                <option value={2}>T + 1</option>
                <option value={-1}>手动提现</option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="费率" hasFeedback {...formItemLayout}>
              {getFieldDecorator('feeRate', {initialValue: item.feeRate}, {
                rules: [
                  {
                    required: true,
                    message: '请输入商户费率!',
                  },
                ],
              })(<InputNumber placeholder={`商户费率最低费率为${item.merchantMinRate}%`} min={item.merchantMinRate != null ? item.merchantMinRate:0} style={{width: '100%'}} size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="单笔最低手续费金额" hasFeedback {...formItemLayout}>
                {getFieldDecorator('feeMin', {
                rules: [
                  {
                    required: true,
                    message: '请输入单笔最低手续费金额!',
                  },
                ],
              })(<InputNumber placeholder="单笔最低手续费金额" style={{width: '100%'}} size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="单笔固定费用" hasFeedback {...formItemLayout}>
              {getFieldDecorator('feeStatic', {
                rules: [
                  {
                    required: true,
                    message: '请输入单笔固定费用 !',
                  },
                ],
              })(<InputNumber placeholder="单笔固定费用" min={item.merchantMinStatic != null ? item.merchantMinStatic/100:0} style={{width: '100%'}} size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="单笔最高限额" hasFeedback {...formItemLayout}>
              {getFieldDecorator('max', {
                rules: [
                  {
                    required: true,
                    message: '请输入单笔最高限额!',
                  },
                ],
              })(<InputNumber placeholder="单笔最高限额" style={{width: '100%'}} size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="单笔最低限额" hasFeedback {...formItemLayout}>
              {getFieldDecorator('min', {
                rules: [
                  {
                    required: true,
                    message: '请输入单笔最低限额!',
                  },
                ],
              })(<InputNumber placeholder="单笔最低限额" min={10} style={{width: '100%'}} size="large"/>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
  onBankData: PropTypes.func,
}

export default Form.create()(modal)
