const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const cors = require('cors')



// Middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())



app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))