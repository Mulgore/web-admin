import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import List from './List'

const Index = ({ merchantRate, dispatch, loading, location }) => {
  const { list, pagination } = merchantRate
  const { query = {}, pathname } = location

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['merchantRate/query'],
    onChange (page) {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
  }

  return (<div className="content-inner">
        <List {...listProps} />
  </div>)
}

Index.propTypes = {
  merchantRate: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ merchantRate, loading }) => ({ merchantRate, loading }))(Index)
