import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ role: "admin", id: "5", email: "tlceducation5@gmail.com" });
  } catch (err) {
    res.status(500);
  }
}
