const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/category')

// Middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())


app.use('/api', authRouter)
app.use('/api', categoryRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))