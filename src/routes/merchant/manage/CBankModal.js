import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col, Form, Input, Switch, Radio, Icon, Cascader, Select, DatePicker, Steps} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const Step = Steps.Step;


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
                 merchantId,
                 bankLists = [],
                 addressData = [],
                 bankSubLists = [],
                 bankSubId,
                 onBankData,
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
        merchantid: merchantId,
      }
      data.bankProvince = data.bankAddress[0]
      data.bankCity = data.bankAddress[1]
      delete data.bankAddress
      let bankId = data.bankId[0]
      delete data.bankId
      let bankSubId = data.bankSubId[0]
      delete data.bankSubId
      data.bankSubId = bankSubId
      data.bankId = bankId
      onOk(data)
    })
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields.bankProvince = fields.bankAddress[0]
    fields.bankCity = fields.bankAddress[1]
    let bankId = fields.bankId[0]
    delete fields.bankId
    delete fields.bankAccountNo
    delete fields.bankMobile
    delete fields.bankAccountName
    delete fields.bankAddress
    delete fields.bankSubId
    fields.bankId = bankId
    onBankData(fields)
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Steps current={2} size="small" {...formItemLayout} style={{marginBottom: 20}}>
        <Step title="基本信息" icon={<Icon type="solution"/>}/>
        <Step title="费率信息" icon={<Icon type="wallet"/>}/>
        <Step title="结算信息" icon={<Icon type="credit-card"/>}/>
      </Steps>
      <Form layout="horizontal">
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="银行卡号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('accountNo', {
                rules: [
                  {
                    required: true,
                    message: '银行卡号不能为空!',
                  },
                ],
              })(<Input/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="预留手机号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('bankMobile', {
                rules: [
                  {
                    required: true,
                    pattern: /^1[34578]\d{9}$/,
                    message: '预留手机号不能为空!',
                  },
                ],
              })(<Input/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="开户人" hasFeedback {...formItemLayout}>
              {getFieldDecorator('accountName', {
                rules: [
                  {
                    required: true,
                    message: '开户人不能为空!',
                  },
                ],
              })(<Input/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="银行地区" hasFeedback {...formItemLayout}>
              {getFieldDecorator('bankAddress', {
                rules: [
                  {
                    required: true,
                    message: '请选择是银行地区!',
                  },
                ],
              })(<Cascader options={addressData}
                           placeholder="请选择银行地区" onChange={handleChange.bind(null, 'bankAddress')}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="银行" hasFeedback {...formItemLayout}>
              {getFieldDecorator('bankId', {initialValue: [3]}, {
                rules: [
                  {
                    required: true,
                    message: '请选择银行信息!',
                  },
                ],
              })(<Cascader options={bankLists} placeholder="请选择银行信息"
                           onChange={handleChange.bind(null, 'bankId')}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="支行" hasFeedback {...formItemLayout}>
              {getFieldDecorator('bankSubId', {initialValue: [bankSubId]}, {
                rules: [
                  {
                    required: true,
                    message: '请选择支行信息!',
                  },
                ],
              })(<Cascader options={bankSubLists} placeholder="请选择银行支行"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="对公" hasFeedback {...formItemLayout}>
              {getFieldDecorator('company', {initialValue: false}, {
                rules: [
                  {
                    required: true,
                    message: '请选择是否对公!',
                  },
                ],
              })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
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
