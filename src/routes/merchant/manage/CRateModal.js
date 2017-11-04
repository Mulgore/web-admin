import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col, Form, Upload, Input, InputNumber, Select, Icon, message, Cascader, Steps} from 'antd'

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
                 merchantId = {},
                 rateData = [],
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
        rateLength:rateData.length,
        rateData:rateData.map(item =>{
          return item.key
        })
      }
      onOk(data)
    })
  }
  const payType = (key) => {
    switch (key) {
      case 10:
        return '银联快捷'
      case 11:
        return '银联Wap(勇易)'
      case 12:
        return '银行快捷(大额)'
      case 13:
        return '银联快捷(摩宝)'
      case 20:
        return '微信支付(APP)'
      case 21:
        return '微信支付(二维码)'
      case 22:
        return '微信支付(扫码)'
      case 23:
        return '微信支付(公众号)'
      case 40:
        return '支付宝(APP)'
      case 41:
        return '支付宝(二维码)'
      case 42:
        return '支付宝(扫码)'
      case 43:
        return '支付宝(服务窗)'
      case 50:
        return 'MPOS'
      case 51:
        return 'MPOS收款(插件)'
      case 52:
        return 'POS收款'
      case 31:
        return 'QQ二维码'
      case 32:
        return 'QQ扫码'
      case 61:
        return '百度钱包(二维码)'
      case 62:
        return '百度钱包(扫码)'
    }
  }
  const rateView = rateData.map((item, i) => {
      return (<FormItem label={payType(item.key)} hasFeedback {...formItemLayout}>
          {getFieldDecorator("rateVal" + i, {
            rules: [
              {
                required: true,
                message: '请输入商户费率!',
              },
            ],
          })(<InputNumber placeholder={`请输入商户费率,最低费率为${item.min}%`} min={item.min} style={{width: '100%'}} size="large"/>)}
        </FormItem>
      )
    }
  )

  const rateVal = rateData.map((item) => {
      <FormItem>
          {getFieldDecorator("rateData",{ initialValue:item.key},
          )}
        </FormItem>
    }
  )

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Steps current={1} size="small" {...formItemLayout} style={{marginBottom: 20}}>
        <Step title="基本信息" icon={<Icon type="solution"/>}/>
        <Step title="费率信息" icon={<Icon type="wallet"/>}/>
        <Step title="结算信息" icon={<Icon type="credit-card"/>}/>
      </Steps>
      <Form layout="horizontal">
        {rateView}
        {rateVal}
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
