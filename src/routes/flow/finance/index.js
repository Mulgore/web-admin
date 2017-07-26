import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


function FinanceView ({ flowFinance, dispatch }) {
  const { info } = flowFinance
  const modalProps = ({
    info:info,
    onOk (data) {
      dispatch({
        type: `flowFinance/recharge`,
        payload: data,
      })
    },
  })
  return (<div className="content-inner">
    <Info {...modalProps} />
  </div>)
}

FinanceView.propTypes = {
  flowFinance: PropTypes.object,
}

export default connect(({ flowFinance }) => ({ flowFinance }))(FinanceView)
