import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Index = ({withdrawOrder, dispatch, loading, location}) => {
  const {list, pagination, currentItem, modalVisible} = withdrawOrder
  const {query = {}, pathname} = location
  const {pageSize, statPay, statTotal,merchants} = pagination

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['withdrawOrder/query'],
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
        type: 'withdrawOrder/showModal',
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
        type: 'withdrawOrder/hideModal',
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
    onFilterDownload(value){
      dispatch({
        type: 'withdrawOrder/download',
        modalType: 'download',
        payload: {
          ...value
        },
      })
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/withdrawOrder',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/withdrawOrder',
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
  withdrawOrder: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({withdrawOrder, loading}) => ({withdrawOrder, loading}))(Index)
