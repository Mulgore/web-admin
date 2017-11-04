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
        {getFieldDecorator('orderId')(<Input placeholder="请输入订单号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('tn')(<Input placeholder="请输入交易流水" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('mobile')(<Input placeholder="请输入手机号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('status')(<Select placeholder="请选择订单状态" size="large"
                                             onChange={handleChange.bind(null, 'status')} filterOption={false}
                                             style={{width: '100%'}}>
          <option value="0">处理中</option>
          <option value="1">充值成功</option>
          <option value="2">充值失败</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('flowType')(<Select placeholder="请选择漫游类型" size="large"
                                               onChange={handleChange.bind(null, 'flowType')} filterOption={false}
                                               style={{width: '100%'}}>
          <option value="y">全国</option>
          <option value="n">本地</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{ span: 12 }}>
        {getFieldDecorator('flowCarrier')(<Select placeholder="请选择运营商" size="large"
                                                  onChange={handleChange.bind(null, 'flowCarrier')} filterOption={false}
                                                  style={{width: '100%'}}>
          <option value="DX">中国电信</option>
          <option value="LT">中国联通</option>
          <option value="YD">中国移动</option>
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
