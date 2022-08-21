import { Router, Express } from "express"

import { authenticateUser, createUser } from "../controllers/auth"

const routes = Router()

// auth routes

routes.post("/register", createUser)

routes.post("/authenticate", authenticateUser)

export default (app: Express) => app.use(routes)
