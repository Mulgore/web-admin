const { config, remit } = require('./common')
const qs = require('qs')

const { apiPrefix } = config
let database = remit
let amountTotal = 71283120


module.exports = {

  [`GET ${apiPrefix}/remit`] (req, res) {
    const { query } = req
    console.log(query)
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1
    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
      amountTotal,
    })
  },

  [`PATCH ${apiPrefix}/remit/:id`] (req, res) {
    const { id } = req.params
    const { amount } = req.body
    let isExist = false
    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        item.amount -= amount
        return item
      }
      return item
    })

    if (isExist) {
      res.status(200).end()
    }
  },
  [`PATCH ${apiPrefix}/remit`] (req, res) {
    const { amount } = req.body
    amountTotal -= amount
    let isExist = true
    if (isExist) {
      res.status(200).end()
    }
  },
}
