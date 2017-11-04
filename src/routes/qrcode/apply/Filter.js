import React from 'react'
import PropTypes from 'prop-types'
import {FilterItem} from 'components'
import {Form, Button, Row, Col} from 'antd'

const Filter = ({ onFilterChange }) => {

  const handleSubmit = () => {
    onFilterChange()
  }

  return (<div>
    <Row type="flex" justify="end" gutter={24} style={{marginBottom:20}}>
      <Col>
            <Button type="primary" size="large" className="margin-right" icon="qrcode" onClick={handleSubmit}>二维码申请</Button>
      </Col>
    </Row>
    </div>
  )
}

Filter.propTypes = {
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
