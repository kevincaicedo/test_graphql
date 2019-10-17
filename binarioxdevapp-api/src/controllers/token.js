'use strict'

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import auth from '../auth'
import * as permissions from '../permissions'
import bcrypt from 'bcrypt'

import { db } from 'binarioxdevapp-db'

import { signOptions } from 'binarioxdevapp-common'

const secret = fs.readFileSync(path.join(__dirname, '../credentials/private.key'), 'utf8')


// Generate
const generate = async (req, res, next) => {
  const { username, password } = req.body

  let response
  const dao = await db()
  
  try {
    
    const user = await dao.collection('user').findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      user['permissions'] = [
        ...permissions.READ_WRITE
      ]
      const { password, ...userWithoutHash } = user
      const token = auth.sign({ ...userWithoutHash }, secret, signOptions)
      response = {
          ...userWithoutHash,
          token,
      }
    } else {
      response = {
        error: 'User Not Found'
      }
    }

  } catch (e) {
    console.log(`${chalk.blue('[binarioxdevapp:api:token:generate]')} ${e}`)
    return next(e)
  }

  if (!response) {
    return next(new Error('Generate Token Error'))
  }

  res.send(response)
}

export default {
  generate
}
