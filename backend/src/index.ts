import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import routes from "./routes"

dotenv.config()

const app = express()

app.use(cors(/* {
  origin: "https://client-production.com"
} */))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`HTTP server running on port ${PORT}`))
