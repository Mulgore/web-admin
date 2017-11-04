import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Select,Cascader} from 'antd'

const {RangePicker} = DatePicker
const Option = Select.Option

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
                  merchantUidData=[],
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const handleFields = (fields) => {
    const {createTime} = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
      onFilterChange(fields)
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

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (<div>
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('merchantUid')(
          <Cascader placeholder="请选择用户" options={merchantUidData} size="large" onChange={handleChange.bind(null, 'merchantUid')} filterOption={false} style={{width: '100%'}}/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('payOrderId')(<Input placeholder="支付订单号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('status')(<Select placeholder="请选择订单状态" size="large"
                                             onChange={handleChange.bind(null, 'status')} filterOption={false}
                                             style={{width: '100%'}}>
          <Option value="0">未支付</Option>
          <Option value="1">支付成功</Option>
          <Option value="2">支付中</Option>
          <Option value="3">支付失败</Option>
          <Option value="4">已结算</Option>
          <Option value="5">部分退款</Option>
          <Option value="6">全额退款</Option>
          <Option value="7">未知</Option>
          <Option value="8">退款失败</Option>
          <Option value="9">删除</Option>
          <Option value="10">关闭</Option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('type')(<Select placeholder="请选择订单类型" size="large"
                                              onChange={handleChange.bind(null, 'type')} filterOption={false}
                                              style={{width: '100%'}}>
          <option value="1">提现分润</option>
          <option value="2">会员升级分润</option>
          <option value="3">流量充值分润</option>
          <option value="4">贷款分润</option>
          <option value="5">办卡分润</option>
          <option value="6">活动分润</option>
          <option value="7">一键还款分润</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('createTime', {initialValue: initialCreateTime})(
          <RangePicker style={{width: '100%'}} size="large" onSelect={handleSubmit}
                       onChange={handleChange.bind(null, 'createTime')}/>
        )}
      </Col>
      <Col {...TwoColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Button type="primary" size="large" className="margin-right" icon="search"
                    onClick={handleSubmit}>搜索</Button>
            <Button size="large" icon="reload" onClick={handleReset}>重置</Button>
          </div>
        </div>
      </Col>
    </Row>
  </div>)
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
