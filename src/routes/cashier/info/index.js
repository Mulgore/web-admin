import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Info } from './components'


function cashierView ({ cashierInfo }) {
  const { info } = cashierInfo
  return (<div className="content-inner">
    <Info {...info} />
  </div>)
}

cashierView.propTypes = {
  cashierInfo: PropTypes.object,
}

export default connect(({ cashierInfo }) => ({ cashierInfo }))(cashierView)
