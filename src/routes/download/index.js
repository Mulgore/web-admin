import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'

const Index = ({downloadFile, dispatch, loading, location}) => {
  const {list, pagination, } = downloadFile
  const {query = {}, pathname} = location
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['downloadFile/query'],
    onChange(page) {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDownload(item) {
      dispatch({
        type: 'downloadFile/download',
        payload: {
          title: item.title,
        },
      })
    },
  }

  return (<div className="content-inner">
    <List {...listProps} />
  </div>)
}

Index.propTypes = {
  downloadFile: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({downloadFile, loading}) => ({downloadFile, loading}))(Index)
