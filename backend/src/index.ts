import express from "express"
import routes from "./routes"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(routes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`HTTP server running on port ${PORT}`))
