import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS
  }
})

export default transport
