import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import CountUp from 'react-countup'
import {Form, Button, Row, Col, DatePicker, Input, Select,Popconfirm} from 'antd'

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
        {getFieldDecorator('title')(<Input placeholder="角色名称" size="large"/>)}
      </Col>
      <Col {...TwoColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Button type="primary" size="large" className="margin-right" icon="search"
                    onClick={handleSubmit}>搜索</Button>
            <Button size="large" icon="reload" onClick={handleReset}>重置</Button>
          </div>
          <div>
            <Button type="primary" size="large" className="margin-right" icon="add"
                    onClick={onCreate}>添加角色</Button>
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
