import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Button, Icon, Form, Input, Tooltip, Checkbox} from 'antd'
import {config} from 'utils'
import styles from './index.less'
import Modal from './Modal'

const FormItem = Form.Item

const Login = ({
                 login,
                 dispatch,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {
  const {loginLoading,modalVisible,loadingCheck,token} = login
  const reminder = () => {
    return
  }
  function handleForgot() {
    dispatch({type: 'login/showModal'})
  }
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'login/login', payload: values})
    })
  }
  const hideSmsLoading = () => {
    dispatch({
      type: `login/hideSmsLoading`
    })
  }

  const modalProps = {
    visible: modalVisible,
    maskClosable: false,
    loadingCheck: loadingCheck,
    title: '忘记密码',
    wrapClassName: 'vertical-center-modal',
    onHandleSms(data) {
      dispatch({
        type: `login/sendSms`,
        payload: {
          mobile:data.mobile,
        },
      })
      setTimeout(hideSmsLoading, 60000)
    },
    onOk(data) {
      dispatch({
        type: `login/forgot`,
        payload: {
          ...data,
          token:token
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'login/hideModal',
      })
    },
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo}/>
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          <Tooltip title={'手机号@应用号:18688888888@1000000'} placement="top" trigger="focus">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  whitespace:true,
                  message: '用户名不能为空!',
                },
              ],
            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} size="large" onPressEnter={handleOk} placeholder="账号:手机号@应用号"/>)}
          </Tooltip>
        </FormItem>

        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                whitespace:true,
                message: '密码不能为空!',
              },
            ],
          })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} size="large" type="password" onPressEnter={handleOk} placeholder="请输入密码"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className={styles.forgot} onClick={handleForgot}>忘记密码</a>
          <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
            登 录
          </Button>
        </FormItem>
      </form>
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({login}) => ({login}))(Form.create()(Login))
