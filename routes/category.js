const express = require('express')
const router = express.Router()

router.get('/category', (req, res) => {
    res.send('Hello category')
})





module.exports = router