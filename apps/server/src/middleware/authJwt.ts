import jwt from "jsonwebtoken"
import {Request, Response, NextFunction} from 'express'

const tokenKey = process.env.API_TOKEN_KEY

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/user/signin' || req.url === '/user/signup') {
    return next()
  }
  let token = req.headers["x-access-token"]

  if (!token) {
    const { authorization } = req.headers
    if (authorization) {
      token = authorization.split(' ')[1]
    }
  }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    })
  }
  if(typeof token === 'string')
  jwt.verify(token, tokenKey, (err, decoded: {userId: string}) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      })
    }
    Object.assign(req, {userId: decoded.userId})
    next()
  })
}
