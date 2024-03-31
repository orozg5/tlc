import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/add-material:
 *   post:
 *     responses:
 *       200:
 *         description: Material added successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {instructor_id, is_public, file_url, file_name, path} = req.body;

    await query(
      `INSERT INTO materials (instructor_id, is_public, file_url, file_name, path) VALUES ($1, $2, $3, $4, $5)`,
      [instructor_id, is_public, file_url, file_name, path]
    );

    res.status(200).json({ message: "Material added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
