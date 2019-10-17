'use strict'

import 'babel-polyfill'

import http from 'http'
import cors from 'cors'
import chalk from 'chalk'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import auth from 'express-jwt'
import guard from 'express-jwt-permissions'
import fs from 'fs'
import path from 'path'
import * as permissions from './permissions'

import { apolloServer } from 'binarioxdevapp-db'

import api from './api'

import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8000
const app = asyncify(express())
const server = http.createServer(app)

app.use(logger('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(cors())

app.use('/api', api)

const secret = fs.readFileSync(path.join(__dirname, '/credentials/private.key'), 'utf8')

app.use('/graphql', auth({ secret }), guard().check(permissions.READ_WRITE))

apolloServer.applyMiddleware({
  app
})

// Express Error Handler
app.use((err, req, res, next) => {
  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, async () => {
    console.log(`${chalk.green('[geocoding:api]')} server listening on port ${port}`)
  })
}

export default server
