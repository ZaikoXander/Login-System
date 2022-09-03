import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import "./database"
import routes from "./routes"

dotenv.config()

const app = express()

app.use(cors(/* {
  origin: "https://clientside-production.com"
} */))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

routes(app)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`HTTP server running on port ${PORT}`))
