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


  return (<div>
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('mobile')(<Input placeholder="手机号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('realname')(<Input placeholder="用户名" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('level')(<Select placeholder="请选择用户级别" size="large"
                                               onChange={handleChange.bind(null, 'level')} filterOption={false}
                                               style={{width: '100%'}}>
          <option value="1">普通合伙人</option>
          <option value="2">金牌合伙人</option>
          <option value="3">钻石合伙人</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('authBase')(<Select placeholder="请选择基础信息状态" size="large"
                                                 onChange={handleChange.bind(null, 'authBase')} filterOption={false}
                                                 style={{width: '100%'}}>
          <option value="0">未上传</option>
          <option value="1">已上传</option>
          <option value="2">审核不通过</option>
          <option value="3">审核通过</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('authPhoto')(<Select placeholder="请选择照片信息状态" size="large"
                                               onChange={handleChange.bind(null, 'authPhoto')} filterOption={false}
                                               style={{width: '100%'}}>
          <option value="0">未上传</option>
          <option value="1">已上传</option>
          <option value="2">审核不通过</option>
          <option value="3">审核通过</option>
        </Select>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('authBank')(<Select placeholder="请选择结算信息状态" size="large"
                                               onChange={handleChange.bind(null, 'authBank')} filterOption={false}
                                               style={{width: '100%'}}>
          <option value="0">未上传</option>
          <option value="1">已上传</option>
          <option value="2">审核不通过</option>
          <option value="3">审核通过</option>
        </Select>)}
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
  onCreate: PropTypes.func,
}

export default Form.create()(Filter)
