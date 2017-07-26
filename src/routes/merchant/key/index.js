import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Key } from './components'


function KeyView ({ merchantKey, dispatch }) {
  const { key } = merchantKey
  const modalProps = {
    item: key,
    onOk () {
      dispatch({
        type: `merchantKey/auto`,
      })
    },
  }
  return (<div className="content-inner">
    <Key {...modalProps} />
  </div>)
}

KeyView.propTypes = {
  merchantKey: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ merchantKey }) => ({ merchantKey }))(KeyView)
