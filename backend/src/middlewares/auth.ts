import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" })
  }

  // Bearer f732yrm92743rvgf23fd43b3
  const parts = authHeader.split(" ")

  if (!(parts.length === 2)) {
    return res.status(401).json({ error: "Token error" })
  }

  const [ scheme, token ] = parts

  if (!(/^Bearer$/i.test(scheme))) {
    return res.status(401).json({ error: "Malformatted token" })
  }

  jwt.verify(token, `${process.env.AUTH_SECRET}`, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" })
    }

    (req as Request & { userId: string }).userId = (decoded as jwt.JwtPayload).id
    
    return next()
  })
}
