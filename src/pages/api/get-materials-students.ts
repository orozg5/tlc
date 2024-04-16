import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-materials-students:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got everything from materials_students.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const materials_students = await query("SELECT * FROM materials_students", []);

    res.status(200).json(materials_students.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
