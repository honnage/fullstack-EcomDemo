const express = require('express')
const router = express.Router()
const { pdf } = require('../controllers/pdf')


router.get('/pdf', pdf)




module.exports = router