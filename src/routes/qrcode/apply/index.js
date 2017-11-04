import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Index = ({qrcodeApply, dispatch, loading, location}) => {
  const {list, pagination, currentItem, modalVisible} = qrcodeApply
  const {query = {}, pathname} = location

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['qrcodeApply/query'],
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
  }


  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects.payOrder,
    title: '二维码申请',
    wrapClassName: 'vertical-center-modal',
    onOk(data){
      dispatch({
        type: 'qrcodeApply/QRCodeAdd',
        payload:data
      })
    },
    onCancel() {
      dispatch({
        type: 'qrcodeApply/hideModal',
      })
    },
  }

  const filterProps = {
    onFilterChange() {
      dispatch({
        type: 'qrcodeApply/showModal',
      })
    },
  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
  </div>)
}

Index.propTypes = {
  qrcodeApply: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({qrcodeApply, loading}) => ({qrcodeApply, loading}))(Index)
