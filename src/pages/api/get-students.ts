import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-students:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the students.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const students = await query("SELECT * FROM students", []);

    res.status(200).json(students.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
