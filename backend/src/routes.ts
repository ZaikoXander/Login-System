import { Router } from "express"

import { authenticateUser, createUser } from "./controllers/authController"

const routes = Router()

routes.post("/register", createUser)

routes.post("/authenticate", authenticateUser)

export default routes
