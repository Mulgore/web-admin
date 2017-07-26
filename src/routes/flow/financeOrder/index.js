import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import List from './List'
import Filter from './Filter'

const Index = ({ flowFinanceOrder, dispatch, loading, location }) => {
  const { list, pagination,isMotion } = flowFinanceOrder
  const { query = {}, pathname } = location
  const { pageSize } = pagination

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['flowFinanceOrder/query'],
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
        pathname: '/flowFinanceOrder',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/flowFinanceOrder',
      }))
    },

  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
        <List {...listProps} />
  </div>)
}

Index.propTypes = {
  flowFinanceOrder: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ flowFinanceOrder, loading }) => ({ flowFinanceOrder, loading }))(Index)
