import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-done-terms:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current students done terms.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const terms = await query(
      "SELECT terms.term_id, terms.start, terms.duration_min, instructions.instruction_id, instructions.price, instructors.first_name, instructors.last_name, instructors.profile_photo, instructors.user_id, terms.rated, terms.payed, subjects_catalog.subject_name FROM terms JOIN instructions ON terms.instruction_id = instructions.instruction_id JOIN instructors ON terms.instructor_id = instructors.user_id JOIN subjects_catalog ON instructions.subject_id = subjects_catalog.subject_id WHERE terms.student_id = $1 AND (terms.start + (terms.duration_min || ' minutes')::interval) < NOW() AND (terms.rated = false OR terms.payed = false) ORDER BY terms.start DESC",
      [id]
    );

    res.status(200).json(terms.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
