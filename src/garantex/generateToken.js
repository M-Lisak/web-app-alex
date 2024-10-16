import axios from 'axios';
// const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
import jwt from 'jsonwebtoken'
import crypto from 'crypto-browserify'
import { PRIVATE_TOKEN, UID } from '../constants';

const host = "garantex.org" // для тестового сервера используйте stage.garantex.biz
const privateKey = PRIVATE_TOKEN // приватный ключ, полученный на этапе создания API ключей
const uid =  UID// UID, полученный на этапе создания API ключей

export const generateToken = async () => {
    try {
      let { data } = await axios.post(
        "https://dauth." + host + "/api/v1/sessions/generate_jwt",
        {
          kid: uid,
          jwt_token: jwt.sign(
            {
              exp: Math.round(Date.now() / 1000) + 24 * 60 * 60, // JWT Request TTL: 60 minutes (day)
              jti: crypto.randomBytes(12).toString("hex"),
            },
            new Buffer.from(privateKey, "base64").toString("ascii"),
            { algorithm: "RS256" }
          ),
        }
      )
      console.log('token', data?.token)
      return data.token
    } catch (e) {
      console.error("error generateToken", e)
      return false
    }
}