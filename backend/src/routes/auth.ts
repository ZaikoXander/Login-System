import { Router, Express } from "express"

import { createUser, authenticateUser, forgotPassword } from "../controllers/auth"

const routes = Router()

// auth routes

routes.post("/register", createUser)

routes.post("/authenticate", authenticateUser)

routes.post("/forgot_password", forgotPassword)

export default (app: Express) => app.use("/auth", routes)
