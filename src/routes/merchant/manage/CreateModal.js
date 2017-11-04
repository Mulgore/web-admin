import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Row, Col, Form, Upload, Button, Input, Select, Icon, message, Cascader, Steps} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const Step = Steps.Step;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const modal = ({
                 onOk,
                 addressData = [],
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {
  let imgUrl
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      if (data.bizLincense != null) {
        let url = data.bizLincense.file.response.url
        delete data.bizLincense
        data.bizLincense = url
      }
      data.provinceCode = data.addressData[0]
      data.cityCode = data.addressData[1]
      delete data.addressData
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const props = {
    name: 'imgFile',
    action: '/api/v1/file/upload?uid=1001639679',
    accept: 'image',
    showUploadList: false,
    multiple: false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功 !`);
        imgUrl = info.file.response.url
      } else if (info.file.status === 'error') {
        message.error(info.file.response.message);
      }
    },
  };
  const handleConfirmIdNumber = (rule, value, callback) => {
    if (!value) {
      callback('身份证不能为空！')
    }
    if (value && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
      callback('身份证格式不正确！')
    }
    callback()
  }
  return (
    <Modal {...modalOpts}>
      <Steps current={0} size="small" {...formItemLayout} style={{marginBottom: 20}}>
        <Step title="基本信息" icon={<Icon type="solution"/>}/>
        <Step title="费率信息" icon={<Icon type="wallet"/>}/>
        <Step title="结算信息" icon={<Icon type="credit-card"/>}/>
      </Steps>
      <Form layout="horizontal">
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="商户等级" hasFeedback {...formItemLayout}>
              {getFieldDecorator('level', {
                rules: [
                  {
                    required: true,
                    message: '请选择商户等级!',
                  },
                ],
              })(<Select placeholder="请选择商户级别" style={{width: '100%'}} size="large">
                <option value={1}>大商户</option>
                <option value={2}>普通商户</option>
                <option value={3}>虚拟商户</option>
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="商户简称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('shortName', {
                rules: [
                  {
                    required: true,
                    message: '请输入商户简称!',
                  },
                ],
              })(<Input placeholder="请输入商户简称" size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="商户全称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('fullName', {
                rules: [
                  {
                    required: true,
                    message: '请输入商户全称 !',
                  },
                ],
              })(<Input placeholder="请输入商户全称" size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="行业" hasFeedback {...formItemLayout}>
              {getFieldDecorator('industry', {
                rules: [
                  {
                    required: true,
                    message: '请输入行业',
                  },
                ],
              })(<Input placeholder="请输入行业" style={{width: '100%'}} size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="商户区域" hasFeedback {...formItemLayout}>
              {getFieldDecorator('addressData', {
                rules: [
                  {
                    required: true,
                    message: '请选择区域!',
                  },
                ],
              })(<Cascader placeholder="请选择区域" options={addressData} size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="联系人" hasFeedback {...formItemLayout}>
              {getFieldDecorator('linkman', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系人姓名',
                  },
                ],
              })(<Input placeholder="请输入联系人姓名" size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: '请输入地址!',
                  },
                ],
              })(<Input placeholder="请输入地址" size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="身份证" hasFeedback {...formItemLayout}>
              {getFieldDecorator('idNumber', {
                rules: [
                  {
                  validator: handleConfirmIdNumber
                  },
                ],
              })(<Input placeholder="请输入身份证" size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="联系电话" hasFeedback {...formItemLayout}>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    pattern: /^1[34578]\d{9}$/,
                    message: '请输入联系电话!',
                  },
                ],
              })(<Input placeholder="请输入联系电话" size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="备注" hasFeedback {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: ' ',
                rules: [
                  {
                    required: true,
                    message: '请输入备注',
                  },
                ],
              })(<Input autocomplete="off" placeholder="请输入备注" size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="密码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: null,
                rules: [
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ],
              })(<Input autocomplete="off" placeholder="请输入密码" type="password" size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="商户对应机构号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('acqCode', {
                rules: [
                  {
                    required: false,
                    message: '请输入商户对应机构号',
                  },
                ],
              })(<Input placeholder="请输入商户对应机构号" size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Email" hasFeedback {...formItemLayout}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    pattern:'^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
                    message: '请输入邮箱!',
                  },
                ],
              })(<Input placeholder="请输入邮箱" size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="客服电话" hasFeedback {...formItemLayout}>
              {getFieldDecorator('servicePhone', {
                rules: [
                  {
                    required: false,
                    pattern: '/^(^0\\d{2}-?\\d{8}$)|(^0\\d{3}-?\\d{7}$)|(^0\\d2-?\\d{8}$)|(^0\\d3-?\\d{7}$)$/',
                    message: '请输入客服电话',
                  },
                ],
              })(<Input placeholder="请输入客服电话" size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="组织机构号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('orgCode', {
                rules: [
                  {
                    required: false,
                    message: '请输入组织机构号!',
                  },
                ],
              })(<Input placeholder="请输入组织机构号" size="large"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="营业执照号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('bizLincenseNo', {initialValue: imgUrl}, {
                rules: [
                  {
                    required: false,
                    message: '请输入营业执照号',
                  },
                ],
              })(<Input placeholder="请输入营业执照号" size="large"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="营业执照" hasFeedback {...formItemLayout}>
              {getFieldDecorator('bizLincense', {})(<Upload {...props}>
                <Button>
                  <Icon type="upload"/>上传照片
                </Button>
              </Upload>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
  onBankData: PropTypes.func,
}

export default Form.create()(modal)
