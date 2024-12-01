const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    res.send('Hello register')
})





module.exports = router