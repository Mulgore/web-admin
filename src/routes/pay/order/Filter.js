import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import CountUp from 'react-countup'
import {Form, Button, Row, Col, DatePicker, Input, Select,Popconfirm,Cascader} from 'antd'

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
                  statTotal,
                  statPay,
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
          <Cascader placeholder="请选择用户" options={merchantUidData} size="large" onChange={handleChange.bind(null, 'merchantUid')} filterOption={false} style={{width: '100%'}}/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('outTradeNo')(<Input placeholder="商户订单号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('orderId')(<Input placeholder="平台订单号" onSelect={handleSubmit} size="large"/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        {getFieldDecorator('status')(<Select placeholder="请选择状态" size="large"
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
      {/*<Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>*/}
        {/*{getFieldDecorator('payType')(<Select placeholder="请选择支付方式" size="large"*/}
                                              {/*onChange={handleChange.bind(null, 'payType')} filterOption={false}*/}
                                              {/*style={{width: '100%'}}>*/}
          {/*<option value="10">银联支付</option>*/}
          {/*<option value="11">银联Wap(勇易)</option>*/}
          {/*<option value="12">银行快捷(大额)</option>*/}
          {/*<option value="13">银联快捷(摩宝)</option>*/}
          {/*<option value="20">微信支付(APP)</option>*/}
          {/*<option value="21">微信支付(二维码)</option>*/}
          {/*<option value="22">微信支付(扫码)</option>*/}
          {/*<option value="23">微信支付(公众号)</option>*/}
          {/*<option value="40">微信支付(APP)</option>*/}
          {/*<option value="41">支付宝(二维码)</option>*/}
          {/*<option value="42">支付宝(扫码)</option>*/}
          {/*<option value="43">支付宝(服务窗)</option>*/}
          {/*<option value="31">QQ(二维码)</option>*/}
          {/*<option value="32">QQ(扫码)</option>*/}
          {/*<option value="50">MPOS</option>*/}
          {/*<option value="51">MPOS收款(插件)</option>*/}
          {/*<option value="52">POS收款</option>*/}
          {/*<option value="61">百度钱包(二维码)</option>*/}
          {/*<option value="62">百度钱包(扫码)</option>*/}
        {/*</Select>)}*/}
      {/*</Col>*/}
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
          <Popconfirm placement="topLeft" title="确定生成Excel表格吗? 请等待..." onConfirm={e => handleSubmit(2)} okText="确定"
                      cancelText="取消">
            <Button size="large" icon="download">生成Excel</Button>
          </Popconfirm>
        </div>
        </div>
      </Col>
    </Row>
    <div style={{border: '1px solid #c5c5c5', borderRadius: 8, marginBottom: 20, marginTop: 20, paddingTop: 20}}>
      <Row type="flex" justify="center" align="middle">
        <Col {...TwoColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
          <div>
            <label>支付金额:&nbsp;&nbsp;</label>
            <label style={{color: '#49a9ee'}}> <CountUp
              start={0}
              end={statPay}
              duration={2.75}
              decimals={2}
              useEasings
              useGrouping
              separator=","/> 元</label>
          </div>
        </Col>
        <Col {...TwoColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
          <div>
            <label>支付笔数:&nbsp;&nbsp;</label>
            <label style={{color: '#49a9ee'}}>
              <CountUp
                start={0}
                end={statTotal}
                duration={2.75}
                useEasings
                useGrouping
                separator=","/> 笔</label>
          </div>
        </Col>
      </Row>
    </div>
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
