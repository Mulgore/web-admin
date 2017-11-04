import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import { Modal, Row, Col, Form, Input, InputNumber, Icon, Cascader, Select, DatePicker, Steps, Radio } from 'antd'
const RadioGroup = Radio.Group;
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
                 item,
  onOk,
  addressData = [],
  agentLevelData = [],
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
        uid: item.uid,
        viewId: 1,
      }
      if (data.contractBeginTime) {
        data.contractBeginTime = data.contractBeginTime.format('YYYY-MM-DD')
      }
      if (data.contractEndTime) {
        data.contractEndTime = data.contractEndTime.format('YYYY-MM-DD')
      }
      data.agentLevel = data.level[0]
      data.deposit = data.deposit * 100
      data.provinceCode = data.operationAddress[0]
      data.cityCode = data.operationAddress[1]
      data.areaCode = data.operationAddress[2]
      data.provinceName = data.agentAddress[0]
      data.cityName = data.agentAddress[1]
      data.areaCode = data.agentAddress[2]
      delete data.operationAddress
      delete data.agentAddress
      delete data.level
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const handleConfirmIdNumber = (rule, value, callback) => {
    if (!value) {
      callback('身份证不能为空！')
    }
    if (value && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
      callback('身份证格式不正确！')
    }
    callback()
  }
  return (
    <Modal {...modalOpts}>
      <Steps current={0} size="small" {...formItemLayout} style={{ marginBottom: 20 }}>
        <Step title="基本信息" icon={<Icon type="solution" />} />
        <Step title="结算信息" icon={<Icon type="credit-card" />} />
      </Steps>
      <Form layout="horizontal">
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="用户名" hasFeedback {...formItemLayout}>
              {getFieldDecorator('realName', {
                initialValue: item.realName,
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空 !',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="手机号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: [
                  {
                    required: true,
                    len: 11,
                    pattern: /^1[34578]\d{9}$/,
                    message: '输入的电话号码格式不正确 !',
                  },
                ],
              })(<Input placeholder="请输入手机号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="公司" hasFeedback {...formItemLayout}>
              {getFieldDecorator('company', {
                initialValue: item.company,
                rules: [
                  {
                    required: true,
                    message: '公司名称不能为空 !',
                  },
                ],
              })(<Input placeholder="请输入公司名称" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="负责人" hasFeedback {...formItemLayout}>
              {getFieldDecorator('leader', {
                initialValue: item.leader,
                rules: [
                  {
                    required: true,
                    message: '负责人不能为空 !',
                  },
                ],
              })(<Input placeholder="请输入负责人" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="保证金" hasFeedback {...formItemLayout}>
              {getFieldDecorator('deposit', {
                initialValue: item.deposit != null ? item.deposit / 100 : '',
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '保证金不能为空 !',
                  },
                ],
              })(<InputNumber style={{ width: '100%' }} placeholder="请输入保证金" size="large" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="代理商级别" hasFeedback {...formItemLayout}>
              {getFieldDecorator('level', { initialValue: [item.agentLevel != null ? item.agentLevel : 4] },
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择代理商级别 !',
                    },
                  ],
                })(<Cascader options={agentLevelData} placeholder="请选择代理商级别">
                </Cascader>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="代理商区域" hasFeedback {...formItemLayout}>
              {getFieldDecorator('agentAddress', { initialValue: [item.provinceCode != null ? item.provinceCode : '110000', item.cityCode != null ? item.cityCode : '110100', item.areaCode != null ? item.areaCode : '110101'] }, {
                rules: [
                  {
                    required: true,
                    message: '请选择代理商区域 !',
                  },
                ],
              })(<Cascader options={addressData} placeholder="请选择代理商区域" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="运营区域" hasFeedback {...formItemLayout}>
              {getFieldDecorator('operationAddress', { initialValue: [item.provinceName != null ? item.provinceName : '110000', item.cityName != null ? item.cityName : '110100', item.areaName != null ? item.areaName : '110101'] }, {
                rules: [
                  {
                    required: true,
                    message: '请选择运营区域 !',
                  },
                ],
              })(<Cascader options={addressData} placeholder="请选择运营区域" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="详细地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: item.address,
                rules: [
                  {
                    required: true,
                    message: '详细地址不能为空!',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="身份证" hasFeedback {...formItemLayout}>
              {getFieldDecorator('idNumber', {
                initialValue: item.idNumber,
                rules: [
                 {
                    validator: handleConfirmIdNumber
                  }],
              })(<Input placeholder="请输入身份证" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="合同开始时间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('contractBeginTime', {
                initialValue: moment(item.contractBegin),
                rules: [
                  {
                    required: true,
                    message: '合同开始时间不能为空 !',
                  },
                ],
              })(<DatePicker placeholder="合同开始时间" style={{ width: '100%' }} size="large" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="合同结束时间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('contractEndTime', {
                initialValue: moment(item.contractEnd),
                rules: [
                  {
                    required: true,
                    message: '合同结束时间不能为空 !',
                  },
                ],
              })(<DatePicker placeholder="合同结束时间" style={{ width: '100%' }} size="large" />)}
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
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
