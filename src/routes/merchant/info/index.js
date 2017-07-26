import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


function InfoView ({ merchantInfo }) {
  const { info } = merchantInfo
  return (<div className="content-inner">
    <Info {...info} />
  </div>)
}

InfoView.propTypes = {
  merchantInfo: PropTypes.object,
}

export default connect(({ merchantInfo }) => ({ merchantInfo }))(InfoView)
