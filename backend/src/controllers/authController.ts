import { Request, Response } from "express"
import axios from "axios"

interface UserData {
  email: string
  password: string
  confirmPassword: string
  captcha: string
}

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password, confirmPassword, captcha } = req.body as UserData

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

    const googleRecaptchaAPI = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
    )

    if (passwordRegex.test(password) && password === confirmPassword) {

      if (googleRecaptchaAPI.data.success) {
        return res.status(201).json({
          message: "Registration success"
        })
      } else {
        return res.status(400).json({
          recaptchaSuccess: googleRecaptchaAPI.data.success,
          recaptchaErrorCodes: googleRecaptchaAPI.data["error-codes"]
        })
      }
      
    } else {
      res.status(400).json({ error: "Invalid password" })
    }

  } catch (error) {
    return res.status(400).json({ error: "Registration failed" })
  }
}
