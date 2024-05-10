import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-tutor-materials:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current tutors students.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const students = await query("SELECT DISTINCT students.*, cities_catalog.city_name FROM terms LEFT JOIN students ON terms.student_id = students.user_id LEFT JOIN cities_catalog ON students.city_id = cities_catalog.city_id WHERE terms.instructor_id = $1 AND terms.student_id IS NOT NULL", [id]);

    res.status(200).json(students.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
