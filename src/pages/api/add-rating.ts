import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/add-rating:
 *   post:
 *     responses:
 *       200:
 *         description: Rating added successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { term_id, student_id, subject, instructor_id, instructor_name, rate, comment, date } = req.body;

    await query(`UPDATE terms SET rated = true WHERE term_id = $1`, [term_id]);

    await query(
      `INSERT INTO instructor_ratings (instructor_id, student_id, rating, comment, date, subject) VALUES ($1, $2, $3, $4, $5, $6)`,
      [instructor_id, student_id, rate, comment, date, subject]
    );

    res.status(200).json({ message: "Rating added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
