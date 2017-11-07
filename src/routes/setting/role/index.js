import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import EditModal from './EditModal'

const Index = ({settingRole, dispatch, loading, location}) => {
  const {list, pagination, modalType, roleInfo, modalVisible} = settingRole
  const {query = {}, pathname} = location
  const {pageSize} = pagination
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['settingRole/query'],
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
    onEditView(item) {
      dispatch({
        type: 'settingRole/updateRoleView',
        payload: {
          ...item,
        },
      })
    },
    onDeleteView(item) {
      dispatch({
        type: 'settingRole/deleteRole',
        payload: {
          currentItem: item,
        },
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
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/settingRole',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/settingRole',
      }))
    },
    onCreate() {
      dispatch({
        type: `settingRole/showModal`,
        payload: {
          modalType: 'create',
        },
      })
    }
  }
  const modalProps = {
    item: modalType === 'create' ? {} : roleInfo,
    visible: modalVisible,
    maskClosable: false,
    title: modalType === 'create' ? '添加角色' : '修改角色',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `settingRole/updateRole`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'settingRole/hideModal',
      })
    },
  }
  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <EditModal {...modalProps} />}
  </div>)
}

Index.propTypes = {
  settingRole: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({settingRole, loading}) => ({settingRole, loading}))(Index)
