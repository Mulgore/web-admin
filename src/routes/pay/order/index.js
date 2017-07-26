import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import List from './List'
import Filter from './Filter'

const Index = ({ payOrder, dispatch, loading, location }) => {
  const { list, pagination,isMotion } = payOrder
  const { query = {}, pathname } = location
  const { pageSize } = pagination

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['payOrder/query'],
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

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/payOrder',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/payOrder',
      }))
    },

  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
        <List {...listProps} />
  </div>)
}

Index.propTypes = {
  payOrder: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ payOrder, loading }) => ({ payOrder, loading }))(Index)
