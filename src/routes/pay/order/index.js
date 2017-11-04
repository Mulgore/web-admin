import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Index = ({payOrder, dispatch, loading, location}) => {
  const {list, pagination, currentItem, modalVisible} = payOrder
  const {query = {}, pathname} = location
  const {pageSize, statPay, statTotal, merchantUid} = pagination

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['payOrder/query'],
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
        type: 'payOrder/showModal',
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
    confirmLoading: loading.effects.payOrder,
    title: '详情',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'payOrder/hideModal',
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    statPay: statPay,
    statTotal: statTotal,
    merchantUidData: merchantUid,
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
    onFilterDownload(value) {
      dispatch({
        type: 'payOrder/download',
        modalType: 'download',
        payload: {
          ...value
        },
      })
    },
    onSearch(fieldsValue) {
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
    {modalVisible && <Modal {...modalProps} />}
  </div>)
}

Index.propTypes = {
  payOrder: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({payOrder, loading}) => ({payOrder, loading}))(Index)
