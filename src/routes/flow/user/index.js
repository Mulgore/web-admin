import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


const UserView = ({ flowUser, dispatch }) => {
  const { info } = flowUser
  const modalProps = ({
    info:info,
    onOk (data) {
      dispatch({
        type: `flowUser/recharge`,
        payload: data,
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

export default connect(({ flowUser }) => ({ flowUser }))(UserView)
