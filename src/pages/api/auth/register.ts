import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import hashPass from "@/utils/hashPass";
import genRndStr from "@/utils/genRndStr";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { role, email, password } = req.body;
    const password_hash = await hashPass(password);
    const verification_hash = await genRndStr(32);

    await query(`INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)`, [email, password_hash, role]);

    const userQueryResult = await query(`SELECT id FROM users WHERE email = $1`, [email]);
    const user_id = userQueryResult.rows[0].id;

    if (role == "student") {
      await query(`INSERT INTO students (user_id) VALUES ($1)`, [user_id]);
    } else if (role == "tutor") {
      await query(`INSERT INTO instructors (user_id) VALUES ($1)`, [user_id]);
    }

    const expiry_date = new Date();
    expiry_date.setHours(expiry_date.getHours() + 24);
    await query(`INSERT INTO verification (user_id, verification_hash, expiry_date) VALUES ($1, $2, $3)`, [
      user_id,
      verification_hash,
      expiry_date,
    ]);

    const Mailjet = require("node-mailjet");
    const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "tlceducation5@gmail.com",
            Name: "TLC",
          },
          To: [
            {
              Email: `${email}`,
            },
          ],
          Subject: "TLC - Activate your account",
          HTMLPart: `<h1>Thank you for registering. <br /></h1> <p>Please click on the link to activate your account: <a href="http://localhost:3000/api/auth/verify/${verification_hash}"><strong>Activate now</strong></a><br /> Link will expire in <strong>24 hours</strong>.</p>`,
        },
      ],
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
