import mongoose from "mongoose"
import dotenv from "dotenv"

(async () => {
  dotenv.config()
  try {
    const db = await mongoose.connect(`${process.env.DATABASE_URL}`)
    console.log("database is connected to:", db.connection.name)
  } catch (error) {
    console.error(error)
  }
})()
