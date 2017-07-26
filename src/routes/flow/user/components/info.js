import React from 'react'
import {layer} from 'components'
import PropTypes from 'prop-types'
import {Col, Row, Button, Form, Input, Radio} from 'antd'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item

const Info = ({
                amount,
                sales,
                form: {
                  getFieldDecorator,
                  getFieldsValue,
                  setFieldsValue,
                },
                userId,
                permission,
                yDX= [],
                yLT= [],
                yYD= [],
                nDX= [],
                nLT= [],
                nYD= [],
              }) => {
  const Layout = {
    labelCol: {
      xs: {label: 24},
      sm: {label: 8},
    },
    wrapperCol: {
      xs: {label: 24},
      sm: {label: 16},
    },
  };
  const Arr = (flows) => {
    if (flows != null) {
      const menu = flows.map(item => <RadioButton value={item.id}>{item.value}</RadioButton>)
      return <RadioGroup size="large">{menu}</RadioGroup>
    }
  }

  const mobile = '';
  const payType = '21';

  const handleFields = (fields) => {
    const {mobile, payType} = fields
    console.log(fields)
    if (mobile.length) {
    }
    if (payType) {
    }
    return fields
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
  }

  return (<Form>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>账户余额:&nbsp;&nbsp;</label>
          <label style={{color: 'red'}}>{amount} 元</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={12} offset={2}>
          <label>充值号码:&nbsp;&nbsp;</label>
          {getFieldDecorator('mobile', {initialValue: mobile})(<Input size="large" style={{width: '150px'}}
                                                                      onBlur={handleChange.bind(null, 'mobile')}
                                                                      placeholder="请输入充值手机号"></Input>)}
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={12} offset={2}>
          <label>支付方式:&nbsp;&nbsp;</label>
          {getFieldDecorator('payType', {initialValue: payType})(<RadioGroup size="large">
            <RadioButton value="21">微信支付</RadioButton>
            <RadioButton value="41">支付宝</RadioButton>
            <RadioButton value="11" disabled>银行卡</RadioButton>
          </RadioGroup>)}
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={8} offset={2}>
          <label>全国流量:&nbsp;&nbsp;</label>
        </Col>
        <Col span={8} offset={1}>
          <label>省内流量:&nbsp;&nbsp;</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col className="gutter-row" span={8} offset={2}>
          <label>移动:&nbsp;&nbsp;</label>
          {getFieldDecorator('pay')(Arr(yYD))}
          <div style={{marginTop: 16}}>
            <label>联通:&nbsp;&nbsp;</label>
            {getFieldDecorator('pay')(Arr(yLT))}
          </div>
          <div style={{marginTop: 16}}>
            <label>电信:&nbsp;&nbsp;</label>
            {getFieldDecorator('pay')(Arr(yDX))}
          </div>
        </Col>
        <Col className="gutter-row" span={8} offset={1}>
          <label>移动:&nbsp;&nbsp;</label>
          {getFieldDecorator('pay')(Arr(nYD))}
          <div style={{marginTop: 16}}>
            <label>联通:&nbsp;&nbsp;</label>
            {getFieldDecorator('pay')(Arr(nLT))}
          </div>
          <div style={{marginTop: 16}}>
            <label>电信:&nbsp;&nbsp;</label>
            {getFieldDecorator('pay')(Arr(nDX))}
          </div>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={3}>
          <Button type='primary'>立即充值</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户:&nbsp;&nbsp;</label>
          <label>{userId}</label>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>业务权限:&nbsp;&nbsp;</label>
          <Button type='dashed'>{permission}</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem {...Layout}>
      <Row>
        <Col span={10} offset={2}>
          <label>折&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;扣:&nbsp;&nbsp;</label>
          <label style={{color: 'red'}}>{sales}</label>
        </Col>
      </Row>
    </FormItem>

  </Form>)

}

Info.propTypes = {
  amount: PropTypes.number,
  sales: PropTypes.string,
  permission: PropTypes.string,
  userId: PropTypes.string,
  form: PropTypes.object,
  filter: PropTypes.object,
  yDX: PropTypes.array.isRequired,
  yLT: PropTypes.array.isRequired,
  yYD: PropTypes.array.isRequired,
  nDX: PropTypes.array.isRequired,
  nLT: PropTypes.array.isRequired,
  nYD: PropTypes.array.isRequired,
}

export default Form.create()(Info)


