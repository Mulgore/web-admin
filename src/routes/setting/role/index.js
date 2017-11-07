import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import EditModal from './EditModal'
import PermModal from './PermModal'

const Index = ({settingRole, dispatch, loading, location}) => {
  const {list, pagination, paginationPerm, listPerm, modalType, roleInfo, modalVisible, modalVisiblePerm, level} = settingRole
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
    onPermList(item) {
      dispatch({
        type: 'settingRole/queryPerm',
        payload: {
          level: item.sort,
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
  const modalPropsPerm = {
    visible: modalVisiblePerm,
    maskClosable: false,
    title: '权限菜单列表',
    wrapClassName: 'vertical-center-modal',
    listProps: {
      pagination: paginationPerm,
      dataSource: listPerm,
      loading: loading.effects['settingRole/queryPerm'],
      onChange(page) {
        dispatch({
          type: 'settingRole/queryPerm',
          payload: {
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
        type: 'settingRole/hideModalPerm',
      })
    },
    onStartPerm(item) {
      dispatch({
        type: 'settingRole/statusPerm',
        payload: {
          id: item.id,
          level: level,
          type: 1
        },
      })
    },
    onRemovePerm(item) {
      dispatch({
        type: 'settingRole/statusPerm',
        payload: {
          id: item.id,
          level: level,
          type: 0
        },
      })
    },
  }
  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <EditModal {...modalProps} />}
    {modalVisiblePerm && <PermModal {...modalPropsPerm} />}
  </div>)
}

Index.propTypes = {
  settingRole: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({settingRole, loading}) => ({settingRole, loading}))(Index)
