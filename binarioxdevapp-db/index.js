require('dotenv').config()

const apolloServer = require('./src/app')
const db = require('./src/resource/db')

module.exports = {
    apolloServer,
    db
}