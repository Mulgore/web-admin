import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Info} from './components'


const UserView = ({flowUser, dispatch}) => {
  const {info, flowResult} = flowUser
  const modalProps = ({
    info,
    flowResult,
    onOk(data) {
      dispatch({
        type: 'flowUser/recharge',
        payload: data,
      })
    },
    getFlowData(data) {
      dispatch({
        type: 'flowUser/getFlows',
        payload: {mobile: data.mobile},
      })
    },
    onEditFlowPay() {
      dispatch({
        type: 'flowUser/apply',
      })
    },
  })
  return (<div className="content-inner">
    <Info {...modalProps} />
  </div>)
}

UserView.propTypes = {
  flowUser: PropTypes.object,
}

export default connect(({flowUser}) => ({flowUser}))(UserView)
