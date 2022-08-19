import { Router } from "express"

import { createUser } from "./controllers/authController"

const routes = Router()

routes.post("/register", createUser)

export default routes
