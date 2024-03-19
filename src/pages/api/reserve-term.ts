import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/reserve-term:
 *   patch:
 *     responses:
 *       200:
 *         description: Term reserved successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    const { term_id, instructor_id, student_id, instruction_id, reserved } = req.body;
    await query(`UPDATE terms SET instructor_id = $2, student_id = $3, instruction_id = $4, reserved = $5 WHERE term_id = $1`, [
      term_id,
      instructor_id,
      student_id,
      instruction_id,
      reserved,
    ]);

    res.status(200).json({ message: "Term reserved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
