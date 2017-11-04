import React from 'react'
import PropTypes from 'prop-types'
import {FilterItem} from 'components'
import {Form, Button, Row, Col, Input, Select, Icon} from 'antd'


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
                  onDownload,
                  filter,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {

  const handleSubmit = () => {
    let fields = getFieldsValue()
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
  const handleOut=()=>{
    onDownload()
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(fields)
  }

  return (<div>
      <Row gutter={24}>
        <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
          {getFieldDecorator('merchantNo')(<Input placeholder="商户号" onSelect={handleSubmit} size="large"/>)}
        </Col>
        <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
          {getFieldDecorator('active')(<Select placeholder="请选择状态" size="large"
                                               onChange={handleChange.bind(null, 'active')} filterOption={false}
                                               style={{width: '100%'}}>
            <option value="0">未激活</option>
            <option value="1">已激活</option>
          </Select>)}
        </Col>
        <Col {...TwoColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <Button type="primary" size="large" className="margin-right" icon="search"
                      onClick={handleSubmit}>搜索</Button>
              <Button size="large" icon="reload" onClick={handleReset}>重置</Button>
            </div>
            <div>
              <Button type="primary" size="large" className="margin-right" icon="qrcode"
                      onClick={handleOut}>导出</Button>
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
  onDownload: PropTypes.func,
}

export default Form.create()(Filter)
