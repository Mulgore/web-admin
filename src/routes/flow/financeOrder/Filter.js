import React from 'react'
import PropTypes from 'prop-types'
import {FilterItem} from 'components'
import {Form, Button, Row, Col, Input, Select} from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
                  onFilterChange,
                  filter,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const handleFields = (fields) => {
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
    handleChange
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('orderId')(<Input placeholder="订单号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('status')(<Select placeholder="请选择状态" size="large"
                                             onChange={handleChange.bind(null, 'status')} filterOption={false}
                                             style={{width: '100%'}}>
          <option value="0">未支付</option>
          <option value="1">支付成功</option>
          <option value="2">用户取消</option>
          <option value="3">交易关闭</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('payType')(<Select placeholder="请选择支付类型" size="large"
                                              onChange={handleChange.bind(null, 'payType')} filterOption={false}
                                              style={{width: '100%'}}>
          <option value="0">账户余额</option>
          <option value="21">微信二维码</option>
          <option value="41">支付宝二维码</option>
          <option value="10">银联快捷</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('type')(<Select placeholder="请选择订单类型" size="large"
                                           onChange={handleChange.bind(null, 'type')} filterOption={false}
                                           style={{width: '100%'}}>
          <option value="1">充值</option>
          <option value="2">消费</option>
        </Select>)}
      </Col>
      <Col {...TwoColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div >
            <Button type="primary" size="large" className="margin-right" icon="search"
                    onClick={handleSubmit}>搜索</Button>
            <Button size="large" icon="reload" onClick={handleReset}>重置</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
