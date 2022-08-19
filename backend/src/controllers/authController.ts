import { Request, Response } from "express"
import axios from "axios"

import User from "../models/user"

interface UserData {
  email: string
  password: string
  confirmPassword: string
  captcha: string
}

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password, confirmPassword, captcha } = req.body as UserData

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "User already exists" })
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gm
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

    if (emailRegex.test(email) && passwordRegex.test(password) && password === confirmPassword) {
      
      const googleRecaptchaAPI = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
      )

      if (googleRecaptchaAPI.data.success) {
        const user = new User({ email, password })
        user.save()

        return res.status(201).json({
          user: {
            email: user.email,
            _id: user._id,
            createdAt: user.createdAt
          }
        })
      } else {
        return res.status(400).json({
          error: "reCAPTCHA failed",
          recaptchaErrorCodes: googleRecaptchaAPI.data["error-codes"]
        })
      }

    } else {
      res.status(400).json({ error: "E-mail or password is invalid" })
    }

  } catch (error) {
    return res.status(400).json({ error: "Registration failed" })
  }
}
