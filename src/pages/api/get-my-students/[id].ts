import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-my-students:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got my students.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const result = await query("SELECT DISTINCT student_id FROM terms WHERE instructor_id = $1 AND reserved = $2", [
      id,
      true,
    ]);

    const users = [];
    const channels = [];
    let i = 0;
    while (i < result.rows.length) {
      const student = await query(
        "SELECT user_id, first_name, last_name, profile_photo FROM students WHERE user_id = $1",
        [result.rows[i].student_id]
      );

      users.push({
        id: student.rows[0].user_id,
        name: student.rows[0].first_name + " " + student.rows[0].last_name,
        profileUrl: "data:image/jpeg;base64," + student.rows[0].profile_photo,
        updated: "",
        eTag: "",
      });

      channels.push({
        id: id + "-" + student.rows[0].user_id,
        name: student.rows[0].first_name + " " + student.rows[0].last_name,
        custom: {
          profileUrl: "data:image/jpeg;base64," + student.rows[0].profile_photo,
        },
        updated: "",
        eTag: "",
      });
      i++;
    }

    res.status(200).json({ users: users, channels: channels });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
