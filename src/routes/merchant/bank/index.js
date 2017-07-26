import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


function InfoView ({ merchantBank }) {
  const { info } = merchantBank
  return (<div className="content-inner">
    <Info {...info} />
  </div>)
}

InfoView.propTypes = {
  merchantBank: PropTypes.object,
}

export default connect(({ merchantBank }) => ({ merchantBank }))(InfoView)
