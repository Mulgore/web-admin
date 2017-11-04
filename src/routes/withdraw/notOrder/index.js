import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Index = ({ notWithdrawOrder, dispatch, loading, location }) => {
  const { list, pagination,currentItem, modalVisible } = notWithdrawOrder
  const { pageSize, statPay, statTotal, merchants } = pagination

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
    onInfoView (item) {
      dispatch({
        type: 'notWithdrawOrder/showModal',
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
    onCancel () {
      dispatch({
        type: 'notWithdrawOrder/hideModal',
      })
    },
  }

  const filterProps = {
    statPay: statPay,
    statTotal: statTotal,
    merchants:merchants,
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
    onFilterDownload(value){
      dispatch({
        type: 'notWithdrawOrder/download',
        modalType: 'download',
        payload: {
          ...value
        },
      })
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
    {modalVisible && <Modal {...modalProps} />}
  </div>)
}

Index.propTypes = {
  notWithdrawOrder: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ notWithdrawOrder, loading }) => ({ notWithdrawOrder, loading }))(Index)
