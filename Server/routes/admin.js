const express = require('express')
const router = express.Router()
const { changeOrderStatus, changeOrderAdmin } = require('../controllers/admin')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.put('/admin/order-status', authCheck, changeOrderStatus)
router.get('/admin/orders', authCheck, changeOrderAdmin)


module.exports = router