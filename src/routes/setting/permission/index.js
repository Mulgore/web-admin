import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import ChildModal from './ChildModal'
import EditModal from './EditModal'
import AddChildModal from './AddChildModal'

const Index = ({settingPermission, dispatch, loading, location}) => {
  const {
    list, pagination, permInfo, pid, modalType, currentItem, childInfo,
    modalVisibleChild, listChild, paginationChild, modalVisibleEdit, modalVisibleAddChild
  } = settingPermission
  const {query = {}, pathname} = location
  const {pageSize} = pagination
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['settingPermission/query'],
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
        type: 'settingPermission/updatePermView',
        payload: {
          ...item,
        },
      })
    },
    onDeleteView(item) {
      dispatch({
        type: 'settingPermission/deletePer',
        payload: {
          currentItem: item,
        },
      })
    },
    onChildView(item) {
      dispatch({
        type: 'settingPermission/queryChild',
        payload: {
          id: item.id,
        },
      })
    },
    onAddChildView(item) {
      dispatch({
        type: 'settingPermission/showModalAddChild',
        payload: {
          pid: item.id,
        },
      })
    },
  }

  const modalPropsChild = {
    item: currentItem,
    visible: modalVisibleChild,
    maskClosable: false,
    title: '下级菜单',
    wrapClassName: 'vertical-center-modal',
    listProps: {
      pagination: paginationChild,
      dataSource: listChild,
      loading: loading.effects['settingPermission/queryChild'],
      onChange(page) {
        dispatch({
          type: 'settingPermission/queryChild',
          payload: {
            id: pid,
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
        type: 'settingPermission/hideModalChild',
      })
    },
    onEditChild(item) {
      dispatch({
        type: 'settingPermission/updatePermChildView',
        payload: item,
      })
    },
    onStartChild(item) {
      dispatch({
        type: 'settingPermission/stateChild',
        payload: {
          id: item.id,
          state: 1,
          pid: pid,
        },
      })
    },
    onDeleteView(item) {
      dispatch({
        type: 'settingPermission/deleteChildPerm',
        payload: item,
      })
    },
    onRemoveChild(item) {
      dispatch({
        type: 'settingPermission/stateChild',
        payload: {
          id: item.id,
          state: 0,
          pid: pid,
        },
      })
    },
  }

  const modalPropsEdit = {
    item: modalType === 'create' ? {} : permInfo,
    visible: modalVisibleEdit,
    maskClosable: false,
    title: modalType === 'create' ? '添加权限菜单' : '修改权限菜单',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `settingPermission/updatePerm`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'settingPermission/hideModalEdit',
      })
    },
  }
  const modalPropsAddChild = {
    item: modalType === 'create' ? {} : childInfo,
    visible: modalVisibleAddChild,
    maskClosable: false,
    title: modalType === 'create' ? '添加下级菜单' : '修改下级菜单',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `settingPermission/addChildPerm`,
        payload: {
          ...data,
          pid: pid,
        },
      })
    },
    onUpdate(data) {
      dispatch({
        type: `settingPermission/updateChildPerm`,
        payload: {
          ...data,
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'settingPermission/hideModalAddChild',
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
        pathname: '/settingPermission',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/settingPermission',
      }))
    },
    onCreate() {
      dispatch({
        type: `settingPermission/showModalEdit`,
        payload: {
          modalType: 'create',
        },
      })
    }
  }


  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisibleChild && <ChildModal {...modalPropsChild} />}
    {modalVisibleEdit && <EditModal {...modalPropsEdit} />}
    {modalVisibleAddChild && <AddChildModal {...modalPropsAddChild} />}
  </div>)
}

Index.propTypes = {
  settingPermission: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({settingPermission, loading}) => ({settingPermission, loading}))(Index)
