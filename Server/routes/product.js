const express = require('express')
const router = express.Router()
const { create, list, remove } = require('../controllers/category')

router.post('/product', create)
router.get('/product', list)
router.delete('/product/:id', remove)
router.post('/productby', create)
router.post('/search/filters', create)




module.exports = router