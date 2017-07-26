import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


const UserView = ({ flowUser }) => {
  const { info } = flowUser
  return (<div className="content-inner">
    <Info {...info} />
  </div>)
}

UserView.propTypes = {
  flowUser: PropTypes.object,
}

export default connect(({ flowUser }) => ({ flowUser }))(UserView)
