import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookie = serialize("session", "", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
