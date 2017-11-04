import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


function ProfitView ({ profitManage, dispatch }) {
  const { info } = profitManage
  const modalProps = ({
    info,
    onOk (data) {
      dispatch({
        type: 'profitManage/recharge',
        payload: data,
      })
    },
  })

  return (<div className="content-inner">
    <Info {...modalProps} />
  </div>)
}

ProfitView.propTypes = {
  profitManage: PropTypes.object,
}

export default connect(({ profitManage }) => ({ profitManage }))(ProfitView)
