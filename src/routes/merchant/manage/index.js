import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import QRCodeModal from './QRCodeModal'
import PayTypeModal from './PayTypeModal'
import RateModal from './RateModal'
import BankModal from './BankModal'
import CreateModal from './CreateModal'
import CRateModal from './CRateModal'
import CBankModal from './CBankModal'

const Index = ({merchantManage, dispatch, loading, location}) => {
  const {
    list, listPayType, pagination, merchantBankInfo, merchantId, paginationPayType, currentItem, addressData, rateData,bankLists,bankSubLists,
    modalVisible, modalVisibleQRCode, modalVisiblePayType, modalVisibleRate, modalVisibleBank, modalVisibleCreate,bankSubId,
    modalVisibleCRate, modalVisibleCBank,
  } = merchantManage
  const {query = {}, pathname} = location
  const {pageSize} = pagination
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['merchantManage/query'],
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
        type: 'merchantManage/showModal',
        payload: {
          modalType: 'InfoView',
          currentItem: item,
        },
      })
    },
    onQRCodeView(item) {
      dispatch({
        type: 'merchantManage/showModalQRCode',
        payload: {
          currentItem: item,
        },
      })
    },
    onPayTypeView(item) {
      dispatch({
        type: 'merchantManage/queryPayType',
        payload: {
          merchantId: item.id,
        },
      })
    },
    onBankView(item) {
      dispatch({
        type: 'merchantManage/queryBankInfo',
        payload: {
          id: item.id,
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
        type: 'merchantManage/hideModal',
      })
    },
  }

  const modalPropsQRCode = {
    item: currentItem,
    visible: modalVisibleQRCode,
    maskClosable: false,
    title: '商户二维码',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    onCancel() {
      dispatch({
        type: 'merchantManage/hideModalQRCode',
      })
    },
  }

  const modalPropsPayType = {
    item: currentItem,
    visible: modalVisiblePayType,
    merchantId: merchantId,
    maskClosable: false,
    title: '支付配置',
    wrapClassName: 'vertical-center-modal',
    listProps: {
      paginationPayType,
      dataSource: listPayType,
      loading: loading.effects['merchantManage/queryPayType'],
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
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'merchantManage/hideModalPayType',
      })
    },
    onAddRate(item) {
      dispatch({
        type: 'merchantManage/showModalRate',
        payload: {
          item
        },
      })
    },
    onRemoveRate(item) {
      dispatch({
        type: 'merchantManage/removeRate',
        payload: {
          id: item.id,
        },
      })
    },
  }
  const modalPropsRate = {
    item: currentItem.item,
    merchantId: merchantId,
    visible: modalVisibleRate,
    maskClosable: false,
    title: '开通支付配置',
    wrapClassName: 'vertical-center-modal',
    width: 900,
    onOk(data) {
      dispatch({
        type: 'merchantManage/addRate',
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'merchantManage/hideModalRate',
      })
    },
  }

  const modalPropsBank = {
    item: merchantBankInfo,
    visible: modalVisibleBank,
    maskClosable: false,
    title: '结算信息',
    wrapClassName: 'vertical-center-modal',
    footer: null,
    width: 900,
    onCancel() {
      dispatch({
        type: 'merchantManage/hideModalBank',
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

  const modalPropsCreate = {
    addressData: addressData,
    visible: modalVisibleCreate,
    maskClosable: false,
    title: '基本信息',
    wrapClassName: 'vertical-center-modal',
    width: 900,
    onOk(data) {
      dispatch({
        type: 'merchantManage/createMerchantInfo',
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'merchantManage/hideModalCreate',
      })
    },
  }
  const modalPropsCRate = {
    merchantId: merchantId,
    rateData: rateData,
    visible: modalVisibleCRate,
    maskClosable: false,
    title: '费率信息',
    wrapClassName: 'vertical-center-modal',
    width: 900,
    onOk(data) {
      dispatch({
        type: 'merchantManage/createMerchantRate',
        payload: data,
      })
    },
    // onCancel() {
    //   dispatch({
    //     type: 'merchantManage/hideModalCreate',
    //   })
    // },
  }

  const modalPropsCBank = {
    addressData: addressData,
    bankSubLists:bankSubLists,
    bankLists:bankLists,
    merchantId:merchantId,
    bankSubId:bankSubId,
    visible: modalVisibleCBank,
    maskClosable: false,
    title: '结算信息',
    wrapClassName: 'vertical-center-modal',
    width: 900,
    onOk(data) {
      dispatch({
        type: 'merchantManage/createMerchantBank',
        payload: data,
      })
    },
    onBankData(data) {
      dispatch({
        type: `merchantManage/getBankData`,
        payload: data,
      })
    },
    // onCancel() {
    //   dispatch({
    //     type: 'merchantManage/hideModalCreate',
    //   })
    // },
  }

  return (<div className="content-inner">
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
    {modalVisibleQRCode && <QRCodeModal {...modalPropsQRCode} />}
    {modalVisiblePayType && <PayTypeModal {...modalPropsPayType} />}
    {modalVisibleRate && <RateModal {...modalPropsRate} />}
    {modalVisibleBank && <BankModal {...modalPropsBank} />}
    {modalVisibleCreate && <CreateModal {...modalPropsCreate} />}
    {modalVisibleCRate && <CRateModal {...modalPropsCRate} />}
    {modalVisibleCBank && <CBankModal {...modalPropsCBank} />}
  </div>)
}

Index.propTypes = {
  merchantManage: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({merchantManage, loading}) => ({merchantManage, loading}))(Index)
