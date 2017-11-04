import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import OutModal from './OutModal'

const Index = ({qrcodeList, dispatch, loading, location}) => {
  const {list, listOut, pagination, paginationOut, currentItem, modalVisible, modalVisibleOut} = qrcodeList
  const {query = {}, pathname} = location
  const {pageSize, statPay, statTotal} = pagination

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['qrcodeList/query'],
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
        type: 'qrcodeList/showModal',
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
    title: '扫码注册',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    onCancel() {
      dispatch({
        type: 'qrcodeList/hideModal',
      })
    },
  }

  const filterProps = {
    statPay: statPay,
    statTotal: statTotal,
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
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/qrcodeList',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/qrcodeList',
      }))
    },
    onDownload() {
      dispatch({
        type: 'qrcodeList/queryOut',
      })
    },
  }
  const modalPropsOut = {
    maskClosable: false,
    title: '二维码导出',
    wrapClassName: 'vertical-center-modal',
    visible: modalVisibleOut,
    listProps: {
      paginationOut,
      dataSource: listOut,
      loading: loading.effects['qrcodeList/queryOut'],
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
    },
    onDownload(item) {
      dispatch({
        type: 'qrcodeList/download',
        payload: {
          id: item,
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'qrcodeList/hideModalOut',
      })
    },

  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {modalVisibleOut && <OutModal {...modalPropsOut} />}
    </div>
  )
}

Index.propTypes = {
  qrcodeList: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({qrcodeList, loading}) => ({qrcodeList, loading}))(Index)
