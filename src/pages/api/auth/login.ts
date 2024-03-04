import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import isSamePass from "@/utils/isSamePass";
import { serialize } from "cookie";
import { encrypt } from "@/utils/encrypt";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       500:
 *         description: User doesn't exist. Make sure you verified your account.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;

    const pass = await query("SELECT password_hash FROM users WHERE email = $1 and is_active = true", [email]);
    const result = await isSamePass(password, pass.rows[0].password_hash);

    if (result) {
      const data = await query("SELECT id, role FROM users WHERE email = $1", [email]);
      const id = data.rows[0].id;
      const role = data.rows[0].role;

      const encryptedSessionData = await encrypt({ id: id, role: role, email: email });

      const cookie = serialize("session", encryptedSessionData, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      res.setHeader("Set-Cookie", cookie);
      res.status(200).json({ message: "User logged in successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "User doesn't exist. Make sure you verified your account." });
  }
}
