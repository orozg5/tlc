import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/cancel-term:
 *   patch:
 *     responses:
 *       200:
 *         description: Term canceled successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, user_id, term } = req.body;
    const n = null;
    const f = false;
    
    const data = await query("SELECT email FROM users WHERE id = $1", [user_id]);

    const {email} = data.rows[0];

    await query("UPDATE terms SET student_id = $2, instruction_id = $2, reserved = $3 WHERE term_id = $1", [id, n, f]);

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
          Subject: "TLC - Cancelled term",
          HTMLPart: `<h1>Your term has been cancelled. <br /></h1> <p>${term}</p>`,
        },
      ],
    });

    res.status(200).json({ message: "Term canceled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
