require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')

const app = express()
const { sequelize } = require('./models')

const user = require('./routes/user')
const schedule = require('./routes/schedule')
const ticket = require('./routes/ticket')

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/api/users', user)
app.use('/api/schedules', schedule)
app.use('/api/tickets', ticket)

app.use('/upload', express.static('./images'))

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`)
  await sequelize.authenticate()
})
