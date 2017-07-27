import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { routerRedux } from 'dva/router'
import List from './List'
import Modal from './Modal'
import {Button, Row, Col} from 'antd'

const Index = ({ remit, dispatch, loading, location }) => {
  const {list, pagination, currentItem, modalVisible, modalType} = remit
  const { query, pathname } = location
  const modalProps = {
    item: modalType === 'autoAll' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    amountTotal: pagination.amountTotal,
    confirmLoading: loading.effects['remit'],
    title: `通道余额提现`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `remit/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'remit/hideModal',
      })
    },
  }

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['remit/query'],
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
    onEditItem (item) {
      dispatch({
        type: 'remit/showModal',
        payload: {
          modalType: 'autoById',
          currentItem: item,
        },
      })
    },
  }


  const onAutoSettle = () => {

    dispatch({
      type: 'remit/showModal',
      payload: {
        modalType: 'autoAll',
      },
    })
  }

  return (<div className="content-inner">
    <Row style={{marginBottom: 24, textAlign: 'right', fontSize: 13}}>
      <Col>
        <Button type="primary" size="large" onClick={onAutoSettle} style={{marginLeft: 8}}>全部提现</Button>
      </Col>
    </Row>
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
  </div>)
}

Index.propTypes = {
  remit: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({remit, loading}) => ({remit, loading}))(Index)
