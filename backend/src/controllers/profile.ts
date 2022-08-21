import { Request, Response } from "express"

export async function getProfile(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    userId: (req as Request & { userId: string }).userId
  })
}
