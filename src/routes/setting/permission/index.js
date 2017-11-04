import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import PayTypeModal from './PayTypeModal'
import EditModal from './EditModal'
import BankModal from './BankModal'
import RateModal from './RateModal'
import ProfitModal from './ProfitModal'
import ProfitRecordModal from './ProfitRecordModal'
import ProfitWithdrawModal from './ProfitWithdrawModal'

const Index = ({agentManage, dispatch, loading, location}) => {
  const {
    modalVisible, list, pagination, agentInfo, agentBank, agentUid,
    addressData, agentLevelData, bankLists, bankSubLists, modalType, currentItem,
    modalVisiblePayType, listPayType, paginationPayType,
    modalVisibleEdit,
    bankSubId,
    modalVisibleBank,
    modalVisibleRate,
    modalVisibleProfit,
    modalVisibleProfitRecord, paginationProfitRecord, listProfitRecord,
    modalVisibleProfitWithdraw, paginationProfitWithdraw, listProfitWithdraw

  } = agentManage
  const {query = {}, pathname} = location
  const {pageSize} = pagination
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['agentManage/query'],
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
        type: 'agentManage/showModal',
        payload: {
          currentItem: item,
        },
      })
    },
    onEditView(item) {
      dispatch({
        type: 'agentManage/updateAgentView',
        payload: {
          id: item.uid,
        },
      })
    },
    onDisabledView(item) {
      dispatch({
        type: 'agentManage/disabledAgent',
        payload: {
          currentItem: item,
        },
      })
    },
    onPayTypeView(item) {
      dispatch({
        type: 'agentManage/queryPayType',
        payload: {
          uid: item.uid,
        },
      })
    },
    onProfitView(item) {
      dispatch({
        type: 'agentManage/queryProfit',
        payload: {
          modalType: 'profitView',
          id: item.uid,
        },
      })
    },
    onProfitRecord(item) {
      dispatch({
        type: 'agentManage/queryProfitRecord',
        payload: {
          uid: item.uid,
        },
      })
    },
    onProfitWithdraw(item) {
      dispatch({
        type: 'agentManage/queryProfitWithdraw',
        payload: {
          uid: item.uid,
        },
      })
    },
  }

  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    title: '详情',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'agentManage/hideModal',
      })
    },
  }

  const modalPropsPayType = {
    item: currentItem,
    visible: modalVisiblePayType,
    maskClosable: false,
    title: '支付配置',
    wrapClassName: 'vertical-center-modal',
    listProps: {
      pagination: paginationPayType,
      dataSource: listPayType,
      loading: loading.effects['agentManage/queryPayType'],
      onChange(page) {
        dispatch({
          type: 'agentManage/queryPayType',
          payload: {
            uid: agentUid,
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
        type: 'agentManage/hideModalPayType',
      })
    },
    onAddRate(item) {
      dispatch({
        type: 'agentManage/showModalRate',
        payload: {
          item
        },
      })
    },
    onRemoveRate(item) {
      dispatch({
        type: 'agentManage/removeRate',
        payload: {
          id: item.id,
        },
      })
    },
  }

  const modalPropsEdit = {
    item: modalType === 'create' ? {} : agentInfo,
    addressData: addressData,
    agentLevelData: agentLevelData,
    visible: modalVisibleEdit,
    maskClosable: false,
    title: modalType === 'create' ? '添加代理商' : '修改代理商',
    wrapClassName: 'vertical-center-modal',
    width: 900,
    onOk(data) {
      dispatch({
        type: `agentManage/updateAgent`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'agentManage/hideModalEdit',
      })
    },
  }

  const modalPropsBank = {
    item: agentBank,
    addressData: addressData,
    agentUid: agentUid,
    bankLists: bankLists,
    bankSubId: bankSubId,
    bankSubLists: bankSubLists,
    visible: modalVisibleBank,
    maskClosable: false,
    title: '银行卡信息',
    wrapClassName: 'vertical-center-modal',
    width: 900,
    onOk(data) {
      dispatch({
        type: `agentManage/updateBank`,
        payload: data,
      })
    },
    onBankData(data) {
      dispatch({
        type: `agentManage/getBankData`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'agentManage/hideModalBank',
      })
    },
  }

  const modalPropsProfit = {
    item: currentItem.profitInfo,
    visible: modalVisibleProfit,
    maskClosable: false,
    title: '分润清算',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    onCancel() {
      dispatch({
        type: 'agentManage/hideModalProfit',
      })
    },
  }

  const modalPropsRate = {
    item: currentItem.item,
    agentUid: agentUid,
    visible: modalVisibleRate,
    maskClosable: false,
    title: '开通支付配置',
    wrapClassName: 'vertical-center-modal',
    width: 900,
    onOk(data) {
      dispatch({
        type: `agentManage/addRate`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'agentManage/hideModalRate',
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
        pathname: '/agentManage',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/agentManage',
      }))
    },
    onCreate() {
      dispatch({
        type: `agentManage/createAgentView`,
        payload: {
          modalType: 'create',
        },
      })
    }
  }
  const modalPropsProfitRecord = {
    visible: modalVisibleProfitRecord,
    agentUid: agentUid,
    maskClosable: false,
    title: '分润入账明细',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'agentManage/hideModalProfitRecord',
      })
    },
    listProps: {
      pagination: paginationProfitRecord,
      dataSource: listProfitRecord,
      loading: loading.effects['agentManage/queryProfitRecord'],
      onChange(page) {
        dispatch({
          type: 'agentManage/queryProfitRecord',
          payload: {
            page: page.current,
            pageSize: page.pageSize,
            uid: agentUid,
          },
        })
      },
    },
  }


  const modalPropsProfitWithdraw = {
    visible: modalVisibleProfitWithdraw,
    maskClosable: false,
    title: '分润提现',
    wrapClassName: 'vertical-center-modal',
    listProps: {
      pagination: paginationProfitWithdraw,
      dataSource: listProfitWithdraw,
      loading: loading.effects['agentManage/queryProfitWithdraw'],
      onChange(page) {
        dispatch({
          type: 'agentManage/queryProfitWithdraw',
          payload: {
            page: page.current,
            pageSize: page.pageSize,
            uid: agentUid,
          },
        })
      },
    },
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'agentManage/hideModalProfitWithdraw',
      })
    },
  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
    {modalVisiblePayType && <PayTypeModal {...modalPropsPayType} />}
    {modalVisibleEdit && <EditModal {...modalPropsEdit} />}
    {modalVisibleBank && <BankModal {...modalPropsBank}/>}
    {modalVisibleRate && <RateModal {...modalPropsRate}/>}
    {modalVisibleProfit && <ProfitModal {...modalPropsProfit}/>}
    {modalVisibleProfitRecord && <ProfitRecordModal {...modalPropsProfitRecord} />}
    {modalVisibleProfitWithdraw && <ProfitWithdrawModal {...modalPropsProfitWithdraw} />}
  </div>)
}

Index.propTypes = {
  agentManage: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({agentManage, loading}) => ({agentManage, loading}))(Index)
