import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Select, Cascader} from 'antd'

const {RangePicker} = DatePicker

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
                  onFilterDownload,
                  merchants=[],
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

  const handleSubmit = (type) => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    if(type===2){
      onFilterDownload(fields)
    }else {
      onFilterChange(fields)
    }
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
            <Cascader placeholder="请选择用户" options={merchants} size="large"
                      onChange={handleChange.bind(null, 'merchantUid')} filterOption={false} style={{width: '100%'}}/>)}
        </Col>
        <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
          {getFieldDecorator('orderId')(<Input placeholder="提现记录订单号" onSelect={handleSubmit} size="large"/>)}
        </Col>
        <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
          {getFieldDecorator('type')(<Select placeholder="请选择提现类型" size="large"
                                               onChange={handleChange.bind(null, 'type')} filterOption={false}
                                               style={{width: '100%'}}>
            <option value="1">收款提现</option>
            <option value="2">分润提现</option>
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
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onFilterDownload: PropTypes.func,
}

export default Form.create()(Filter)
