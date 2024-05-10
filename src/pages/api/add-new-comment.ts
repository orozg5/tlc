import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/add-new-comment:
 *   post:
 *     responses:
 *       200:
 *         description: New comment added successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, student_id, comment } = req.body;

    await query(
      `INSERT INTO student_comments (instructor_id, student_id, comment, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
      [id, student_id, comment]
    );

    res.status(200).json({ message: "New comment added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
