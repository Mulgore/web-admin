import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info, Modal } from './components'


function cashierView ({ cashierInfo, dispatch }) {
  const { info, modalVisible, payInfo } = cashierInfo
  const modalInfoProps = ({
    info,
    onOk (data) {
      dispatch({
        type: 'cashierInfo/payInfo',
        payload: data,
      })
    },
  })

  const modalProps = ({
    payInfo,
    visible: modalVisible,
    maskClosable: false,
    title: '支付数据',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    width:900,
    onCancel () {
      dispatch({
        type: 'cashierInfo/hideModal',
      })
    },
  })

  return (<div className="content-inner">
    <Info {...modalInfoProps} />
    {modalVisible && <Modal {...modalProps} />}
  </div>)
}

cashierView.propTypes = {
  cashierInfo: PropTypes.object,
}

export default connect(({ cashierInfo }) => ({ cashierInfo }))(cashierView)
