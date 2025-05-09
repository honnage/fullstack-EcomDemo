const express = require('express')
const router = express.Router()
const { create, list, read, update, remove, listby, searchFilters, createImage, removeImage } = require('../controllers/product')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id', remove)
router.post('/productby', listby)
router.post('/search/filters', searchFilters)

router.post('/images', authCheck, adminCheck, createImage)
router.post('/removeimages', authCheck, adminCheck, removeImage)

module.exports = router