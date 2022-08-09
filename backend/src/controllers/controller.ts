import { RequestHandler } from "express"

export const sayHelloWorld: RequestHandler = (req, res) => {
  try {
    return res.status(200).send("Hello World")
  } catch (error) {
    return res.status(400).json({ error: "It get an error somehow." })
  }
}
