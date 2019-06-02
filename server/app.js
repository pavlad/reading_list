const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const config = require('./config/local')

mongoose.connect(config.database.connection_string, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening for requests on port 4000')
})
