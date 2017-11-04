import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Index = ({profitOrder, dispatch, loading, location}) => {
  const {list, pagination, currentItem, modalVisible} = profitOrder
  const {query = {}, pathname} = location
  const {pageSize, merchants} = pagination

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['profitOrder/query'],
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
    onInfoView(item) {
      dispatch({
        type: 'profitOrder/showModal',
        payload: {
          modalType: 'InfoView',
          currentItem: item,
        },
      })
    },
  }

  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    title: '详情',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'profitOrder/hideModal',
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    merchantUidData:merchants,
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/profitOrder',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/profitOrder',
      }))
    },

  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
  </div>)
}

Index.propTypes = {
  profitOrder: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({profitOrder, loading}) => ({profitOrder, loading}))(Index)
