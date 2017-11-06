import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


function InfoView ({ agentInfo }) {
  const { info } = agentInfo
  return (<div className="content-inner">
    <Info {...info} />
  </div>)
}

InfoView.propTypes = {
  agentInfo: PropTypes.object,
  info: PropTypes.object,
}

export default connect(({ agentInfo }) => ({ agentInfo }))(InfoView)
