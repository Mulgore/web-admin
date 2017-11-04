import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import UserListModal from './UserListModal'

const Index = ({userManage, dispatch, loading, location}) => {
  const {list, pagination, currentItem, modalVisible,listUser,paginationUserList,refUid} = userManage
  const {query = {}, pathname} = location
  const {pageSize} = pagination
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['userManage/query'],
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
    onUserListView(item) {
      dispatch({
        type: 'userManage/queryUserList',
        payload: {
          uid: item.uid,
        },
      })
    },
  }
  console.log(userManage)
  const modalPropsUserList = {
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    title: '用户邀请列表',
    wrapClassName: 'vertical-center-modal',
    listProps: {
      pagination: paginationUserList,
      dataSource: listUser,
      loading: loading.effects['userManage/queryUserList'],
      onChange(page) {
        dispatch({
          type: 'userManage/queryUserList',
          payload: {
            uid: refUid,
            page: page.current,
            pageSize: page.pageSize,
          },
        })
      },
    },
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'userManage/hideModal',
      })
    },
  }


  const filterProps = {
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
    onCreate() {
      dispatch({
        type: 'merchantManage/createMerchantView',
      })
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/merchantManage',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/merchantManage',
      }))
    },

  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <UserListModal {...modalPropsUserList} />}
  </div>)
}

Index.propTypes = {
  userManage: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({userManage, loading}) => ({userManage, loading}))(Index)
