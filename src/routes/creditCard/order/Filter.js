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
                  onFilterDownload,
                  filter,
                  merchantUidData=[],
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const handleFields = (fields) => {
    // const {createTime} = fields
    // if (createTime.length) {
    //   fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    // }
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


  return (<div>
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('merchantUid')(
          <Cascader placeholder="请选择用户" options={merchantUidData} size="large" onChange={handleChange.bind(null, 'merchantUid')} filterOption={false} style={{width: '100%'}}/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('userName')(<Input placeholder="用户名" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('mobile')(<Input placeholder="手机号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('orderId')(<Input placeholder="平台订单号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('status')(<Select placeholder="请选择状态" size="large"
                                             onChange={handleChange.bind(null, 'status')} filterOption={false}
                                             style={{width: '100%'}}>
          <Option value="0">未支付</Option>
          <Option value="1">已支付</Option>
          <Option value="2">还款成功</Option>
          <Option value="3">还款失败</Option>
          <Option value="4">还款失败（已退款至账户）</Option>
          <Option value="6">未开始（针对于一键还款）</Option>
        </Select>)}
      </Col>
      {/*<Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>*/}
        {/*{getFieldDecorator('createTime', {initialValue: initialCreateTime})(*/}
          {/*<RangePicker style={{width: '100%'}} size="large" onSelect={handleSubmit}*/}
                       {/*onChange={handleChange.bind(null, 'createTime')}/>*/}
        {/*)}*/}
      {/*</Col>*/}
      <Col {...TwoColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Button type="primary" size="large" className="margin-right" icon="search"
                    onClick={handleSubmit}>搜索</Button>
            <Button size="large" icon="reload" onClick={handleReset}>重置</Button>
          </div>
          <div>
        </div>
        </div>
      </Col>
    </Row>
  </div>)
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  statPay: PropTypes.object,
  statTotal: PropTypes.object,
  onFilterChange: PropTypes.func,
  onFilterDownload: PropTypes.func,
}

export default Form.create()(Filter)
