import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-done-tutor-terms:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current tutors done terms.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const termsTutor = await query(
      "SELECT terms.term_id, terms.start, terms.duration_min, instructions.instruction_id, instructions.price, students.first_name, students.last_name, students.profile_photo, students.user_id, terms.payed, subjects_catalog.subject_name FROM terms JOIN instructions ON terms.instruction_id = instructions.instruction_id JOIN students ON terms.student_id = students.user_id JOIN subjects_catalog ON instructions.subject_id = subjects_catalog.subject_id WHERE terms.instructor_id = $1 AND (terms.start + (terms.duration_min || ' minutes')::interval) < NOW() ORDER BY terms.start DESC",
      [id]
    );

    res.status(200).json(termsTutor.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
