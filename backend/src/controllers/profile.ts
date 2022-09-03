import { Request, Response } from "express"

import User from "../models/user"

export async function getProfile(req: Request, res: Response) {
  try {
    const user = await User.findById((req as Request & { userId: string }).userId).select("-_id -__v")

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: "Error on getting profile" })
  }
}
