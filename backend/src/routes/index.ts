import { Express } from "express"

import authRoutes from "./auth"
import profileRoutes from "./profile"

export default (app: Express) => {
  authRoutes(app)
  profileRoutes(app)
}
