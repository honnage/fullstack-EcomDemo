const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const cors = require('cors')
const { readdirSync  } = require('fs')

// Middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())

readdirSync('./routes').map((path) => app.use('/api', require('./routes/'+path)))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))