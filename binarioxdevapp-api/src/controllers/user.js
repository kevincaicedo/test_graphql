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


const saltRounds = 13

// Generate
const create = async (req, res, next) => {
  const { username, password, fullName } = req.body

  let response
  const dao = await db()
  
  try {
    
    if(!password && !username){
      response = {
        error: 'Empty fields'
      }

      res.send(response)
      return
    }

    let user = await dao.collection('user').findOne({ username });
    if(user){
      response = {
        error: 'User is already taken'
      }

      res.send(response)
      return
    }

    const hashPassword = bcrypt.hashSync(password, saltRounds);
    user = await dao.collection('user').insertOne({ username, password: hashPassword, fullName });

    if (user) {
      const dataUser = {
        _id: user.insertedId,
        username,
        fullName,
        permissions: [
          ...permissions.READ_WRITE
        ]
      }
      const token = auth.sign({ ...dataUser }, secret, signOptions)
      response = {
          ...dataUser,
          token,
      }
    } else {
      response = {
        error: 'An error has occurred'
      }
    }

  } catch (e) {
    console.log(`${chalk.blue('[binarioxdevapp:api:token:generate]')} ${e}`)
    return next(e)
  }

  if (!response) {
    return next(new Error('Unsuccessful Registration'))
  }

  res.send(response)
}

export default {
  create
}
