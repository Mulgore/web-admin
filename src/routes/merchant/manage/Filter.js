import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import CountUp from 'react-countup'
import {Form, Button, Row, Col, DatePicker, Input, Select, Popconfirm} from 'antd'

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
                  onCreate,
                  filter,
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
  const handleCreate = () => {
    onCreate()
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
        {getFieldDecorator('mobile')(<Input placeholder="手机号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('merchantNo')(<Input placeholder="商户号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('status')(<Select placeholder="请选择商户状态" size="large"
                                                 onChange={handleChange.bind(null, 'status')} filterOption={false}
                                                 style={{width: '100%'}}>
          <option value="0">未审核</option>
          <option value="1">审核通过</option>
          <option value="2">审核不通过</option>
          <option value="3">黑名单</option>
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
          <div>
            <Button size="large" type="primary" icon="user-add" onClick={handleCreate}>添加商户</Button>
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
  onCreate: PropTypes.func,
}

export default Form.create()(Filter)
