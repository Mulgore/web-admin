import React from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'antd'
import styles from './QRCodeModal.less'
const QRCode = require('qrcode.react')

const modal = ({
                 item = {},
                 ...modalProps
               }) => {
  const {merchantNo } = item
  const modalOpts = {
    ...modalProps,
  }

  const QRCodeUrl = (merchantNo) => {
    return `https://weixin.fulapay.com/wxpay/input.html?merchantNo=${merchantNo}`
  }
  return (
    <Modal {...modalOpts}>
      <div className={styles.divQRcode}>
        <div className={styles.divBorder}></div>
        <div className={styles.title}><label style={{color: '#108ee9',fontSize:17}}>扫一扫收款</label></div>
        <div className={styles.titleScan}><label style={{color: '#108ee9'}}>请使用手机扫码完成收款</label></div>
        <div className={styles.QRcodeItem}><QRCode value={QRCodeUrl(merchantNo)}/></div>
      </div>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default modal
