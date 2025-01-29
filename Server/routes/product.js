const express = require('express')
const router = express.Router()
const { create, list, remove, listby, searchFilters } = require('../controllers/product')

router.post('/product', create)
router.get('/product', list)
router.delete('/product/:id', remove)
router.post('/productby', listby)
router.post('/search/filters', searchFilters)




module.exports = router