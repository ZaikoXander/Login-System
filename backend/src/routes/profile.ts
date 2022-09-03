import { Router, Express } from "express"

import authMiddleware from "../middlewares/auth"

import { getProfile } from "../controllers/profile"

const routes = Router()

routes.use(authMiddleware)

// profile routes

routes.get("/", getProfile)

export default (app: Express) => app.use("/profiles", routes)
