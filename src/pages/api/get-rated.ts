import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-rated:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current students rated terms.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const rated = await query(
      "SELECT instructor_ratings.rating, instructor_ratings.comment, instructor_ratings.date, instructor_ratings.subject, instructors.first_name, instructors.last_name, instructors.profile_photo FROM instructor_ratings JOIN instructors ON instructor_ratings.instructor_id = instructors.user_id WHERE instructor_ratings.student_id = $1 ORDER BY instructor_ratings.date DESC",
      [id]
    );

    res.status(200).json(rated.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
