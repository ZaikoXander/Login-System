import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import axios from "axios"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import xanderEmail from "xander-email"
import dotenv from "dotenv"

import User from "../models/user"
import mailer from "../modules/mailer"

dotenv.config()

const viewsPath = "./src/modules/mailer/views"

function generateToken(params = {}) {
  return jwt.sign(params, `${process.env.AUTH_SECRET}`, {
    expiresIn: 86400 // 1 day in seconds
  })
}

interface UserData {
  email: string
  password: string
  confirmPassword: string
  captcha: string
  token: string
}

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password, confirmPassword, captcha } = req.body as UserData

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "User already exists" })
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gm
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

    if (!(emailRegex.test(email) && passwordRegex.test(password) && password === confirmPassword)) {
      return res.status(400).json({ error: "E-mail or password is invalid" })
    }

    const googleRecaptchaAPI = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
    )

    if (!googleRecaptchaAPI.data.success) {
      return res.status(400).json({
        error: "reCAPTCHA failed",
        recaptchaErrorCodes: googleRecaptchaAPI.data["error-codes"]
      })
    }

    const user = new User({ email, password })
    user.save()

    return res.status(201).json({
      user: {
        email: user.email,
        id: user.id,
        createdAt: user.createdAt
      },
      token: generateToken({ id: user.id })
    })

  } catch (error) {
    return res.status(400).json({ error: "Registration failed" })
  }
}

export async function authenticateUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body as UserData

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid password" })
    }

    res.status(200).json({
      user: {
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        v: user.__v
      },
      token: generateToken({ id: user.id })
    })

  } catch (error) {
    res.status(400).json({ error: "Authentication failed" })
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body as UserData

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const token = crypto.randomBytes(20).toString("hex")

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user.id, {
      "$set": {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    })

    mailer.sendMail({
      from: "Login System Support <login-system-support@gmail.com>",
      to: email,
      subject: "Forgot Password Email",
      html: xanderEmail("forgot_password", viewsPath, { token })
    }, (error) => {
      if (error) {
        return res.status(400).json({ error: "Cannot send forgot password email" })
      }
      return res.send()
    })
  } catch (error) {
    res.status(400).json({ error: "Error on forgot password, try again" })
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { email, token, password } = req.body as UserData
    
    const user = await User.findOne({ email }).select("+passwordResetToken passwordResetExpires")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).json({ error: "Invalid token" })
    }

    const now = new Date()

    if (now > /*<Date> <unknown>*/ (user.passwordResetExpires as Date)) {
      return res.status(400).json({ error: "Expired token, generate a new one" })
    }

    user.password = password

    await user.save()

    res.send()
  } catch (error) {
    res.status(400).json({ error: "Error on reset password, try again" })
  }
}
