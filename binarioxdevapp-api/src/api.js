'use strict'

import express from 'express'
import asyncify from 'express-asyncify'

import tokenController from './controllers/token'
import userController from './controllers/user'

const api = asyncify(express.Router())

// Token
api.post('/token/generate.do', tokenController.generate)
api.post('/user', userController.create)

export default api
