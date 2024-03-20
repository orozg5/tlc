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
    const id = req.body;
    const n = null;
    const f = false;

    await query("UPDATE terms SET student_id = $2, instruction_id = $2, reserved = $3 WHERE term_id = $1", [id, n, f]);

    res.status(200).json({ message: "Term canceled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
