import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import List from './List'
import Filter from './Filter'

const Index = ({ notWithdrawOrder, dispatch, loading, location }) => {
  const { list, pagination } = notWithdrawOrder
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    pagination,
    location,
    loading: loading.effects['notWithdrawOrder/query'],
    onChange (page) {
      const { query, pathname } = location
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
        pathname: '/notWithdrawOrder',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/notWithdrawOrder',
      }))
    },

  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
        <List {...listProps} />
  </div>)
}

Index.propTypes = {
  notWithdrawOrder: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ notWithdrawOrder, loading }) => ({ notWithdrawOrder, loading }))(Index)
