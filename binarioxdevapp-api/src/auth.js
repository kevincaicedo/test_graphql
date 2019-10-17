'use strict'

import jwt from 'jsonwebtoken'

const sign = (payload, secret, signOptions) => {
  return jwt.sign(payload, secret, signOptions)
}

const verify = (token, secret, signOptions) => {
  return jwt.verify(token, secret, signOptions)
}

export default {
  sign,
  verify
}
