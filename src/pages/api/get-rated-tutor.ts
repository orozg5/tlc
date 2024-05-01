import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-rated-tutor:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got tutors ratings.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const ratedTutor = await query(
      "SELECT instructor_ratings.rating, instructor_ratings.comment, instructor_ratings.date, instructor_ratings.subject, students.first_name, students.last_name, students.profile_photo FROM instructor_ratings JOIN students ON instructor_ratings.student_id = students.user_id WHERE instructor_ratings.instructor_id = $1 ORDER BY instructor_ratings.date DESC",
      [id]
    );

    res.status(200).json(ratedTutor.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
