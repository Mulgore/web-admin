import React from 'react'
import PropTypes from 'prop-types'
import {layer} from 'components'
import {Col, Row, Button, Icon, Form} from 'antd'
const FormItem = Form.Item;
const QRCode = require('qrcode.react');


function Info({level, merchantNo, cityName, provinceName, shortName, fullName, address, industry, mobile, linkman, bizLincenseNo, servicePhone, remark, email, orgCode }) {

  const qrcodeUrl = (merchantNo)=>{
    return 'https://weixin.fulapay.com/wxpay/input.html?merchantNo='+merchantNo
  }

  const handleButtonClick = (key) => {
    switch (key) {
      case 1:
        layer.open({
          title: null,
          content: <div style={{height: 360, width:360,margin:'0 auto'}}><QRCode size='360' value={qrcodeUrl(merchantNo)} /></div>,
          footer:null
        })
        break
      case 2:
        layer.open({
          title: null,
          content: <div style={{height: 360}}><img src="http://up.qqjia.com/z/face01/face06/facejunyong/junyong04.jpg" style={ {height:360}}></img></div>,
          footer:null,
        })
    }
  }

  const Layout = {
    labelCol: {
      xs: { label: 24 },
      sm: { label: 8 },
    },
    wrapperCol: {
      xs: { label: 24 },
      sm: { label: 16 },
    },
  };

  return (<Form>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>商户等级:&nbsp;&nbsp;</label>
          <label>{level}</label>
      </Col>
      <Col span={10} offset={2}>
          <label>商户号:&nbsp;&nbsp;</label>
          <label>{merchantNo}</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>二维码:&nbsp;&nbsp;</label>
          <label><Button type="dashed" onClick={handleButtonClick.bind(null, 1)}><Icon type="qrcode" />二维码</Button></label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>商户简称:&nbsp;&nbsp;</label>
          <label>{ shortName }</label>
      </Col>
      <Col span={10} offset={2}>
          <label>商户全称:&nbsp;&nbsp;</label>
          <label>{ fullName }</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>商户行业:&nbsp;&nbsp;</label>
          <label>{ industry }</label>
      </Col>
      <Col span={10} offset={2}>
          <label>省份:&nbsp;&nbsp;</label>
          <label>{ provinceName }</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>城市:&nbsp;&nbsp;</label>
          <label>{ cityName }</label>
      </Col>
      <Col span={10} offset={2}>
          <label>地址:&nbsp;&nbsp;</label>
          <label>{ address }</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>联系人:&nbsp;&nbsp;</label>
          <label>{ linkman }</label>
      </Col>
      <Col span={10} offset={2}>
          <label>联系电话:&nbsp;&nbsp;</label>
          <label>{ mobile }</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>备注:&nbsp;&nbsp;</label>
          <label>{ remark }</label>
      </Col>
      <Col span={10} offset={2}>
          <label>商户机构号:&nbsp;&nbsp;</label>
          <label>{ orgCode }</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>邮箱:&nbsp;&nbsp;</label>
          <label>{ email }</label>
      </Col>
      <Col span={10} offset={2}>
          <label>客服电话:&nbsp;&nbsp;</label>
          <label>{ servicePhone }</label>
      </Col>
    </Row>
    </FormItem>
    <FormItem {...Layout}>
    <Row>
      <Col span={10} offset={2}>
          <label>营业执照号:&nbsp;&nbsp;</label>
          <label>{ bizLincenseNo }</label>
      </Col>
      <Col span={10} offset={2}>
          <label>营业执照:&nbsp;&nbsp;</label>
          <label><Button type="dashed" onClick={handleButtonClick.bind(null, 2)}><Icon type="idcard" />营业执照</Button></label>
      </Col>
    </Row>
    </FormItem>
  </Form>)
}

Info.propTypes = {
  level: PropTypes.string,
  merchantNo: PropTypes.string,
  provinceName: PropTypes.string,
  shortName: PropTypes.string,
  fullName: PropTypes.string,
  address: PropTypes.string,
  industry: PropTypes.string,
  mobile: PropTypes.string,
  linkman: PropTypes.string,
  bizLincenseNo: PropTypes.string,
  servicePhone: PropTypes.string,
  remark: PropTypes.string,
  email: PropTypes.string,
  orgCode: PropTypes.string,
}

export default Info
