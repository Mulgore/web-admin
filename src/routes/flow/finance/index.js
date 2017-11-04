import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info, Modal } from './components'


function FinanceView ({ flowFinance, dispatch }) {
  const { info, modalVisible, pay } = flowFinance
  const modalProps = ({
    info,
    onOk (data) {
      dispatch({
        type: 'flowFinance/recharge',
        payload: data,
      })
    },
  })
  const modalQRCodeProps = ({
    payValue: pay,
    visible: modalVisible,
    maskClosable: false,
    title: '扫码支付',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    onCancel () {
      dispatch({
        type: 'flowFinance/hideModal',
      })
    },
  })
  return (<div className="content-inner">
    <Info {...modalProps} />
    {modalVisible && <Modal {...modalQRCodeProps} />}
  </div>)
}

FinanceView.propTypes = {
  flowFinance: PropTypes.object,
}

export default connect(({ flowFinance }) => ({ flowFinance }))(FinanceView)
