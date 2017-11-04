import React from 'react'
import PropTypes from 'prop-types'
import {Form, Modal, Row, Col} from 'antd'
import styles from './info.less'

const QRCode = require('qrcode.react')

const modal = ({payValue, ...modalProps}) => {
  const modalOpts = {...modalProps}
  const {url, amount} = payValue

  return (
    <Modal {...modalOpts}>
      <div className={styles.divQRcode}>
        <div className={styles.divBorder}></div>
        <div className={styles.title}><label style={{color: '#108ee9',fontSize:17}}>扫一扫支付</label></div>
        <div className={styles.titleScan}><label style={{color: '#108ee9'}}>请使用手机扫码完成付款</label></div>
        <div className={styles.amountTitle}>
        <label style={{fontSize: 16, color: '#f7629e'}}>支付金额:{amount != null ? amount : 0}元</label>
        </div>
        <div className={styles.QRcodeItem}><QRCode value={url}/></div>
      </div>
    </Modal>
  )
}

modal.propTypes = {
  item: PropTypes.object,
}

export default Form.create()(modal)
