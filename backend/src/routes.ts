import { Router } from "express"

import { sayHelloWorld } from "./controllers/controller"

const routes = Router()

routes.get("/", sayHelloWorld)

export default routes
